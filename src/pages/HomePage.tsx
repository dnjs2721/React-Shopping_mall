import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {addToCart} from "../features/cart/cartSlice";
import axios from 'axios';
import '../styles/ProductList.css'
import {Link} from "react-router-dom";
import {RootState} from "../app/store";

interface Product {
    id: number;
    title: string;
    price: number;
    category: string;
    image: string;
    description: string;
}

const HomePage: React.FunctionComponent = () => {
    const dispatch = useDispatch();
    const [products, setProducts] = useState<Product[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const user = useSelector((state: RootState) => state.auth.user);

    useEffect(() => {
        axios.get(`https://fakestoreapi.com/products`)
            .then(response => setProducts(response.data))
            .catch(error => console.error('Error fetching products:', error));
    }, []);

    const handleAddToCart = (product : Product) => {
        dispatch(
            addToCart({
                id: product.id,
                name: product.title,
                price: product.price,
                image: product.image,
                category: product.category,
                count: 1,
                uid: user ? user.uid : null
            })
        );
    };

    const renderProductsByCategory = (category: string) => {

        const filteredProducts = products.filter(product => product.category === category);

        return (
            <div className={"product-container"}>
                <p className={"products-length"}>Showing: {filteredProducts.length} items</p>

                <ul className={"product-list"}>
                    {filteredProducts.map(product => (
                        <li key={product.id} className="product-item">
                            <img
                                src={product.image}
                                alt={product.title}
                            />
                            <p className={"product-title"}>{product.title}</p>
                            <div>
                                <button onClick={() => handleAddToCart(product)}>
                                    장바구니에 담기
                                </button>
                                $ {product.price}
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        )
    }

    const renderAllProducts = () => {
        const sortedProducts = products.sort((a, b) => a.id - b.id);

        return (
            <div className={"product-container"}>
                <p className={"products-length"}>Showing: {sortedProducts.length} items</p>
                <ul className="product-list">
                    {sortedProducts.map(product => (
                        <li key={product.id} className="product-item">
                            <Link
                                to={`/product/${product.id}`}
                                state={{ product: product }}
                                style={{ textDecoration: 'none', color: 'black' }}
                            >
                                <img
                                    src={product.image}
                                    alt={product.title}
                                />
                                <p className={"product-title"}>{product.title}</p>
                            </Link>
                            <div>
                                <button
                                    onClick={() => handleAddToCart(product)}>
                                    장바구니에 담기
                                </button>
                                $ {product.price}
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        );
    };

    const categories = Array.from(new Set(products.map(product => product.category)))
        .sort((a, b) => a.localeCompare(b));

    return (
        <div className={"main"}>
            <div className={"top"}>
                <h1>Products</h1>
                <div>
                    <button
                        onClick={() => setSelectedCategory(null)}
                        className={selectedCategory === null ? "selected" : ""}
                    >모두
                    </button>
                    {categories.map(category => (
                        <button
                            key={category}
                            onClick={() => setSelectedCategory(category)}
                            className={selectedCategory === category ? "selected" : ""}
                        >
                            {category === "electronics" && "전자기기"}
                            {category === "jewelery" && "쥬얼리"}
                            {category === "men's clothing" && "남성의류"}
                            {category === "women's clothing" && "여성의류"}
                        </button>
                    ))}
                </div>
            </div>
            {selectedCategory
                ? renderProductsByCategory(selectedCategory)
                : renderAllProducts()
            }
        </div>
    );
}

export default HomePage;
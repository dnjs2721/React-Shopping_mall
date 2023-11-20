import React from 'react';
import {useLocation, useParams, useNavigate} from 'react-router-dom';
import '../styles/ProductDetail.css'
import {addToCart, selectCartItems} from "../features/cart/cartSlice";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../app/store";

interface Product {
    id: number;
    title: string;
    price: number;
    category: string;
    image: string;
    description: string;
}

const ProductDetailPage: React.FunctionComponent = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();
    const { productId } = useParams<{ productId: string }>();
    const productIdAsNumber: number = Number(productId);
    const product = location.state.product;
    const cartItems = useSelector(selectCartItems);

    const isInCart = cartItems.some(item => item.id === productIdAsNumber);

    const user = useSelector((state: RootState) => state.auth.user);

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

    const handleButtonClick = () => {
        navigate('/cart');
    };

    return (
        <div className="product-detail">
            <div className="product-detail-left">
                <img
                    alt={"상품이미지"}
                    src={product.image}
                />
            </div>
            <div className="product-detail-right">
                <p className={"product-detail-category"}>{product.category}</p>
                <h2 className={"product-detail-title"}>{product.title}</h2>
                <p className={"product-detail-price"}>$ {product.price}</p>
                <p className={"product-detail-description"}>{product.description}</p>
                <div className={"buttons"}>
                    <button
                        onClick={() => handleAddToCart(product)}
                        className={`cart-in ${isInCart ? "on-cart" : ""}`}
                    >
                        {isInCart ? "장바구니에 담긴 상품" : "장바구니에 담기"}
                    </button>
                    <button
                        className={"move-cart"}
                        onClick={handleButtonClick}
                    >장바구니로 이동
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductDetailPage;
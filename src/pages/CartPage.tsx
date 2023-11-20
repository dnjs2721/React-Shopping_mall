import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../app/store";
import {decrementItem, incrementItem, removeAllFromCart, removeFromCart} from "../features/cart/cartSlice";
import '../styles/Cart.css'
import {Link} from "react-router-dom";

const CartPage: React.FC = () => {
    const dispatch = useDispatch();
    const cartItems = useSelector((state: RootState) => state.cart.items);
    const user = useSelector((state: RootState) => state.auth.user);

    const handleRemoveFromCart = (productId: number) => {
        dispatch(removeFromCart(productId));
    };

    const handleIncrement = (productId: number) => {
        dispatch(incrementItem(productId));
    };

    const handleDecrement = (productId: number) => {
        dispatch(decrementItem(productId));
    };

    const handleRemoveAllFromCart = () => {
        dispatch(removeAllFromCart());
        if (user) {
            localStorage.setItem(user.uid, JSON.stringify([]));
        }
    };

    return (
        <div className="cart-page">
            {cartItems.length === 0 ? (
                <div className={"empty"}>
                    <img
                        alt={"쇼핑카트"}
                        src="/shopping-cart.png"
                    />
                    <h2>Cart가 비어있습니다.</h2>
                    <p>Cart에 상품을 넣어주세요.</p>
                    <Link to={"/"}><span>쇼핑 계속하기</span></Link>
                </div>
            ) : (
                <div className={"cart-item-container"}>
                    <h1>장바구니</h1>
                    {cartItems.map((item) => (
                        <div key={item.id} className="cart-item">
                            <div className={"cart-item-left"}>
                                <img src={item.image} alt={item.name}/>
                                <div className={"cart-item-info"}>
                                    <p className={"category"}>{item.category}</p>
                                    <h3>{item.name}</h3>
                                    <p className={"price"}>{item.price} X {item.count} =
                                        $ {item.price * item.count} </p>
                                </div>
                            </div>
                            <div className={"cart-item-right"}>
                                <div className={"cal-count"}>
                                    <button onClick={() => handleDecrement(item.id)}>-</button>
                                    <p>{item.count}</p>
                                    <button onClick={() => handleIncrement(item.id)}>+</button>
                                </div>
                                <div className={"recycle-bin"}>
                                    <img
                                        src="/recycle-bin.png"
                                        alt={"recycle-bin"}
                                        onClick={() => handleRemoveFromCart(item.id)}
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                    <div className="total">
                        <p className={"price"}>합계:
                            $ {cartItems.reduce((total, item) => total + (item.price * item.count), 0).toFixed(2)}</p>
                        <button className={"order"} onClick={handleRemoveAllFromCart}>계산하기</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CartPage;
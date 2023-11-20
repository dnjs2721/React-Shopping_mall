import React, {useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import { RootState } from "../app/store";
import '../styles/Header.css'
import {Link, useNavigate} from "react-router-dom";
import {setUserNull} from "../features/auth/authSlice";
import {removeAllFromCart, removeFromCart} from "../features/cart/cartSlice";

const Header: React.FunctionComponent = () => {
    const user = useSelector((state: RootState) => state.auth.user);
    const cartItems = useSelector((state: RootState) => state.cart.items);
    const cartItemsCount = cartItems.length;
    const dispatch = useDispatch();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();
    const modalRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const handleOutsideClick = (event: MouseEvent) => {
            if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
                setIsModalOpen(false);
            }
        };

        if (isModalOpen) {
            document.addEventListener("mousedown", handleOutsideClick);
        }

        return () => {
            document.removeEventListener("mousedown", handleOutsideClick);
        };
    }, [isModalOpen])

    const handleLogout = () => {
        dispatch(setUserNull());
        dispatch(removeAllFromCart());
        alert('로그아웃되었습니다.');
    };

    const handleCartClick = () => {
        setIsModalOpen(!isModalOpen);
    };

    const handleRemoveFromCart = (productId: number) => {
        dispatch(removeFromCart(productId));
    };

    const handleMoveCart = () => {
        setIsModalOpen(!isModalOpen);
        navigate('/cart');
    };

    return (
        <header>
            <div className="logo">
                <Link to={"/"}>Shop</Link>
            </div>
            <div className={"right-section"}>
                <div className="cart-icon">
                    <img
                        onClick={handleCartClick}
                        className={"icon"}
                        src="/cart.png"
                        alt="장바구니"
                    />
                    {cartItemsCount > 0 && <span className="cart-count">{cartItemsCount}</span>}
                    {isModalOpen && (
                        <div className="cart-modal" ref={modalRef}>
                            <div className={"header-cart-item-container"}>
                                {cartItemsCount === 0 ? (
                                    <div className="empty-cart-message">
                                        장바구니가 비어있습니다.
                                    </div>
                                ) : (
                                    cartItems.map((item) => (
                                        <div key={item.id} className="header-cart-item">
                                            <div className={"header-cart-item-img"}>
                                                <img src={item.image} alt={item.name}/>
                                            </div>
                                            <div className={"header-cart-item-info"}>
                                                <p className={"category"}>{item.category}</p>
                                                <p className={"title"}>{item.name}</p>
                                                <p className={"price"}>{item.price} X {item.count} =
                                                    $ {item.price * item.count} </p>
                                            </div>
                                            <div className={"recycle-bin"}>
                                                <img
                                                    src="/recycle-bin.png"
                                                    alt={"recycle-bin"}
                                                    onClick={() => handleRemoveFromCart(item.id)}
                                                />
                                            </div>
                                        </div>
                                    ))
                                )}
                                <div className="modal-total">
                                    <p className={"modal-total-price"}>
                                        합계: ${cartItems.reduce((total, item) => total + (item.price * item.count), 0).toFixed(2)}
                                    </p>
                                </div>
                                <div className={"header-move-cart"}>
                                    <button className={"header-move-cart-button"} onClick={handleMoveCart}>장바구니로 이동</button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
                <div className="user-icon">
                    <img src="/user.png" alt="사용자" className={"icon"} />
                </div>
                <div className="login-icon">
                    {user ? (
                        <img
                            onClick={handleLogout}
                            src="/logout.png"
                            alt="로그아웃"
                            className={"icon"}
                        />
                    ): (
                        <Link to={"/login"}>
                            <img src="/login.png" alt="로그인" className={"icon"} />
                        </Link>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;
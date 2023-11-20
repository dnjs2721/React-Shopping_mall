import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {auth} from "../config/firebase";
import { signInWithEmailAndPassword } from 'firebase/auth';
import {fetchUser} from '../features/auth/authSlice';
import {Link, useNavigate} from "react-router-dom";
import '../styles/LoginPage.css'

const LoginPage: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogin = async () => {
        try {
            await signInWithEmailAndPassword(auth, email, password);

            dispatch(fetchUser() as any);

            navigate("/");
        } catch (error: any) {
            console.error('Login error:', error.message);
            alert('잘못된 이메일 혹은 비밀번호입니다.');
        }
    };

    return (
        <div className={"login-page"}>
            <div className={"login-page-container"}>
                <h2 className={"title"}>로그인</h2>
                <div className={"input-container"}>
                    <input
                        placeholder={"Email"}
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        placeholder={"Password"}
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button className={"login-button"} onClick={handleLogin}>로그인</button>
                <div className={"signUp-section"}>
                    <p>계정이 없습니까?</p>
                    <Link
                        to={"/signUp"}
                        style={{color:"gray", textDecoration:"none", marginTop:"15px", marginLeft: "5px"}}
                    >가입하기</Link>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;

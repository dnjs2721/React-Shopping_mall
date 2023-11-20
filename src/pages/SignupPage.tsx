import React, { useState } from 'react';
import { auth } from '../config/firebase';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import {useNavigate} from "react-router-dom";
import '../styles/SignUpPage.css'
const SignupPage: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [displayName, setDisplayName] = useState('');
    const navigate = useNavigate();

    const handleSignup = async () => {
        if (!email || !password || !displayName) {
            alert('이메일, 비밀번호, 닉네임을 모두 입력해주세요.');
            return;
        }
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            await updateProfile(userCredential.user, {
                displayName: displayName,
            });
            alert('회원가입이 성공적으로 완료되었습니다. 로그인 해주세요.');
            navigate('/login');
        } catch (error: any) {
            if (error.code === 'auth/email-already-in-use') {
                alert('이미 존재하는 이메일입니다. 다른 이메일을 사용해주세요.');
            } else {
                console.error('Signup error:', error.message);
            }
        }
    };

    return (
        <div className={"signUp-page"}>
            <div className={"signUp-page-container"}>
                <h2 className={"title"}>회원가입</h2>
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
                    <input
                        placeholder={"Nick Name"}
                        type="text"
                        value={displayName}
                        onChange={(e) => setDisplayName(e.target.value)}
                    />
                </div>
                <button className={"signUp-button"} onClick={handleSignup}>Signup</button>
            </div>
        </div>
    );
};

export default SignupPage;
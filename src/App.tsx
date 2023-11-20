import React, { useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from "./pages/HomePage";
import ProductDetailPage from "./pages/ProductDetailPage";
import Header from "./components/Header";
import CartPage from "./pages/CartPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";

const App: React.FunctionComponent = () => {
    return (
        <Router>
            <div className="App">
                <Header />
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/product/:productId" element={<ProductDetailPage />} />
                    <Route path={"/cart"} element={<CartPage />} />
                    <Route path={"/login"} element={<LoginPage />} />
                    <Route path={"/signUp"} element={<SignupPage />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;

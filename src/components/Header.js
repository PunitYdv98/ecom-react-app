import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
    return (
        <header className="header">
            <div className="logo">
                <Link to="/">E-Shop</Link>
            </div>
            <div className="promo-banner">
                <p>🎉 Friday Sale: Up to 20% off on all products! 🎉</p>
            </div>
            <nav className="nav-links">
                <Link to="/account" className="nav-link">
                    <span className="icon account-icon"></span>
                    <span>My Account</span>
                </Link>
                <Link to="/cart" className="nav-link">
                    <span className="icon cart-icon"></span>
                    <span>Cart</span>
                </Link>
            </nav>
        </header>
    );
};

export default Header;


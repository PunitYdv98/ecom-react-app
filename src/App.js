import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProductList from './components/ProductList';
import ProductDetails from './components/ProductDetails';
import Cart from './components/Cart';
import Header from './components/Header';
import './App.css'
import Footer from './components/Footer';

const App = () => {
    const [cart, setCart] = useState([]);

    const addToCart = (product) => {
        setCart(prevCart => {
            const existingProduct = prevCart.find(item => item.id === product.id);
            if (existingProduct) {
                return prevCart.map(item =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 0 }
                        : item
                );
            }
            return [...prevCart, { ...product, quantity: 1 }];
        });
    };

    const removeFromCart = (productId) => {
        setCart(prevCart => prevCart.filter(item => item.id !== productId));
    };

    const updateQuantity = (productId, newQuantity) => {
        if (newQuantity <= 0) return;
        setCart(prevCart => prevCart.map(item =>
            item.id === productId
                ? { ...item, quantity: newQuantity }
                : item
        ));
    };

    return (
        <Router>
            
            <div className="App">
                <Header />
                <Routes>
                    <Route path="/" element={<ProductList onProductSelect={addToCart} />} />
                    <Route path="/product/:id" element={<ProductDetails addToCart={addToCart} />} />
                    <Route path="/cart" element={<Cart cartItems={cart} removeFromCart={removeFromCart} updateQuantity={updateQuantity} />} />
                </Routes>
                
            </div>
            
           
           <Footer/>
        </Router>
        
    );
};

export default App;
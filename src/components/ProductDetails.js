import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './ProductDetails.css';

const ProductDetails = ({ addToCart }) => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [selectedSize, setSelectedSize] = useState('');
    const [selectedColor, setSelectedColor] = useState('');
    const [showAlert, setShowAlert] = useState(false);

    useEffect(() => {
        axios.get(`https://fakestoreapi.com/products/${id}`)
            .then(response => setProduct(response.data))
            .catch(error => console.error('Error fetching product details:', error));
    }, [id]);

    const handleAddToCart = () => {
        if (!selectedSize || !selectedColor) {
            alert('Please select both size and color.');
            return;
        }
        const productWithOptions = {
            ...product,
            selectedSize,
            selectedColor
        };
        addToCart(productWithOptions);
        setShowAlert(true);
        setTimeout(() => setShowAlert(false), 3000); // Hide alert after 3 seconds
    };

    if (!product) return <div>Loading...</div>;

    return (
        <div className="product-details-container">
            <img src={product.image} alt={product.title} className="product-details-image" />
            <div className="product-info">
                <h2>{product.title}</h2>
                <p>{product.description}</p>
                <p>Category: {product.category}</p>
                <p>${product.price}</p>

                {/* Size Selector */}
                <div className="option-selector">
                    <label htmlFor="size">Size:</label>
                    <select
                        id="size"
                        value={selectedSize}
                        onChange={(e) => setSelectedSize(e.target.value)}
                    >
                        <option value="">Select Size</option>
                        <option value="S">Small</option>
                        <option value="M">Medium</option>
                        <option value="L">Large</option>
                        <option value="XL">Extra Large</option>
                    </select>
                </div>

                {/* Color Selector */}
                <div className="option-selector">
                    <label htmlFor="color">Color:</label>
                    <select
                        id="color"
                        value={selectedColor}
                        onChange={(e) => setSelectedColor(e.target.value)}
                    >
                        <option value="">Select Color</option>
                        <option value="red">Red</option>
                        <option value="blue">Blue</option>
                        <option value="green">Green</option>
                        <option value="black">Black</option>
                    </select>
                </div>

                <button onClick={handleAddToCart} className="add-to-cart-btn">Add to Cart</button>
            </div>
            {showAlert && <div className="alert">Product added to cart! You can check out now.</div>}
        </div>
    );
};

export default ProductDetails;


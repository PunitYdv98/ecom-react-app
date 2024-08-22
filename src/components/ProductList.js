import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './ProductList.css';



const ProductList = ({ onProductSelect }) => {
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [filteredProducts, setFilteredProducts] = useState([]);

    useEffect(() => {
        axios.get('https://fakestoreapi.com/products')
            .then(response => setProducts(response.data))
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    useEffect(() => {
        let updatedProducts = products;

        if (searchQuery) {
            updatedProducts = updatedProducts.filter(product =>
                product.title.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        if (selectedCategory !== 'all') {
            updatedProducts = updatedProducts.filter(product =>
                product.category.toLowerCase() === selectedCategory.toLowerCase()
            );
        }

        setFilteredProducts(updatedProducts);
    }, [searchQuery, selectedCategory, products]);

    const productsPerPage = 4;
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

    const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

    const paginate = (pageNumber) => {
        if (pageNumber < 1 || pageNumber > totalPages) return;
        setCurrentPage(pageNumber);
    };

    return (
        
        <div className="product-list-container">
            <div className="sale-banner">
                <p>Sale is Live on Diwali! Up to 50% off on all Products</p>
            </div>
            <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="search-bar"
            />
            <select
                value={selectedCategory}
                onChange={e => setSelectedCategory(e.target.value)}
                className="category-filter"
            >
                <option value="all">All Categories</option>
                <option value="men's clothing">Men's Clothing</option>
                <option value="women's clothing">Women's Clothing</option>
                <option value="jewelery">Jewelry</option>
                <option value="electronics">Electronics</option>
            </select>
            <div className="product-grid">
                {currentProducts.map(product => (
                    <div key={product.id} className="product-card">
                        <Link to={`/product/${product.id}`} onClick={() => onProductSelect(product)}>
                            <img src={product.image} alt={product.title} className="product-image" />
                            <h3>{product.title}</h3>
                            <p>${product.price}</p>
                        </Link>
                    </div>
                ))}
            </div>
            <div className="pagination">
                <button
                    onClick={() => paginate(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="pagination-button"
                >
                    Previous
                </button>
                <span className="page-info">
                    Page {currentPage} of {totalPages}
                </span>
                <button
                    onClick={() => paginate(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="pagination-button"
                >
                    Next
                </button>
            </div>
           
        </div>
        
        
    );
};

export default ProductList;

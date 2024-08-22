import React from 'react';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                
                <div className="footer-links">
                    <div className="footer-section">
                        <h3>About Us</h3>
                        <ul>
                            <li><a href="#">Company Info</a></li>
                            <li><a href="#">Careers</a></li>
                           
                        </ul>
                    </div>
                    <div className="footer-section">
                        <h3>Customer Service</h3>
                        <ul>
                            <li><a href="#">Help Center</a></li>
                            <li><a href="#">Returns</a></li>
                            <li><a href="#">Track Order</a></li>
                        </ul>
                    </div>
                    <div className="footer-section">
                        <h3>Contact Us</h3>
                        <address>
                            <p>123 E-Commerce St, Suite 100</p>
                            <p>Cityville, ST 12345</p>
                            <p>Phone: (123) 456-7890</p>
                        </address>
                    </div>
                </div>
            </div>
            <div className="footer-bottom">
                <p>&copy; {new Date().getFullYear()} E-Commerce. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;

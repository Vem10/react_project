import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../css/CartPage.css";

function CartPage() {
    const [cartData, setCartData] = useState([]);
    const [priceSummary, setPriceSummary] = useState({
        price: 0,
        tax: 0,
        delivery: 0,
        discount: 0,
        total: 0,
    });
    const navigate = useNavigate();

    useEffect(() => {
        axios.get("http://localhost:3001/cart").then((res) => {
            const cart = res.data;
            setCartData(cart);
            calculatePriceSummary(cart);
        });
    }, []);

    // Remove item from cart
    const removeFromCart = (id) => {
        axios.delete(`http://localhost:3001/cart/${id}`).then(() => {
            const updatedCart = cartData.filter((item) => item.id !== id);
            setCartData(updatedCart);
            calculatePriceSummary(updatedCart);
            if (updatedCart.length === 0) {
                navigate("/");
            }
        });
    };

    // Price summary logic (match Angular)
    const calculatePriceSummary = (cart) => {
        let price = 0;
        cart.forEach((item) => {
            const itemPrice = Number(item.price);
            const itemQuantity = Number(item.quantity);
            if (!isNaN(itemPrice) && !isNaN(itemQuantity)) {
                price += itemPrice * itemQuantity;
            }
        });
        const discount = price / 10;
        const tax = price / 10;
        const delivery = price > 0 ? 100 : 0;
        const total = price + tax + delivery - discount;
        setPriceSummary({ price, tax, delivery, discount, total });
    };

    // Handle checkout: navigate to /checkout
    const handleCheckout = () => {
        navigate("/checkout");
    };

    return (
        <div className="cart-page">
            <h1 style={{ fontFamily: "MonteCarlo", fontSize: "60px" }}>Cart Page</h1>
            <div className="row">
                <div className="col-sm-8 details">
                    {cartData.map((cart) => (
                        <ul key={cart.id}>
                            <li>
                                <img src={cart.image} alt={cart.name} />
                            </li>
                            <li>
                                <span>{cart.name}</span>
                            </li>
                            <li>
                                <span>Price: ₹{Number(cart.price).toLocaleString("en-IN")}</span>
                            </li>
                            <li>
                                <span>Quantity: {cart.quantity}</span>
                            </li>
                            <li>
                                <button
                                    className="form-button"
                                    onClick={() => removeFromCart(cart.id)}
                                >
                                    Remove
                                </button>
                            </li>
                        </ul>
                    ))}
                </div>

                <div className="col-sm-4 summary">
                    <h3>Summary</h3>
                    <ul>
                        <li>
                            <span>Amount:</span>
                            <span>₹{priceSummary.price.toLocaleString("en-IN")}</span>
                        </li>
                        <li>
                            <span>Tax:</span>
                            <span>₹{priceSummary.tax.toLocaleString("en-IN")}</span>
                        </li>
                        <li>
                            <span>Delivery:</span>
                            <span>₹{priceSummary.delivery.toLocaleString("en-IN")}</span>
                        </li>
                        <li>
                            <span>Discount:</span>
                            <span>₹{priceSummary.discount.toLocaleString("en-IN")}</span>
                        </li>
                        <li>
                            <span>
                                <h4>Total</h4>
                            </span>
                            <span>
                                <h4>₹{priceSummary.total.toLocaleString("en-IN")}</h4>
                            </span>
                        </li>
                        <button
                            onClick={handleCheckout}
                            className="form-button btn-pulse max-width"
                        >
                            Checkout
                        </button>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default CartPage;
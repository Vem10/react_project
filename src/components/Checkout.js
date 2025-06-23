import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import './Checkout.css';
 
function Checkout() {
  const [orderMsg, setOrderMsg] = useState('');
  const [totalPrice, setTotalPrice] = useState(0);
  const [formData, setFormData] = useState({
    email: '',
    address: '',
    contact: ''
  });

  useEffect(() => {
    // Simulate getting total price from backend or local storage
    axios.get('http://localhost:3001/cart')
      .then(res => {
        const cartItems = res.data;
        const price = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
        setTotalPrice(price);
      });
  }, []);

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const orderNow = (e) => {
    e.preventDefault();

    // Simulate order submission
    axios.post('http://localhost:3001/orders', {
      ...formData,
      date: new Date(),
      amount: totalPrice
    }).then(() => {
      setOrderMsg('Your order has been placed successfully!');
      setFormData({ email: '', address: '', contact: '' });
    });
  };

  return (
    <div className="checkout">
      <h1>Checkout</h1>
      <div className="row">
        <div className="col-sm-7">
          <h3>Add shipping address</h3>
          <p className="message-p">{orderMsg}</p>
          <form className="common-form" onSubmit={orderNow}>
            <input
              type="text"
              className="form-input"
              name="email"
              placeholder="Enter User Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              className="form-input"
              name="address"
              placeholder="Enter User Address"
              value={formData.address}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              className="form-input"
              name="contact"
              placeholder="Enter contact details"
              value={formData.contact}
              onChange={handleChange}
              required
            />
            <button className="form-button">Order Now</button>
          </form>
        </div>
        <div className="col-sm-5">
          <h3>Total Amount: {totalPrice}</h3>
          <h4>Payment Method: <b>Pay on delivery</b></h4>
        </div>
      </div>
    </div>
  );
}

export default Checkout;

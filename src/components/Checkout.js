import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/Checkout.css';

function Checkout() {
  const [orderMsg, setOrderMsg] = useState('');
  const [totalPrice, setTotalPrice] = useState(0);
  const [formData, setFormData] = useState({
    email: '',
    address: '',
    contact: ''
  });
  const [orderPlaced, setOrderPlaced] = useState(false);

  useEffect(() => {
    axios.get('http://localhost:3001/cart')
      .then(res => {
        const cartItems = res.data;
        let price = 0;
        cartItems.forEach(item => {
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
        setTotalPrice(total);
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
    axios.post('http://localhost:3001/orders', {
      ...formData,
      date: new Date(),
      amount: totalPrice
    }).then(() => {
      setOrderPlaced(true);
      setOrderMsg('Your order has been placed successfully!');
      setFormData({ email: '', address: '', contact: '' });
    });
  };

  return (
    <div className="checkout">
      <h1>Checkout</h1>
      <div className="row">
        <div className="col-sm-7">
          {!orderPlaced ? (
            <>
              <h3>Add shipping address</h3>
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
            </>
          ) : (
          <div className="success-wrapper">
  <div className="checkmark-success">
    <svg className="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
      <circle className="checkmark-circle" cx="26" cy="26" r="25" fill="none" />
      <path className="checkmark-check" fill="none" d="M14 27l7 7 16-16" />
    </svg>
    <p className="success-text">{orderMsg}</p>
  </div>
</div>
          )}
        </div>
        <div className="col-sm-5">
          <h3>Total Amount: ₹{Number(totalPrice).toLocaleString("en-IN")}</h3>
          <h4>Payment Method: <b>Pay on delivery</b></h4>
        </div>
      </div>
    </div>
  );
}

export default Checkout;

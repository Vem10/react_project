import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../css/MyOrders.css';

function MyOrders() {
  const [orderData, setOrderData] = useState([]);

  useEffect(() => {
    getOrderList();
  }, []);

  const getOrderList = () => {
    axios.get('http://localhost:3001/orders')
      .then(res => {
        setOrderData(res.data || []);
      });
  };

  const cancelOrder = (orderId) => {
    if (!orderId) return;

    axios.delete(`http://localhost:3001/orders/${orderId}`)
      .then(res => {
        if (res.status === 200) {
          getOrderList();
        }
      });
  };

  return (
    <div className="my-orders">
      <h1>My Orders</h1>
      <div className="row header-row">
        <div className="col-sm-2"><span>Orders</span></div>
        <div className="col-sm-2"><span>Order Id</span></div>
        <div className="col-sm-2"><span>Price</span></div>
        <div className="col-sm-2"><span>Status</span></div>
        <div className="col-sm-2"><span>Cancel Order</span></div>
      </div>

      {orderData.map(order => (
        <div className="row" key={order.id}>
          <div className="col-sm-2">
            <img
              className="order-img"
              src="https://www.clipartmax.com/png/middle/210-2106541_track-my-order-beach-volleyball.png"
              alt="Order"
            />
          </div>
          <div className="col-sm-2"><span>#{order.id}</span></div>
          <div className="col-sm-2"><span>{order.totalPrice}</span></div>
          <div className="col-sm-2"><span>In Progress</span></div>
          <div className="col-sm-2">
            <button className="form-button" onClick={() => cancelOrder(order.id)}>
              Cancel Order
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default MyOrders;

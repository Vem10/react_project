import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
// import './css/ProductDetails.css';

function ProductDetails() {
  const { productId } = useParams();
  const [productData, setProductData] = useState(null);
  const [productQuantity, setProductQuantity] = useState(1);
  const [removeCart, setRemoveCart] = useState(false);
  const [cartData, setCartData] = useState(null);

  useEffect(() => {
    if (productId) {
      axios.get(`http://localhost:3001/products/${productId}`).then((res) => {
        setProductData(res.data);

        // Check localCart
        const localCart = JSON.parse(localStorage.getItem('localCart') || '[]');
        const matched = localCart.find(item => item.id === +productId);
        if (matched) {
          setRemoveCart(true);
        }

        // Logged-in user cart check
        const user = JSON.parse(localStorage.getItem('user') || 'null');
        if (user) {
          axios.get(`http://localhost:3001/cart?userId=${user.id}`).then((res) => {
            const item = res.data.find(p => p.productId === +productId);
            if (item) {
              setCartData(item);
              setRemoveCart(true);
            }
          });
        }
      });
    }
  }, [productId]);

  const handleQuantity = (action) => {
    if (action === 'plus' && productQuantity < 20) {
      setProductQuantity(prev => prev + 1);
    } else if (action === 'min' && productQuantity > 1) {
      setProductQuantity(prev => prev - 1);
    }
  };

  const addToCart = () => {
    if (!productData) return;

    const user = JSON.parse(localStorage.getItem('user') || 'null');
    const productWithQuantity = { ...productData, quantity: productQuantity };

    if (!user) {
      // Local cart
      const localCart = JSON.parse(localStorage.getItem('localCart') || '[]');
      localCart.push(productWithQuantity);
      localStorage.setItem('localCart', JSON.stringify(localCart));
      setRemoveCart(true);
    } else {
      // Server-side cart
      const cartPayload = {
        ...productWithQuantity,
        productId: productData.id,
        userId: user.id
      };
      delete cartPayload.id;

      axios.post(`http://localhost:3001/cart`, cartPayload).then((res) => {
        if (res.status === 201) {
          setRemoveCart(true);
          setCartData(res.data);
        }
      });
    }
  };

  const removeFromCart = () => {
    const user = JSON.parse(localStorage.getItem('user') || 'null');

    if (!user) {
      // Remove from local cart
      const localCart = JSON.parse(localStorage.getItem('localCart') || '[]');
      const updated = localCart.filter(item => item.id !== productData.id);
      localStorage.setItem('localCart', JSON.stringify(updated));
    } else {
      // Remove from backend cart
      if (cartData?.id) {
        axios.delete(`http://localhost:3001/cart/${cartData.id}`).then(() => {
          setCartData(null);
        });
      }
    }

    setRemoveCart(false);
  };

  return productData ? (
    <div className="row product-details">
      <div className="col-sm-6">
        <img className="product-img" src={productData.image} alt="" />
      </div>
      <div className="col-sm-6">
        <div className="details">
          <h1>{productData.name}</h1>
          <h3>Price: {productData.price}</h3>
          <div style={{ color: 'rgb(81, 65, 46)' }}>
            Color:
            <h3
              className="product-color"
              style={{ backgroundColor: productData.color }}
            ></h3>
          </div>
          <h6>Category: {productData.category}</h6>
          <h6>Description: {productData.description}</h6>

          {removeCart ? (
            <button className="custom-btn btn-5" onClick={() => removeFromCart()}>
              Remove From Cart
            </button>
          ) : (
            <button className="custom-btn btn-5" onClick={addToCart}>
              Add to Cart
            </button>
          )}

          <div className="quantity-group">
            <button onClick={() => handleQuantity('min')}>-</button>
            <input type="text" value={productQuantity} readOnly />
            <button onClick={() => handleQuantity('plus')}>+</button>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <h2>Loading Product...</h2>
  );
}

export default ProductDetails;

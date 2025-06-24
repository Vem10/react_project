import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login, signup } from '../services/userService';
import { addToCart, getCartList } from '../services/productService';
import '../css/UserAuth.css'

function UserAuth() {
  const [showLogin, setShowLogin] = useState(true);
  const [authError, setAuthError] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    const form = e.target;
    const userData = {
      name: form.name.value,
      email: form.email.value,
      password: form.password.value
    };
    await signup(userData);
    localStorage.setItem('user', JSON.stringify(userData));
    navigate('/');
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    try {
      const user = await login(email, password);
      await syncLocalCartToRemote(user.id);
      navigate('/');
    } catch (err) {
      setAuthError('User not found');
    }
  };

  const syncLocalCartToRemote = async (userId) => {
    const localCart = JSON.parse(localStorage.getItem('localCart') || '[]');
    for (let i = 0; i < localCart.length; i++) {
      const item = localCart[i];
      const cartData = {
        ...item,
        productId: item.id,
        userId: userId
      };
      delete cartData.id;
      await addToCart(cartData);
    }
    localStorage.removeItem('localCart');
    setTimeout(() => getCartList(userId), 2000);
  };

  return (
    <div className="user-auth">
      {!showLogin ? (
        <div className="sign-up">
          <h1>User Signup</h1>
          <form className="common-form already" onSubmit={handleSignup}>
            <input
              type="text"
              className="form-input"
              name="name"
              placeholder="Enter User Name"
              required
            />
            <input
              type="email"
              className="form-input"
              name="email"
              placeholder="Enter User Email"
              required
            />
            <input
              type="password"
              className="form-input"
              name="password"
              placeholder="Enter User Password"
              minLength={2}
              maxLength={20}
              required
            />
            <button className="form-button">Sign Up</button>
            <p>
              Already Have Account? <span onClick={() => setShowLogin(true)}>Click Here</span>
            </p>
          </form>
        </div>
      ) : (
        <div className="login">
          <h1>User Login</h1>
          <form className="common-form" onSubmit={handleLogin}>
            {authError && <p className="error-p">{authError}</p>}
            <input
              type="email"
              className="form-input"
              name="email"
              placeholder="Enter User Email"
              required
            />
            <input
              type="password"
              className="form-input"
              name="password"
              placeholder="Enter User Password"
              minLength={2}
              maxLength={20}
              required
            />
            <button className="form-button">Login</button>
            <p>
              Create Account? <span onClick={() => setShowLogin(false)}>Click Here</span>
            </p>
          </form>
        </div>
      )}
    </div>
  );
}

export default UserAuth;

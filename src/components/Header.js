import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
// import './Header.css';

function Header() {
  const [menuType, setMenuType] = useState('default'); // or 'user'
  const [cartItems, setCartItems] = useState(0);
  const [userName, setUserName] = useState('');
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [searchResult, setSearchResult] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Simulate user info & menu
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      setUserName(user.name);
      setMenuType('user');
    }
    axios.get('http://localhost:3001/cart').then((res) => {
      setCartItems(res.data.length);
    });
  }, []);

  const searchProduct = (e) => {
    const value = e.target.value;
    setSearchValue(value);
    if (value.length > 2) {
      axios.get(`http://localhost:3001/products?q=${value}`).then((res) => {
        setSearchResult(res.data);
      });
    } else {
      setSearchResult([]);
    }
  };

  const hideSearch = () => {
    setTimeout(() => setSearchResult([]), 200); // Delay to allow clicking
  };

  const toggleSearch = () => {
    setIsSearchActive(!isSearchActive);
  };

  const redirectToDetails = (id) => {
    navigate(`/details/${id}`);
  };

  const userLogout = () => {
    localStorage.removeItem('user');
    navigate('/');
    window.location.reload(); // Reset to default view
  };

  return (
    <>
      <header>
        <nav className="nav">
          <Link to="/">
            <img src="/logo.png" alt="E-Comm Logo" style={{ height: '45px' }} />
          </Link>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/category/bridal">Bridal</Link></li>
            <li><Link to="/category/jewellery">Jewellery</Link></li>
            <li><Link to="/category/groom">Groom</Link></li>

            {/* Animated Search */}
            <div className="animated-search">
              <input
                type="text"
                placeholder="Search Products"
                value={searchValue}
                onChange={searchProduct}
                onBlur={hideSearch}
                className={isSearchActive ? 'expanded' : ''}
              />
              <svg
                onClick={toggleSearch}
                className="search-icon"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M9.5 3A6.5 6.5 0 0 1 16 9.5c0 1.41-.45 2.71-1.21 3.76l4.72 4.73l-1.41 1.41l-4.73-4.72A6.5 6.5 0 1 1 9.5 3m0 2a4.5 4.5 0 1 0 0 9a4.5 4.5 0 0 0 0-9Z"
                />
              </svg>
              {searchResult.length > 0 && (
                <ul className="suggested-search">
                  {searchResult.map(item => (
                    <li key={item.id}>
                      <a onMouseDown={() => redirectToDetails(item.id)}>
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {menuType === 'user' ? (
              <>
                <li><span>{userName}</span></li>
                <li><Link to="/my-orders">My Orders</Link></li>
                <li><a onClick={userLogout}>Logout</a></li>
              </>
            ) : (
              <li><Link to="/user-auth">Login/Sign-up</Link></li>
            )}
            <li><Link to="/cart-page">Cart({cartItems})</Link></li>
          </ul>
        </nav>
      </header>
      <div className="headerspace"></div>
    </>
  );
}

export default Header;

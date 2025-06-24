import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../css/Header.css'; // Make sure this path is correct

const Header = () => {
  const [menuType, setMenuType] = useState('default');
  const [cartItems, setCartItems] = useState(0);
  const [userName, setUserName] = useState('');
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [searchResult, setSearchResult] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const searchInput = useRef();
  const navigate = useNavigate();

  // Function to check user info
  const loadUserInfo = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      setUserName(user.name);
      setMenuType('user');
    } else {
      setUserName('');
      setMenuType('default');
    }
  };

  useEffect(() => {
    loadUserInfo(); // Initial check on component mount

    // <--- Header.js: LISTENING IS ALREADY CORRECT (No change needed here) --->
    // This function will be called when 'userChanged' or 'storage' events are fired
    const handleUserChange = () => {
      loadUserInfo(); // Re-evaluate user info
      // Re-fetch cart items as they might be user-specific or clear if logged out
      axios.get('http://localhost:3001/cart')
        .then((res) => {
          setCartItems(res.data.length);
        })
        .catch(error => {
          console.error("Error fetching cart items:", error);
          setCartItems(0); // Reset cart if there's an error or no items
        });
    };

    window.addEventListener('userChanged', handleUserChange);
    window.addEventListener('storage', handleUserChange); // Handles changes from other tabs/windows

    // Initial fetch of cart items when component mounts
    axios.get('http://localhost:3001/cart')
      .then((res) => {
        setCartItems(res.data.length);
      })
      .catch(error => {
        console.error("Error fetching cart items:", error);
        setCartItems(0); // Reset cart if there's an error or no items
      });

    return () => {
      // Cleanup event listeners when the component unmounts
      window.removeEventListener('userChanged', handleUserChange);
      window.removeEventListener('storage', handleUserChange);
    };
  }, []); // Empty dependency array means this runs once on mount and cleanup on unmount

  const searchProduct = (e) => {
    const value = e.target.value;
    setSearchValue(value);
    if (value.length > 2) {
      axios.get(`http://localhost:3001/products?q=${value}`)
        .then((res) => {
          setSearchResult(res.data);
        })
        .catch(error => {
          console.error("Error searching products:", error);
          setSearchResult([]);
        });
    } else {
      setSearchResult([]);
    }
  };

  const hideSearch = () => {
    // A small delay to allow click events on search results to register before hiding
    setTimeout(() => setSearchResult([]), 200);
  };

  const toggleSearch = () => {
    setIsSearchActive(!isSearchActive);
    // If we're activating the search, focus the input
    if (!isSearchActive) searchInput.current.focus();
  };

  const redirectToDetails = (id) => {
    setSearchResult([]); // Clear search results after navigation
    setSearchValue(''); // Clear search input
    navigate(`/details/${id}`);
  };

  // <--- Header.js: userLogout should now call the service function (Small change here) --->
  const userLogout = () => {
    // Call the logout function from userService
    // The userService.js will handle localStorage removal and event dispatch
    import('../services/userService').then(({ logout }) => {
      logout();
      navigate('/'); // Redirect to home page after logout
    }).catch(error => {
      console.error("Logout error:", error);
      // Optionally handle error, though logout is usually robust
    });
  };

  return (
    <>
      <header>
        <nav className="nav">
          <Link to="/">
            <img src="../../assets/logo/logo.png.png" alt="E-Comm Logo" style={{ height: '45px' }} />
          </Link>
          <div>
            {menuType === 'default' && (
              <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/category/bridal">Bridal</Link></li>
                <li><Link to="/category/jewellery">Jewellery</Link></li>
                <li><Link to="/category/groom">Groom</Link></li>
                <div className="animated-search">
                  <input
                    type="text"
                    placeholder="Search Products"
                    ref={searchInput}
                    value={searchValue}
                    onChange={searchProduct}
                    onBlur={hideSearch}
                    className={isSearchActive ? 'expanded' : ''}
                  />
                  <svg onClick={toggleSearch} className="search-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="M9.5 3A6.5 6.5 0 0 1 16 9.5c0 1.41-.45 2.71-1.21 3.76l4.72 4.73l-1.41 1.41l-4.73-4.72A6.5 6.5 0 1 1 9.5 3m0 2a4.5 4.5 0 1 0 0 9a4.5 4.5 0 0 0 0-9Z"
                    />
                  </svg>
                  {searchResult.length > 0 && (
                    <ul className="suggested-search">
                      {/* Using onMouseDown instead of onClick for better interaction with onBlur */}
                      {searchResult.map((item) => (
                        <li key={item.id}>
                          <a onMouseDown={() => redirectToDetails(item.id)}>{item.name}</a>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
                <li><Link to="/user-auth">Login/Sign-up</Link></li>
                {/* Link to cart page, conditionally navigable based on cart items */}
                <li><Link to={cartItems > 0 ? '/cart-page' : '#'}>Cart({cartItems})</Link></li>
              </ul>
            )}

            {menuType === 'user' && (
              <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/category/bridal">Bridal</Link></li>
                <li><Link to="/category/jewellery">Jewellery</Link></li>
                <li><Link to="/category/groom">Groom</Link></li>
                <div className="animated-search">
                  <input
                    type="text"
                    placeholder="Search Products"
                    ref={searchInput}
                    value={searchValue}
                    onChange={searchProduct}
                    onBlur={hideSearch}
                    className={isSearchActive ? 'expanded' : ''}
                  />
                  <svg onClick={toggleSearch} className="search-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="M9.5 3A6.5 6.5 0 0 1 16 9.5c0 1.41-.45 2.71-1.21 3.76l4.72 4.73l-1.41 1.41l-4.73-4.72A6.5 6.5 0 1 1 9.5 3m0 2a4.5 4.5 0 1 0 0 9a4.5 4.5 0 0 0 0-9Z"
                    />
                  </svg>
                  {searchResult.length > 0 && (
                    <ul className="suggested-search">
                      {searchResult.map((item) => (
                        <li key={item.id}>
                          <a onMouseDown={() => redirectToDetails(item.id)}>{item.name}</a>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
                <li><span>Welcome, {userName}!</span></li> {/* Display username */}
                <li><Link to="/my-orders">My Orders</Link></li>
                <li><a onClick={userLogout}>Logout</a></li> {/* Using <a> tag for a clickable link */}
                {/* Link to cart page, conditionally navigable based on cart items */}
                <li><Link to={cartItems > 0 ? '/cart-page' : '#'}>Cart({cartItems})</Link></li>
              </ul>
            )}
          </div>
        </nav>
      </header>
      <div className="headerspace"></div> {/* This div is likely for spacing below the fixed header */}
    </>
  );
};

export default Header;

import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../css/Category.css';

function Category() {
  const { categoryName } = useParams();
  const [categoryProducts, setCategoryProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:3001/products?category=${categoryName}`)
      .then((res) => {
        setCategoryProducts(res.data);
      });
  }, [categoryName]);

  return (
    <div className="category-page">
      <h2 style={{
        fontFamily: 'Montecarlo',
        fontWeight: 600,
        fontSize: '70px',
        textAlign: 'center',
        textDecoration: 'wavy',
        color: '#d4b689'
      }}>
        {categoryName && categoryName.charAt(0).toUpperCase() + categoryName.slice(1)} Collection
      </h2>

      <div className="product-list">
        {categoryProducts.map(item => (
          <div className="product-card" key={item.id}>
            <img src={`/${item.image}`} alt={item.name} />
            <h4>{item.name}</h4>
            <p>{item.description}</p>
            <p style={{ fontWeight: 600 }}>Price: ₹{item.price}</p>
            <div className="frame">
              <button className="custom-btn btn-5" onClick={() => navigate(`/details/${item.id}`)}>
                <span>Details</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Category;

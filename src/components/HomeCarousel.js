// HomeCarousel.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../css/HomeCarousel.css'

function HomeCarousel() {
  const [popularProducts, setPopularProducts] = useState([]);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    axios
      .get('http://localhost:3001/products?id=1&id=5&id=3')
      .then((res) => setPopularProducts(res.data || []))
      .catch((err) => console.error('Error fetching popular products:', err));
  }, []);

  const nextSlide = () => setCurrent((current + 1) % popularProducts.length);
  const prevSlide = () => setCurrent((current - 1 + popularProducts.length) % popularProducts.length);

  if (!popularProducts.length) return null;

  return (
    <div className="carousel-wrapper">
      <button onClick={prevSlide} className="carousel-btn">&lt;</button>

      <div className="carousel-slide">
        <div className="picsum-img-wrapper">
          <Link to={`/details/${popularProducts[current].id}`}>
            <img
              className="product-header-image"
              src={popularProducts[current].image}
              alt={popularProducts[current].name}
            />
          </Link>
        </div>
        <div className="carousel-caption">
          <h3>{popularProducts[current].name}</h3>
          <p>{popularProducts[current].description}</p>
        </div>
      </div>

      <button onClick={nextSlide} className="carousel-btn">&gt;</button>
    </div>
  );
}

export default HomeCarousel;

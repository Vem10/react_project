import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../css/Home.css'

function Home() {
  const [popularProducts, setPopularProducts] = useState([]);
  const [trendyProducts, setTrendyProducts] = useState([]);
  // const navigate = useNavigate();

useEffect(() => {
  axios.get('http://localhost:3001/products?category=bridal&_limit=5')
    .then(res => setPopularProducts(res.data || []))
    .catch(err => console.error('Error fetching popular products:', err));

  axios.get('http://localhost:3001/products?_sort=id&_order=desc&_limit=8')
    .then(res => setTrendyProducts(res.data || []))
    .catch(err => console.error('Error fetching trendy products:', err));
}, []);


  return (
    <div>
      <div className="main_layout">
        <div className="first_pic">
          <a href="/">
            <img src="/assets/homegrid/collections2.png" alt="Collections" width="100%" className="luxury-img" />
          </a>
          <div className="overlay-text" style={{
            fontFamily: 'MonteCarlo', color: '#d4b689', fontSize: '100px', fontWeight: 600, textAlign: 'center'
          }}>
            Collections
          </div>
        </div>

        <div className="second_pic">
          <a href="/category/bridal">
            <img src="/assets/homegrid/bridealweargrid.png.png" alt="Bridal Wear" width="100%" className="luxury-img" />
          </a>
          <div className="overlay-text" style={{
            fontFamily: 'MonteCarlo', color: '#d4b689', fontSize: '50px', fontWeight: 500, textAlign: 'center'
          }}>
            Alankaar Brides
          </div>
        </div>

        <div className="third_pic">
          <a href="/category/groom">
            <img src="/assets/homegrid/groomswear.png" alt="Grooms Wear" width="100%" height="100%" className="luxury-img" />
          </a>
          <div className="overlay-text" style={{
            fontFamily: 'MonteCarlo', color: '#d4b689', fontSize: '42px', fontWeight: 500, textAlign: 'center'
          }}>
            Alankaar Grooms
          </div>
        </div>

        <div className="fouth_pic">
          <a href="/category/jewellery">
            <img src="/assets/homegrid/jewellerygrid.png" alt="Jewellery" width="100%" height="100%" className="luxury-img" />
          </a>
          <div className="overlay-text" style={{
            fontFamily: 'MonteCarlo', color: '#d4b689', fontSize: '50px', fontWeight: 500, textAlign: 'center'
          }}>
            Alankaar Jewellery
          </div>
        </div>

        <div className="fifth_pic">
          <a href="#plw">
            <img src="/assets/homegrid/occasionwear.png" alt="Trending" width="100%" height="100%" className="luxury-img" />
          </a>
          <div className="overlay-text" style={{
            fontFamily: 'MonteCarlo', color: '#d4b689', fontSize: '50px', fontWeight: 500, textAlign: 'center'
          }}>
            Trending
          </div>
        </div>
      </div>

      {/* Carousel */}
      {popularProducts.length > 0 && (
        <div style={{ width: '100%', marginTop: '100px', textAlign: 'center' }}>
          <h1 style={{ fontFamily: 'MonteCarlo', fontSize: '60px', fontWeight: 600, color: '#7d6a2c' }}>
            A quick Glance...
          </h1>
          <div className="carousel-wrapper">
            {popularProducts.map(item => (
              <div key={item.id} className="carousel-slide">
                <a href={`/details/${item.id}`}>
                  <img src={item.image} alt={item.name} className="product-header-image" />
                </a>
                <div className="carousel-caption">
                  <h3>{item.name}</h3>
                  <p>{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Trending Products */}
      <div className="product-list-wrapper" id="plw" style={{ marginLeft: '40px' }}>
        <h1>Our Newly Launched Products</h1>
        <div className="row">
          {trendyProducts.map(item => (
            <div className="col-sm-3" key={item.id}>
              <a href={`/details/${item.id}`} className="product-item">
                <img src={item.image} alt={item.name} />
                <div className="product-details">
                  <h6 className="name-head">{item.name}</h6>
                  <div className="product-price">
                    <h6>Price: {item.price}</h6>
                  </div>
                  <div className="product-color">
                    <h6>Color: {item.color}</h6>
                  </div>
                </div>
                <div className="product-footer"></div>
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;

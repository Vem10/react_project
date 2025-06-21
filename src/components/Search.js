import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
// import './Search.css';

function Search() {
  const { query } = useParams();
  const [searchResult, setSearchResult] = useState([]);

  useEffect(() => {
    if (query) {
      axios.get(`http://localhost:3001/products?q=${query}`)
        .then(res => {
          setSearchResult(res.data || []);
        });
    }
  }, [query]);

  return (
    <>
      {searchResult.length > 0 ? (
        searchResult.map((item) => (
          <div className="row search-item" key={item.id}>
            <div className="col-sm-3">
              <Link to={`/details/${item.id}`}>
                <img src={`/${item.image}`} alt={item.name} />
              </Link>
            </div>
            <div className="col-sm-8 details">
              <h6>
                <Link to={`/details/${item.id}`}>{item.name}</Link>
              </h6>
              <p><b>Price: {item.price}</b></p>
              <p><span>Color: {item.color}</span> | <span>Category: {item.category}</span></p>
              <p>{item.description}</p>
            </div>
          </div>
        ))
      ) : (
        <p style={{ padding: '20px' }}>No results found for "<strong>{query}</strong>"</p>
      )}
    </>
  );
}

export default Search;

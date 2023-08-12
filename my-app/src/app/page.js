'use client'

import React, { useState, useEffect } from 'react';
import { fetchProducts } from './productService';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({
    brand: '',
    price: '',
    rating: '',
  });
  const [orderBy, setOrderBy] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchProducts();
      setProducts(data.products);
    };
    fetchData();
  }, []);

  const filteredAndOrderedProducts = products.filter((product) => {
    let result = true;

    if (filters.brand && product.brand !== filters.brand) {
      result = false;
    }
    if (filters.price && product.price > parseFloat(filters.price)) {
      result = false;
    }
    if (filters.rating && product.rating < parseFloat(filters.rating)) {
      result = false;
    }

    return result;
  }).sort((a, b) => {
    if (orderBy === 'title') {
      return a.title.localeCompare(b.title);
    }
    if (orderBy === 'price') {
      return a.price - b.price;
    }
    if (orderBy === 'rating') {
      return b.rating - a.rating;
    }
    return 0;
  });

  return (
    <div>
      <h1>Product List</h1>
      <div>
        <label>Order By:</label>
        <select value={orderBy} onChange={(e) => setOrderBy(e.target.value)}>
          <option value="">Order By</option>
          <option value="title">Title</option>
          <option value="price">Price</option>
          <option value="rating">Rating</option>
        </select>
      </div>
      <div>
        <label>Filter by Brand:</label>
        <input
          type="text"
          value={filters.brand}
          onChange={(e) => setFilters({ ...filters, brand: e.target.value })}
        />
      </div>
      <div>
        <label>Filter by Price:</label>
        <input
          type="number"
          value={filters.price}
          onChange={(e) => setFilters({ ...filters, price: e.target.value })}
        />
      </div>
      <div>
        <label>Filter by Rating:</label>
        <input
          type="number"
          value={filters.rating}
          onChange={(e) => setFilters({ ...filters, rating: e.target.value })}
        />
      </div>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Price</th>
            <th>Rating</th>
            <th>Brand</th>
          </tr>
        </thead>
        <tbody>
          {filteredAndOrderedProducts.map((product) => (
            <tr key={product.id}>
              <td>{product.title}</td>
              <td>${product.price}</td>
              <td>{product.rating}</td>
              <td>{product.brand}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Home;

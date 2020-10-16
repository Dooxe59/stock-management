import React from 'react';
import {  useSelector } from 'react-redux';
import { productsSelector } from '../../store/products/productsSelector';
import ProductItem from './productItem/ProductItem';

const ProductList = () => {
  const products = useSelector(productsSelector);

  const renderProducts = () => {
    return products.map((product) => {
      return <ProductItem product={product} key={product.id}></ProductItem>
    })
  }

  return (
    <div className="product-list">
      { renderProducts() }
    </div>
  );
};

export default ProductList;
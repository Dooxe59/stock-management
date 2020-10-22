import React from 'react';
import { useSelector } from 'react-redux';
import { productsSelector } from '../../store/products/productsSelector';
import ProductItem from './productItem/ProductItem';

import "./productList.scss";

const ProductList = () => {
  const products = useSelector(productsSelector);

  const renderProducts = () => {
    if(!products.length) return 'La liste est vide !';
    return products.map((product) => {
      return <ProductItem product={product} key={`${product.id}-${product.productName}`}></ProductItem>
    })
  }

  return (
    <div className="product-list">
      { renderProducts() }
    </div>
  );
};

export default ProductList;
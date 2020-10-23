import React from 'react';
import { useSelector } from 'react-redux';
import { productsSelector } from '../../store/products/productsSelector';
import ProductItem from './productItem/ProductItem';

import "./productList.scss";

const ProductList = ({searchFilter}) => {
  const products = useSelector(productsSelector);

  const filteredProducts = () => {
    const trimmedSearchFilter = searchFilter.trim()?.toLowerCase();
    return trimmedSearchFilter ? 
      products.filter(product => product.productName.toLowerCase().includes(trimmedSearchFilter)) : products
  };

  const renderProducts = () => {
    if(!filteredProducts().length) return 'La liste est vide !';
    return filteredProducts().map((product) => {
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
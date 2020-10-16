import React from 'react';
import AddProductForm from '../../components/addProductForm/AddProductForm';
import ProductList from '../../components/productList/ProductList';

import "./home.scss";

const Home = () => {
  return (
    <div className="home-page">
      <AddProductForm></AddProductForm>
      <ProductList></ProductList>
    </div>
  );
};

export default Home;
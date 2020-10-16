import React from 'react';
import AddProductForm from '../../components/addProductForm/AddProductForm';
import ProductList from '../../components/productList/ProductList';
import moment from "moment";

import "./home.scss";

const Home = () => {
  return (
    <div className="home-page">
      Nous sommes le {moment().format('LL')}
      <AddProductForm></AddProductForm>
      <ProductList></ProductList>
    </div>
  );
};

export default Home;
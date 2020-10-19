import React from 'react';
import AddProductForm from '../../components/addProductForm/AddProductForm';
import ProductList from '../../components/productList/ProductList';
import moment from "moment";

import "./home.scss";

const Home = () => {
  return (
    <div className="home">
      <AddProductForm></AddProductForm>
      <ProductList></ProductList>
      <footer>
        Nous sommes le {moment().format('LL')}
      </footer>
    </div>
  );
};

export default Home;
import React from 'react';
import moment from "moment";
import AddProductForm from '../../components/addProductForm/AddProductForm';
import ProductList from '../../components/productList/ProductList';

import "./home.scss";
import { Text } from '@chakra-ui/core';

const Home = () => {
  return (
    <div className="home">
      {/* DRAWER chakra filter */}
      <div className="action-toolbar">
        <Text 
          fontSize={["sm", "md"]}
          className="current-products-filter">
          Tous les produits
        </Text>
        <AddProductForm></AddProductForm>
      </div>
      <ProductList></ProductList>
      <footer className="app-footer">
        <Text fontSize={["sm", "md"]}>
          Nous sommes le {moment().format('LL')}
        </Text>
      </footer>
    </div>
  );
};

export default Home;
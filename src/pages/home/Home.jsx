import React from 'react';
import moment from "moment";
import AddProductForm from '../../components/addProductForm/AddProductForm';
import ProductList from '../../components/productList/ProductList';

import "./home.scss";
import { Text } from '@chakra-ui/core';
import { useState } from 'react';
import FilterToolbar from '../../components/filterToolbar/FilterToolbar';

const Home = () => {
  const [searchFilter, setSearchFilter] = useState("");

  const currentProductFilter = () => {
    return searchFilter.trim().length ? `Liste filtrée (nom: ${searchFilter})` : 'Tous les produits';
  };

  return (
    <div className="home">
      {/* DRAWER chakra filter */}
      <div className="filter-toolbar">
        <FilterToolbar
          searchFilter={searchFilter}
          handleInputSearchFilterChange={(event) => setSearchFilter(event.target.value)}>  
        </FilterToolbar>
      </div>
      <div className="action-toolbar">
        <Text 
          fontSize={["sm", "md"]}
          className="current-products-filter">
          { currentProductFilter() }
        </Text>
        <AddProductForm></AddProductForm>
      </div>
      <ProductList searchFilter={searchFilter}></ProductList>
      <footer className="app-footer">
        <Text fontSize={["sm", "md"]}>
          Nous sommes le {moment().format('LL')}
        </Text>
      </footer>
    </div>
  );
};

export default Home;
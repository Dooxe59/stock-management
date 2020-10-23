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
  const [locationFilter, setLocationFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [productSort, setProductSort] = useState("");

  const currentProductFilter = () => {
    return searchFilter.trim().length ? `Liste filtrée` : 'Tous les produits';
  };

  return (
    <div className="home">
      {/* DRAWER chakra filter */}
      <div className="filter-toolbar">
        <FilterToolbar
          searchFilter={searchFilter}
          locationFilter={locationFilter}
          categoryFilter={categoryFilter}
          productSort={productSort}
          handleInputSearchFilterChange={(event) => setSearchFilter(event.target.value)}  
          handleInputLocationFilterChange={(event) => setLocationFilter(parseInt(event.target.value) || "")}
          handleInputCategoryFilterChange={(event) => setCategoryFilter(parseInt(event.target.value) || "")}
          handleInputProductSortChange={(event) => setProductSort(parseInt(event.target.value) || "")}>  
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
      <ProductList 
        searchFilter={searchFilter}
        locationFilter={locationFilter}
        categoryFilter={categoryFilter}
        productSort={productSort}>
      </ProductList>
      <footer className="app-footer">
        <Text fontSize={["sm", "md"]}>
          Nous sommes le {moment().format('LL')}
        </Text>
      </footer>
    </div>
  );
};

export default Home;
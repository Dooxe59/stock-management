import React from 'react';
import moment from "moment";
import AddProductForm from '../../components/addProductForm/AddProductForm';
import ProductList from '../../components/productList/ProductList';

import "./home.scss";
import { Text } from '@chakra-ui/core';
import { useState } from 'react';
import FilterToolbar from '../../components/filterToolbar/FilterToolbar';
import { sortProductOptions } from '../../consts';

const Home = () => {
  const [searchFilter, setSearchFilter] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [productSort, setProductSort] = useState(sortProductOptions[0].id);

  const resetFilters = () => {
    setSearchFilter("");
    setLocationFilter("");
    setCategoryFilter("");
  };

  const currentProductFilter = () => {
    return searchFilter.trim().length || locationFilter || categoryFilter ? `Liste filtrée` : 'Tous les produits';
  };

  return (
    <div className="home">
      {/* DRAWER chakra filter */}
      <FilterToolbar
        searchFilter={searchFilter}
        locationFilter={locationFilter}
        categoryFilter={categoryFilter}
        productSort={productSort}
        handleInputSearchFilterChange={(event) => setSearchFilter(event.target.value)}  
        handleInputLocationFilterChange={(event) => setLocationFilter(parseInt(event.target.value) || "")}
        handleInputCategoryFilterChange={(event) => setCategoryFilter(parseInt(event.target.value) || "")}
        handleInputProductSortChange={(event) => setProductSort(parseInt(event.target.value) || "")}
        resetFilters={resetFilters}>  
      </FilterToolbar>
      <div className="action-toolbar">
        <Text 
          fontSize={["sm", "md"]}
          className="current-products-filter">
          { currentProductFilter() }
        </Text>
        <AddProductForm></AddProductForm>
      </div>
      <div className="product-list-container">
        <ProductList 
          searchFilter={searchFilter}
          locationFilter={locationFilter}
          categoryFilter={categoryFilter}
          productSort={productSort}>
        </ProductList>
      </div>
      <footer className="app-footer">
        <Text fontSize={["sm", "md"]}>
          Nous sommes le {moment().format('LL')}
        </Text>
      </footer>
    </div>
  );
};

export default Home;
import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { productsSelector } from '../../store/products/productsSelector';
import ProductItem from './productItem/ProductItem';
import _ from 'lodash';
import moment from 'moment';
import { Spinner } from '@chakra-ui/react';

import './productList.scss';

const ProductList = ({searchFilter, locationFilter, categoryFilter, productSort}) => {
  const products = useSelector(productsSelector);
  const filteredProducts = () => {
    const trimmedSearchFilter = searchFilter.trim()?.toLowerCase();

    let sortedProducts = products ? [...products] : [];
    switch(productSort) {
    case 1:
      sortedProducts = _.orderBy(sortedProducts, (product) => {
        const date = moment(product.expirationDate, 'DD/MM/YYYY')?.isValid() ?
          moment(product.expirationDate, 'DD/MM/YYYY')?.toDate() : null;
        return date;
      });
      break;
    case 2:
      sortedProducts = _.orderBy(sortedProducts, 'productName', 'asc');
      break;
    case 3:
      sortedProducts = _.orderBy(sortedProducts, 'categoryKey', 'asc');
      break;
    case 4:
      sortedProducts = _.orderBy(sortedProducts, 'locationKey', 'asc');
      break;
    default: 
      break;
    }

    if(!trimmedSearchFilter && !locationFilter && !categoryFilter) return sortedProducts;
    
    let filtered = [...sortedProducts];

    if (trimmedSearchFilter) {
      filtered = filtered.filter(product => 
        product.productName.toLowerCase().includes(trimmedSearchFilter));
    }

    if (locationFilter) {
      filtered = filtered.filter(product => product.locationKey === locationFilter);
    }

    if (categoryFilter) {
      filtered = filtered.filter(product => product.categoryKey === categoryFilter);
    }

    return filtered;
  };

  const renderProducts = () => {
    if (!products || !filteredProducts().length) return "Chargement / Pas de data";
    return filteredProducts().map((product) => {
      return <ProductItem product={product} key={product.productKey}></ProductItem>;
    });
  };

  return (
    <div className="product-list">
      { renderProducts() }
    </div>
  );
};

ProductList.propTypes = {
  searchFilter: PropTypes.string.isRequired,
  locationFilter: PropTypes.string.isRequired,
  categoryFilter: PropTypes.string.isRequired,
  productSort: PropTypes.number.isRequired,
};

export default ProductList;
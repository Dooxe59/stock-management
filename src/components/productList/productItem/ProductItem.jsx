import React from 'react';
import { useSelector } from 'react-redux';
import { locationsSelector } from '../../../store/locations/locationsSelector';
import moment from "moment";

import "./productItem.scss";
import { categoriesSelector } from '../../../store/categories/categoriesSelector';

const ProductItem = ({product}) => {
  const locations = useSelector(locationsSelector);
  const currentLocation = locations.find(location => location.id === product.locationId);
  
  // TODO: 2 render by default ??

  const momentExpirationDate = moment(product.expirationDate, "DDMMYYYY");
  const isValidExpirationDate = momentExpirationDate.isValid();
  const renderProductExpirationDate = () => {
    return isValidExpirationDate ?
      <div className="product-expiration-date">
        Périmé {momentExpirationDate.fromNow()} ({product.expirationDate})
      </div> : '';
  };

  const currentDate = moment();
  const daysRemaining = momentExpirationDate.diff(currentDate, 'days') + 1;

  const renderProductExpirationDateState = () => {
    if(!isValidExpirationDate) return '';
        
    let status = '';

    if(daysRemaining < 0) {
      status = `Date dépassée depuis ${daysRemaining * -1} jours!`;
    } else if(daysRemaining === 0) {
      status = "Date limite aujourd'hui !"
    } else if(daysRemaining === 1) {
      status = `Date limite demain`;
    } else if(daysRemaining <= 3) {
      status = `Date proche, plus que ${daysRemaining} jours!`;
    } else {
      status = `Encore ${daysRemaining} jours`;
    }

    return (
      <div className="expiration-date-status">
        { status }
      </div>)
  };

  const categories = useSelector(categoriesSelector);
  const currentCategory = categories.find(category => category.id === product.categoryId);
  const renderProductCategory = () => {
    return currentCategory?.label ? (
      <div className="product-category">
        Catégorie: {currentCategory?.label}
      </div>
    ) : '';
  };

  return (
    <div className="product-item">
      <div className="product-name">
        {/* TODO: Editable component chakra */}
        Produit: {product.productName}
      </div>
      <div className="product-location">
        Emplacement: {currentLocation?.label}
      </div>
      {renderProductExpirationDate()}
      {renderProductExpirationDateState()}
      {renderProductCategory()}
    </div>
  );
};

export default ProductItem;
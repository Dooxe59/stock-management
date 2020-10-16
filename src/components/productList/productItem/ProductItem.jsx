import React from 'react';
import { useSelector } from 'react-redux';
import { locationsSelector } from '../../../store/locations/locationsSelector';
import moment from "moment";

import "./productItem.scss";

const ProductItem = ({product}) => {
  const locations = useSelector(locationsSelector);

  const currentLocation = locations.find(location => location.id === product.locationId);

  const renderProductExpirationDate = () => {
    return product.expirationDate ?
      <div className="product-expiration-date">
        Périmé {moment(product.expirationDate, "DDMMYYYY").fromNow()} ({product.expirationDate})
      </div> : '';
  };

  const productDate = moment(product.expirationDate, "DDMMYYYY");
  const currentDate = moment();
  const daysRemaining = productDate.diff(currentDate, 'days') + 1;

  const renderProductExpirationDateState = () => {
    if(!product.expirationDate) return '';
        
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

  return (
    <div className="product-item">
      <div className="product-name">
        {/* Editable component chakra */}
        Produit: {product.productName}
      </div>
      <div className="product-location">
        Emplacement: {currentLocation.label}
      </div>
      {renderProductExpirationDate()}
      {renderProductExpirationDateState()}
    </div>
  );
};

export default ProductItem;
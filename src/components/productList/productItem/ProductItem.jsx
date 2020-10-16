import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { locationsSelector } from '../../../store/location/locationsSelector';

const ProductItem = ( {product}) => {
  const locations = useSelector(locationsSelector);

  const currentLocation = locations.find(location => location.id === product.locationId);

  const renderProductExpirationDate = () => {
    return product.expirationDate ?
      <div className="product-expiration-date">
        Date de péremption: {product.expirationDate}
      </div> : '';
  };

  return (
    <div className="product">
      <div className="product-name">
        Produit: {product.productName}
      </div>
      <div className="product-location">
        Emplacement: {currentLocation.label}
      </div>
      {renderProductExpirationDate()}
    </div>
  );
};

ProductItem.propTypes = {
  
};

export default ProductItem;
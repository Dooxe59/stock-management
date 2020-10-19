import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { locationsSelector } from '../../../store/locations/locationsSelector';
import { categoriesSelector } from '../../../store/categories/categoriesSelector';
import { deleteProduct } from '../../../store/products/productsActions';
import moment from "moment";

import { Button, ButtonGroup, Tag, useToast } from "@chakra-ui/core";
import { DeleteIcon, EditIcon } from '@chakra-ui/icons';

import "./productItem.scss";

const ProductItem = ({product}) => {
  const dispatch = useDispatch(); 
  const deleteSelectedProduct = useCallback((product) => {
    dispatch(deleteProduct(product));
  }, []);

  const toast = useToast();

  const COLORS = ['blue', 'purple', 'red', 'green', 'orange', 'teal', 'gray', 'cyan', 'pink'];
  const locations = useSelector(locationsSelector);
  const currentLocation = locations.find(location => location.id === product.locationId);
  
  // TODO: 2 render by default ??

  const momentExpirationDate = moment(product.expirationDate, "DDMMYYYY");
  const isValidExpirationDate = momentExpirationDate.isValid();

  const currentDate = moment();
  const daysRemaining = momentExpirationDate.diff(currentDate, 'days') + 1;

  const renderProductExpirationDateState = () => {
    let status = '';
    let classes = '';

    if(!isValidExpirationDate) {
      status = `Pas de date d'expiration`;
      classes = 'no-expiration-date-alert';
    } else if(daysRemaining < 0) {
      status = `Date dépassée depuis ${daysRemaining * -1} jours!`;
      classes = 'expiration-date-alert';
    } else if(daysRemaining === 0) {
      status = "Date limite aujourd'hui !"
      classes = 'expiration-date-alert';
    } else if(daysRemaining === 1) {
      status = `Date limite demain`;
      classes = 'expiration-date-warning';
    } else if(daysRemaining <= 3) {
      status = `Date proche, plus que ${daysRemaining} jours!`;
      classes = 'expiration-date-warning';
    } else {
      status = `Reste ${daysRemaining} jours`;
    }

    return (
      <div className={`expiration-date-status ${classes} truncated`} title={status}>
        { status }
      </div>)
  };

  const categories = useSelector(categoriesSelector);
  const currentCategory = categories.find(category => category.id === product.categoryId);
  const renderProductCategory = () => {
    return currentCategory?.label ? (
      <div className="product-category">
        <Tag size="md" variant="solid" colorScheme={getColorSchemeById(currentCategory.id, 4)}>{currentCategory?.label}</Tag>
      </div>
    ) : '';
  };

  const getColorSchemeById = (id, shift = 0) => {
    const colorIndex = (id + shift) % 9;
    return COLORS[colorIndex];
  };

  return (
    <div className="product-item">
      <div className="product-name truncated" title={product.productName}>
        {product.productName}
      </div>
      <div className="product-location">
        <Tag size="md" variant="solid" colorScheme={getColorSchemeById(currentLocation.id)}>{currentLocation?.label}</Tag>
      </div>
      <div className="product-quantity">
        Quantité: {product.quantity}
      </div>
      {renderProductExpirationDateState()}
      {renderProductCategory()}
      <div className="product-item-actions">
      <ButtonGroup spacing="2">
          <Button 
            leftIcon={<EditIcon />}
            size="xs" 
            colorScheme="blue"
            onClick={() => 
              toast({
                title: "Non implémenté.",
                description: "Fonctionnalité non implémentée. Work In Progress ...", 
                status: "warning",
                duration: 3000,
                isClosable: true,
              })
            }>
            Modifier
          </Button>
          <Button 
            leftIcon={<DeleteIcon />}
            size="xs" 
            colorScheme="red"
            onClick={() => deleteSelectedProduct({productId: product.id})
            }>
            Supprimer
          </Button>
        </ButtonGroup>
      </div>
    </div>
  );
};

export default ProductItem;
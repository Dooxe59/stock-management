import React from 'react';
import LocationSelectorInput from '../inputs/locationSelectorInput/LocationSelectorInput';
import CategorySelectorInput from '../inputs/categorySelectorInput/CategorySelectorInput';
import { FormLabel, Input } from '@chakra-ui/core';

const ProductForm = ({
  productLabel, 
  productQuantity, 
  productExpirationDate,
  productLocation, 
  productCategory,
  handleInputProductLabelChange, 
  handleInputProductQuantityChange,
  handleInputProductLocationChange,
  handleInputProductCategoryChange,
  handleInputProductExpirationDateChange,
  handleKeyDown}) => {
  return (
    <div className="product-form">
      <div className="product-label">
        <FormLabel fontSize={['sm', 'md']} htmlFor="productName">
            Nom du produit
        </FormLabel>
        <Input 
          id="productName"
          variant="filled"
          size="sm" 
          autoComplete="off"
          placeholder="Nom du produit" 
          value={productLabel}
          onChange={handleInputProductLabelChange}
          onKeyDown={handleKeyDown}/>
      </div>
      <div className="product-quantity">
        <FormLabel fontSize={['sm', 'md']} htmlFor="productQuantity">
            Quantité
        </FormLabel>
        <Input 
          id="productQuantity"
          variant="filled"
          size="sm" 
          autoComplete="off"
          placeholder="Quantité" 
          value={productQuantity}
          onChange={handleInputProductQuantityChange}
          onKeyDown={handleKeyDown}/>
      </div>
      <div className="product-expiration-date">
        <FormLabel fontSize={['sm', 'md']} htmlFor="productExpirationDate">
            Date de péremption (JJ/MM/AAAA)
        </FormLabel>
        <Input 
          id="productExpirationDate"
          variant="filled"
          size="sm" 
          autoComplete="off"
          placeholder="Date d'expiration" 
          value={productExpirationDate}
          onChange={handleInputProductExpirationDateChange}
          onKeyDown={handleKeyDown}/>
      </div>
      <div className="product-location">
        <LocationSelectorInput 
          productLocation={productLocation}
          handleInputProductLocationChange={handleInputProductLocationChange}>
        </LocationSelectorInput>
      </div>
      <div className="product-category">
        <CategorySelectorInput
          productCategory={productCategory}
          handleInputProductCategoryChange={handleInputProductCategoryChange}>
        </CategorySelectorInput>
      </div>
    </div>
  );
};

export default ProductForm;
import React from 'react';
import LocationSelectorInput from '../locationSelectorInput/LocationSelectorInput';
import CategorySelectorInput from '../categorySelectorInput/CategorySelectorInput';
import { FormLabel, Input } from "@chakra-ui/core";
import DatePicker from "react-datepicker";

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
  handleKeyDown, 
  setProductExpirationDate}) => {
  return (
    <div className="product-form">
       <div className="product-label">
          <FormLabel fontSize={["sm", "md"]} htmlFor="productName">
            Nom du produit
          </FormLabel>
          <Input 
            id="productName"
            // autoFocus
            variant="filled"
            size="sm" 
            autoComplete="off"
            placeholder="Nom du produit" 
            value={productLabel}
            // ref={productLabelInputRef}
            onChange={handleInputProductLabelChange}
            onKeyDown={handleKeyDown}/>
        </div>
        <div className="product-quantity">
          <FormLabel fontSize={["sm", "md"]} htmlFor="productQuantity">
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
          <FormLabel fontSize={["sm", "md"]} htmlFor="productExpirationDate">
            Date de péremption (JJ/MM/AAAA)
          </FormLabel>
          <Input 
            as={DatePicker}
            id="productExpirationDate"
            variant="filled"
            size="sm" 
            locale="fr"
            autoComplete="off"
            dateFormat="dd/MM/yyyy"
            placeholderText="Date d'expiration"
            selected={productExpirationDate}
            onChange={date => setProductExpirationDate(date)}
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
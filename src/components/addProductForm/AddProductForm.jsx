import React, { useCallback, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { categoriesSelector } from '../../store/categories/categoriesSelector';
import { locationsSelector } from '../../store/locations/locationsSelector';
import { addProduct } from '../../store/products/productsActions';
import Button from '../ui/button/Buttons';

const AddProductForm = () => {
  const dispatch = useDispatch();
  const addNewProduct = useCallback((product) => {
    dispatch(addProduct(product));
  }, []);

  const [productLabel, setProductLabel] = useState("");
  const handleInputProductLabelChange = (event) => {
    setProductLabel(event.target.value);
  };

  const [productQuantity, setProductQuantity] = useState("");
  const handleInputProductQuantityChange = (event) => {
    setProductQuantity(event.target.value);
  };

  const [productExpirationDate, setProductExpirationDate] = useState("");
  const handleInputProductExpirationDateChange = (event) => {
    setProductExpirationDate(event.target.value);
  };

  const [productLocation, setProductLocation] = useState(1);
  const handleInputProductLocationChange = (event) => {
    setProductLocation(parseInt(event.target.value));
  };
  const locations = useSelector(locationsSelector);
  const renderSelectLocationOptions = () => {
    return locations.map(location => {
      return <option value={location.id} key={location.id}>{location.label}</option>
    });
  };

  const [productCategory, setProductCategory] = useState("");
  const handleInputProductCategoryChange = (event) => {
    setProductCategory(parseInt(event.target.value));
  };
  const categories = useSelector(categoriesSelector);
  const renderSelectCategoryOptions = () => {
    return categories.map(category => {
      return <option value={category.id} key={category.id}>{category.label}</option>
    });
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      validateAndAddProduct();
      event.preventDefault();
    }
  };

  const isValidProduct =
    productLabel?.trim()?.length > 0
    && productQuantity?.trim()?.length > 0;

  const productLabelInputRef = useRef(null);
  const setFocusOnFirstInput = () => {
    productLabelInputRef.current.focus();
  };

  const validateAndAddProduct = () => {
    if (isValidProduct) {
      const product = {
        name: productLabel.trim(),
        locationId: productLocation,
        categoryId: productCategory,
        quantity: productQuantity.trim(),
        expirationDate: productExpirationDate.trim(),
      };

      product.name = product.name.charAt(0).toUpperCase() + product.name.slice(1);
      addNewProduct(product);
      clearProductForm();
      setFocusOnFirstInput();
    }
  }

  const clearProductForm = () => {
    setProductLabel("");
    setProductQuantity("");
    setProductExpirationDate("");
  };

  return (
    <div className="add-product-form">
      <div className="product-label">
        <label className="product-label-input-label">
          <span>
            Nom du produit
          </span>
          <input
            autoFocus
            className="product-label-input"
            name="productLabel"
            type="text"
            autoComplete="off"
            placeholder=" "
            ref={productLabelInputRef}
            value={productLabel}
            onChange={handleInputProductLabelChange}
            onKeyDown={handleKeyDown}
          />
        </label>
      </div>
      <div className="product-quantity">
        <label className="product-quantity-input-label">
          <span>
            Quantité
          </span>
          <input
            className="product-quantity-input"
            name="productQuantity"
            type="text"
            autoComplete="off"
            placeholder=" "
            value={productQuantity}
            onChange={handleInputProductQuantityChange}
            onKeyDown={handleKeyDown}
          />
        </label>
      </div>
      <div className="product-expiration-date">
        <label className="product-expiration-date-input-label">
          <span>
            Date de péremption (JJ/MM/AAAA)
          </span>
          <input
            className="product-expiration-date-input"
            name="productExpirationDate"
            type="text"
            autoComplete="off"
            placeholder=" "
            value={productExpirationDate}
            onChange={handleInputProductExpirationDateChange}
            onKeyDown={handleKeyDown}
          />
        </label>
      </div>
      <div className="product-location">
        <label className="product-location-input-label">
          <span>
            Emplacement
          </span>
          <select value={productLocation} onChange={handleInputProductLocationChange}>
            {renderSelectLocationOptions()}
          </select>
        </label>
        <div className="product-category">
          <label className="product-category-input-label">
            <span>
              Catégorie
            </span>
            <select value={productCategory} onChange={handleInputProductCategoryChange}>
              <option value=""></option>
              {renderSelectCategoryOptions()}
            </select>
          </label>
        </div>
      </div>
      <Button
        theme="green"
        label="Ajouter le produit"
        isDisabled={!isValidProduct}
        onClick={validateAndAddProduct}
      ></Button>
    </div>
  );
};

export default AddProductForm;
import { FormLabel, Select } from '@chakra-ui/react';
import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { categoriesSelector } from '../../../store/categories/categoriesSelector';

const CategorySelectorInput = ({productCategory, handleInputProductCategoryChange, inputSize = 'sm'}) => {
  const categories = useSelector(categoriesSelector);
  const renderSelectCategoryOptions = () => {
    return categories.map((category, index) => {
      return <option value={category.categoryKey} key={index}>{category.label}</option>;
    });
  };

  return (
    <div className="category-selector-input">
      <FormLabel fontSize={['sm', 'md']} htmlFor="productExpirationDate">
        Catégorie
      </FormLabel>
      <Select size={inputSize} value={productCategory} onChange={handleInputProductCategoryChange}>
        <option value=""></option>
        {renderSelectCategoryOptions()}
      </Select>
    </div>
  );
};

CategorySelectorInput.propTypes = {
  productCategory: PropTypes.string.isRequired,
  handleInputProductCategoryChange: PropTypes.func.isRequired,
  inputSize: PropTypes.string,
};

export default CategorySelectorInput;
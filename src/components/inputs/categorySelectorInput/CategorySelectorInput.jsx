import { FormLabel, Select } from '@chakra-ui/core';
import React from 'react';
import { useSelector } from 'react-redux';
import { categoriesSelector } from '../../../store/categories/categoriesSelector';

const CategorySelectorInput = ({productCategory, handleInputProductCategoryChange}) => {
  const categories = useSelector(categoriesSelector);
  const renderSelectCategoryOptions = () => {
    return categories.map(category => {
      return <option value={category.id} key={category.id}>{category.label}</option>
    });
  };

  return (
    <div className="category-selector-input">
      <FormLabel fontSize={["sm", "md"]} htmlFor="productExpirationDate">
        Catégorie
      </FormLabel>
      <Select value={productCategory} onChange={handleInputProductCategoryChange}>
        <option value=""></option>
        {renderSelectCategoryOptions()}
      </Select>
    </div>
  );
};

export default CategorySelectorInput;
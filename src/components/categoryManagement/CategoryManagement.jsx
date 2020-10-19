import React, { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addCategory } from '../../store/categories/categoriesActions';
import CategoryList from './categoryList/CategoryList';
import { Button, Input } from "@chakra-ui/core";
import { AddIcon } from '@chakra-ui/icons';

import "./categoryManagement.scss";

const CategoryManagement = () => {
  const dispatch = useDispatch();
  const addNewCategory = useCallback((category) => {
    dispatch(addCategory(category));
  }, []);

  const [newCategoryLabel, setNewCategoryLabel] = useState("");

  const handleInputTextChange = (event) => {
    setNewCategoryLabel(event.target.value);
  };

  const isValidNewCategoryLabel = newCategoryLabel?.trim()?.length > 0;

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      validateAndAddNewCategory();
      event.preventDefault();
    }
  };

  const validateAndAddNewCategory = () => {
    if (isValidNewCategoryLabel) {
      let categoryLabel = newCategoryLabel.trim();
      categoryLabel = categoryLabel.charAt(0).toUpperCase() + categoryLabel.slice(1);

      addNewCategory({categoryLabel: categoryLabel});
      clearInputText();
    }
  };

  const clearInputText = () => {
    setNewCategoryLabel("");
  };

  return (
    <div className="category-management">
      <div className="add-category-form">
        <Input 
          autoFocus
          variant="filled"
          size="sm" 
          placeholder="Ajouter un emplacement" 
          value={newCategoryLabel}
          onChange={handleInputTextChange}
          onKeyDown={handleKeyDown}/>
        <Button 
          flexShrink={0}
          marginLeft="10px"
          leftIcon={<AddIcon />}
          size="sm" 
          colorScheme="green"
          isDisabled={!isValidNewCategoryLabel}
          onClick={() => validateAndAddNewCategory()}>
          Ajouter la catégorie
        </Button>
      </div>
      <hr/>
      <CategoryList></CategoryList>
    </div>
  );
};

export default CategoryManagement;
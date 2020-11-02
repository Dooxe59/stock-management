import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addCategory } from '../../store/categories/categoriesActions';
import CategoryList from './categoryList/CategoryList';
import { Button, IconButton, Input, useToast } from "@chakra-ui/core";
import { AddIcon } from '@chakra-ui/icons';
import CategoryService from "../../services/category";
import { categoriesSelector } from '../../store/categories/categoriesSelector';

import "./categoryManagement.scss";

const CategoryManagement = () => {
  const dispatch = useDispatch();
  const addNewCategory = useCallback((category) => {
    dispatch(addCategory(category));
  }, [dispatch]);

  const categories = useSelector(categoriesSelector);

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

  const categoryManagementToast = useToast();

  const validateAndAddNewCategory = () => {
    if (isValidNewCategoryLabel) {
      let categoryLabel = newCategoryLabel.trim();
      categoryLabel = categoryLabel.charAt(0).toUpperCase() + categoryLabel.slice(1);

      let data = {
        label: categoryLabel,
      };

      CategoryService.create(data)
        .then((response) => {
          addNewCategory({categoryLabel: categoryLabel, categoryKey: response.key});
          categoryManagementToast({
            title: "Catégorie ajouté",
            description: `${categoryLabel} a bien été ajouté.`,
            status: "success",
            duration: 5000,
            isClosable: true,
          });
          clearInputText();
        })
        .catch((e) => {
          // TODO: manage loading
          categoryManagementToast({
            title: "Echec de l'ajout de la catégorie",
            description: `${categoryLabel} n'a pas été ajoutée. Veuillez réessayer.`,
            status: "error",
            duration: 5000,
            isClosable: true,
          });
          console.log(e);
        });
    }
  };

  const clearInputText = () => {
    setNewCategoryLabel("");
  };

  return (
    <div className="category-management">
      <div className="add-category-form">
        <Input 
          variant="filled"
          size="sm" 
          placeholder="Ajouter un emplacement" 
          value={newCategoryLabel}
          onChange={handleInputTextChange}
          onKeyDown={handleKeyDown}/>
        <Button 
          className="add-category-button add-category-button-text"
          variant="outline"
          size="sm"
          colorScheme="green"
          isDisabled={!isValidNewCategoryLabel}
          onClick={() => validateAndAddNewCategory()}>
          Ajouter 
        </Button>
        <IconButton 
          className="add-category-button add-category-button-icon"
          variant="outline"
          title="Ajouter"
          icon={<AddIcon />} 
          size="sm" 
          colorScheme="green"
          isDisabled={!isValidNewCategoryLabel}
          onClick={() => validateAndAddNewCategory()}/>
      </div>
      <hr/>
      <CategoryList categories={categories}></CategoryList>
    </div>
  );
};

export default CategoryManagement;
import React, { useCallback, useState } from 'react';
import { categoriesSelector } from '../../../store/categories/categoriesSelector';
import { useDispatch, useSelector } from 'react-redux';
import CategoryItem from './categoryItem/CategoryItem';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/core";
import { Button, ButtonGroup, Input } from "@chakra-ui/core";
// TODO: refact iomport
import { updateCategory } from '../../../store/categories/categoriesActions';

import "./categoryList.scss";

const CategoryList = () => {
  const categories = useSelector(categoriesSelector);
  
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [updatedCategory, setUpdatedCategory] = useState({});

  const isValidUpdatedCategory = updatedCategory?.label?.trim().length > 0;

  const openUpdateCategoryModal = (categoryId) => {
    const category = categories.find(category => category.id === categoryId);
    setUpdatedCategory(category);
    onOpen();
  };

  const dispatch = useDispatch();
  const updateCategoryStore = useCallback((category) => {
    dispatch(updateCategory(category));
  }, []);

  const updateCategoryFromModal = () => {
    updateCategoryStore(updatedCategory);
    onClose();
  };

  const renderCategories = () => {
    return categories.map(category => {
      return <CategoryItem category={category} key={category.id} updateCategory={() => openUpdateCategoryModal(category.id)}></CategoryItem>;
    })
  };

  const handleInputTextChange = (event) => {
    setUpdatedCategory({
      label: event.target.value,
      id: updatedCategory.id,
    });
  };

  return (
    <div className="category-list">
      <span className="category-list-section-label">
        Catégories:
      </span>
      { renderCategories() }
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay>
          <ModalContent>
            <ModalHeader>Mise à jour d'une catégorie</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              {/* TODO: vérifier aria label dans app  */}
            <Input 
              size="sm" 
              aria-label="Nom de la catégorie"
              placeholder="Nom de la catégorie" 
              value={updatedCategory.label}
              onChange={handleInputTextChange}/>
            </ModalBody>
            <ModalFooter>
              <ButtonGroup spacing="6">
                <Button colorScheme="blue" isDisabled={!isValidUpdatedCategory} onClick={() => updateCategoryFromModal()}>
                  Mettre à jour
                </Button>
                <Button variant="ghost" onClick={onClose}>Annuler</Button>
              </ButtonGroup>
            </ModalFooter>
          </ModalContent>
        </ModalOverlay>
      </Modal>
    </div>
  );
};

export default CategoryList;
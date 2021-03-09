import React, {
  useCallback,
  useContext,
  useState
} from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { updateCategory } from '../../../store/categories/categoriesActions';
import CategoryItem from './categoryItem/CategoryItem';
import {
  Button,
  ButtonGroup,
  Input,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Text,
  useDisclosure,
} from '@chakra-ui/core';
import CategoryService from '../../../services/category';
import { ToastContext } from '../../../providers/ToastProvider';

import './categoryList.scss';

const CategoryList = ({categories}) => {
  const { 
    isOpen: isOpenUpdateCategoryModal,
    onOpen: onOpenUpdateCategoryModal,
    onClose: onCloseUpdateCategoryModal
  } = useDisclosure();
  const [updatedCategory, setUpdatedCategory] = useState({});

  const isValidUpdatedCategory = updatedCategory?.label?.trim().length > 0;

  const openUpdateCategoryModal = (categoryKey) => {
    const category = categories.find(category => category.categoryKey === categoryKey);
    setUpdatedCategory(category);
    onOpenUpdateCategoryModal();
  };

  const dispatch = useDispatch();
  const updateCategoryStore = useCallback((category) => {
    dispatch(updateCategory(category));
  }, [dispatch]);

  const {toast} = useContext(ToastContext);

  const updateCategoryFromModal = () => {
    const data = {
      label: updatedCategory.label,
    };
    CategoryService.update(updatedCategory.categoryKey, data)
      .then(() => {
        updateCategoryStore(updatedCategory);
        onCloseUpdateCategoryModal();
        toast({
          title: 'Catégorie mise à jour',
          description: `${updatedCategory.label} a bien été mise à jour.`,
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
      })
      .catch((e) => {
        // TODO: manage loading
        toast({
          title: 'Echec de la mise à jour de la catégorie',
          description: `${updatedCategory.label} n'a pas été mis à jour. Veuillez réessayer.`,
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
        console.log(e);
      });
  };

  const renderCategories = () => {
    return categories.map((category, index) => {
      return (
        <CategoryItem 
          category={category} 
          key={index}
          updateCategory={() => openUpdateCategoryModal(category.categoryKey)}>
        </CategoryItem>);
    });
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && isValidUpdatedCategory) {
      updateCategoryFromModal();
      event.preventDefault();
    }
  };

  const handleInputTextChange = (event) => {
    setUpdatedCategory({
      label: event.target.value,
      categoryKey: updatedCategory.categoryKey,
    });
  };

  return (
    <div className="category-list">
      <Text fontSize={['sm', 'md']} className="category-list-section-label">
        Catégories:
      </Text>
      { renderCategories() }
      <Modal isOpen={isOpenUpdateCategoryModal} onClose={onCloseUpdateCategoryModal}>
        <ModalOverlay>
          <ModalContent>
            <ModalHeader fontSize={['md', 'lg']}>Mise à jour d'une catégorie</ModalHeader>
            <ModalBody>
              <Input
                size="sm"
                aria-label="Nom de la catégorie"
                placeholder="Nom de la catégorie"
                value={updatedCategory.label}
                onChange={handleInputTextChange}
                onKeyDown={handleKeyDown}/>
            </ModalBody>
            <ModalFooter>
              <ButtonGroup spacing="6">
                <Button
                  fontSize={['sm', 'md']}
                  size="sm"
                  colorScheme="blue"
                  isDisabled={!isValidUpdatedCategory}
                  onClick={() => updateCategoryFromModal()}>
                  Mettre à jour
                </Button>
                <Button
                  fontSize={['sm', 'md']}
                  size="sm"
                  variant="ghost"
                  onClick={onCloseUpdateCategoryModal}>
                  Annuler
                </Button>
              </ButtonGroup>
            </ModalFooter>
          </ModalContent>
        </ModalOverlay>
      </Modal>
    </div>
  );
};

CategoryList.propTypes = {
  categories: PropTypes.array.isRequired,
};

export default CategoryList;
import React, {
  useCallback,
  useState
} from 'react';
import {
  useDispatch,
  useSelector
} from 'react-redux';
import { categoriesSelector } from '../../../store/categories/categoriesSelector';
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
} from "@chakra-ui/core";

import "./categoryList.scss";

const CategoryList = () => {
  const categories = useSelector(categoriesSelector);

  const { isOpen: isOpenUpdateCategoryModal, onOpen: onOpenUpdateCategoryModal, onClose: onCloseUpdateCategoryModal } = useDisclosure();
  const [updatedCategory, setUpdatedCategory] = useState({});

  const isValidUpdatedCategory = updatedCategory?.label?.trim().length > 0;

  const openUpdateCategoryModal = (categoryId) => {
    const category = categories.find(category => category.id === categoryId);
    setUpdatedCategory(category);
    onOpenUpdateCategoryModal();
  };

  const dispatch = useDispatch();
  const updateCategoryStore = useCallback((category) => {
    dispatch(updateCategory(category));
  }, [dispatch]);

  const updateCategoryFromModal = () => {
    updateCategoryStore(updatedCategory);
    onCloseUpdateCategoryModal();
  };

  const renderCategories = () => {
    return categories.map(category => {
      return <CategoryItem category={category} key={category.id} updateCategory={() => openUpdateCategoryModal(category.id)}></CategoryItem>;
    })
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && isValidUpdatedCategory) {
      updateCategoryFromModal();
      event.preventDefault();
    }
  };

  const handleInputTextChange = (event) => {
    setUpdatedCategory({
      label: event.target.value,
      id: updatedCategory.id,
    });
  };

  return (
    <div className="category-list">
      <Text fontSize={["sm", "md"]} className="category-list-section-label">
        Catégories:
      </Text>
      { renderCategories() }
      <Modal isOpen={isOpenUpdateCategoryModal} onClose={onCloseUpdateCategoryModal}>
        <ModalOverlay>
          <ModalContent>
            <ModalHeader fontSize={["md", "lg"]}>Mise à jour d'une catégorie</ModalHeader>
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
                  fontSize={["sm", "md"]}
                  colorScheme="blue"
                  isDisabled={!isValidUpdatedCategory}
                  onClick={() => updateCategoryFromModal()}>
                  Mettre à jour
                </Button>
                <Button
                  fontSize={["sm", "md"]}
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

export default CategoryList;
import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { locationsSelector } from '../../../store/locations/locationsSelector';
import { categoriesSelector } from '../../../store/categories/categoriesSelector';
import { deleteProduct, updateProduct } from '../../../store/products/productsActions';
import moment from "moment";

import { 
  Badge, 
  Button, 
  ButtonGroup, 
  Menu, 
  MenuButton, 
  MenuItem,
  MenuList,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  IconButton,
  Text,
  useDisclosure,
  useToast
} from "@chakra-ui/core";
import { BellIcon, ChevronDownIcon } from '@chakra-ui/icons';

import "./productItem.scss";
import { useState } from 'react';
import ProductForm from '../../productForm/ProductForm';

const ProductItem = ({product}) => {
  const dispatch = useDispatch(); 
  
  const { 
    isOpen: isOpenDeleteProductModal, 
    onOpen: onOpenDeleteProductModal, 
    onClose: onCloseDeleteProductModal 
  } = useDisclosure();

  const deleteSelectedProduct = useCallback((product) => {
    dispatch(deleteProduct(product));
  }, [dispatch]);

  const currentProductId = product?.id;
  
  const toast = useToast();

  const confirmDeleteProduct = () => {
    const productName = product.productName;
    deleteSelectedProduct({productId: currentProductId});
    onCloseDeleteProductModal();
    toast({
      title: "Produit supprimé",
      description: `${productName} a bien été supprimé`,
      status: "success",
      duration: 5000,
      isClosable: true,
    })
  };

  const locations = useSelector(locationsSelector);
  const currentLocation = locations.find(location => location.locationKey === product.locationKey);
  // TODO: 2 render by default ??

  const momentExpirationDate = moment(product.expirationDate, "DDMMYYYY");
  const isValidExpirationDate = momentExpirationDate.isValid();

  const currentDate = moment();
  const daysRemaining = momentExpirationDate.diff(currentDate, 'days');

  const renderProductExpirationDateState = () => {
    let status = '';
    let classes = '';
    
    if(!isValidExpirationDate) {
      status = `Pas de date d'expiration`;
      classes = 'no-expiration-date-alert';
    } else if(daysRemaining < 0) {
      status = `Date dépassée depuis ${daysRemaining * -1} jours !`;
      classes = 'expiration-date-alert';
    } else if(daysRemaining === 0) {
      status = "Date limite aujourd'hui !"
      classes = 'expiration-date-alert';
    } else if(daysRemaining === 1) {
      status = `Date limite demain`;
      classes = 'expiration-date-warning';
    } else if(daysRemaining <= 3) {
      status = `Date proche, plus que ${daysRemaining} jours!`;
      classes = 'expiration-date-warning';
    } else {
      status = `Reste ${daysRemaining} jours`;
    }

    return (
      <div className={`expiration-date-status ${classes} truncated`} title={status}>
        <Text 
          fontSize={["xs", "sm"]}
          className="expiration-date-text">
          { status }
        </Text>
        <Text 
          fontSize={["xs", "sm"]}
          className="expiration-date-icon">
          { <BellIcon/> }
        </Text>
      </div>)
  };

  const categories = useSelector(categoriesSelector);
  const currentCategory = categories.find(category => category.categoryKey === product.categoryKey);
  const renderProductCategory = () => {
    return currentCategory?.label ? (
      <div className="product-category">
        <Badge 
          size="md"
          variant="solid"
          colorScheme={getColorScheme(currentCategory.categoryKey, 4)}>
          {currentCategory?.label}
        </Badge>
      </div>
    ) : '';
  };

  const COLORS = ['blue', 'purple', 'red', 'green', 'orange', 'teal', 'gray', 'cyan', 'pink'];
  const getColorScheme = (key, shift = 0) => {
    return COLORS[0];
    // TODO: WIP rfactor methods id
    // const colorIndex = (key + shift) % 9;
    // return COLORS[colorIndex];
  };

  const { 
    isOpen: isOpenUpdateProductModal, 
    onOpen: onOpenUpdateProductModal, 
    onClose: onCloseUpdateProductModal 
  } = useDisclosure();
  const [updateProductLabel, setUpdateProductLabel] = useState(product?.productName);
  const handleInputProductLabelChange = (event) => {
    setUpdateProductLabel(event.target.value);
  };

  const [updateProductQuantity, setUpdateProductQuantity] = useState(product?.quantity);
  const handleInputProductQuantityChange = (event) => {
    setUpdateProductQuantity(event.target.value);
  };

  const defaultDate = moment(product?.expirationDate, "DD/MM/YYYY")?.isValid() ? 
    moment(product?.expirationDate, "DD/MM/YYYY")?.toDate() : "";
  const [updateProductExpirationDate, setUpdateProductExpirationDate] = useState(defaultDate);

  const [updateProductLocation, setUpdateProductLocation] = useState(product?.locationKey);
  const handleInputProductLocationChange = (event) => {
    const parsedValue = event.target.value || "";
    setUpdateProductLocation(parsedValue);
  };

  const [updateProductCategory, setUpdateProductCategory] = useState(product?.categoryKey);
  const handleInputProductCategoryChange = (event) => {
    const parsedValue = event.target.value || "";
    setUpdateProductCategory(parsedValue);
  };

  // TODO: refactor event key Enter in app 
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      validateAndUpdateProduct();
      event.preventDefault();
    }
  };

  const isValidUpdateProduct =
  updateProductLabel?.trim()?.length > 0 && updateProductQuantity?.trim()?.length > 0;

  const updateExistingProduct = useCallback((product) => {
    dispatch(updateProduct(product));
  }, [dispatch]);

  const validateAndUpdateProduct = () => {
    if (isValidUpdateProduct) {
      const product = {
        productId: currentProductId,
        name: updateProductLabel.trim(),
        locationKey: updateProductLocation,
        categoryKey: updateProductCategory,
        quantity: updateProductQuantity.trim(),
        expirationDate: updateProductExpirationDate,
        creationDate: moment().format('L')
      };

      product.name = product.name.charAt(0).toUpperCase() + product.name.slice(1);
      updateExistingProduct(product);
      toast({
        title: "Produit mis à jour",
        description: `${product.name} a bien été mis à jour`,
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      onCloseUpdateProductModal();
    }
  }
  return (
    <div className="product-item">
      <div className="product-name-quantity truncated" title={`${product.productName} (${product.quantity})`}>
        <Text 
          fontSize={["xs", "sm"]}
          className="truncated">
          {product.productName} ({product.quantity})
        </Text>
      </div>
      {renderProductExpirationDateState()}
      {renderProductCategory()}
      <div className="product-location">
        <Badge 
          size="md"
          variant="outline"
          colorScheme={getColorScheme(currentLocation?.locationKey)}>
          {currentLocation?.label}
        </Badge>
      </div>
      <div className="product-item-actions">
        <Menu>
          <MenuButton 
            size="xs" 
            as={IconButton}
            transition="all 0.2s"
            rounded="md"
            borderWidth="2px"
            icon={<ChevronDownIcon/>}
            _hover={{ bg: "gray.100" }}
            _expanded={{ bg: "teal.100" }}
            _focus={{ outline: 0, boxShadow: "outline" }}>
          </MenuButton>
          <MenuList>
            <MenuItem
              fontSize={["sm", "md"]}
              size="sm"
              variant="ghost"
              onClick={onOpenUpdateProductModal}>
              Modifier
            </MenuItem>
            <MenuItem 
              fontSize={["sm", "md"]}
              size="sm"
              variant="ghost"
              onClick={onOpenDeleteProductModal}>
              Supprimer
            </MenuItem>
          </MenuList>
        </Menu>
        <Modal isOpen={isOpenUpdateProductModal} onClose={onCloseUpdateProductModal}>
          <ModalOverlay>
            <ModalContent>
              <ModalHeader fontSize={["md", "lg"]}>
                Modifier un produit
              </ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <ProductForm
                  productLabel={updateProductLabel}
                  productQuantity={updateProductQuantity}
                  productExpirationDate={updateProductExpirationDate}
                  productLocation={updateProductLocation} 
                  productCategory={updateProductCategory}
                  handleInputProductLabelChange={(event) => handleInputProductLabelChange(event)} 
                  handleInputProductQuantityChange={(event) => handleInputProductQuantityChange(event)}
                  handleInputProductLocationChange={(event) => handleInputProductLocationChange(event)}
                  handleInputProductCategoryChange={(event) => handleInputProductCategoryChange(event)}
                  handleKeyDown={(event) => handleKeyDown(event)}
                  setProductExpirationDate={(event) => setUpdateProductExpirationDate(event)}>
                </ProductForm>
              </ModalBody>
              <ModalFooter>
                <ButtonGroup spacing="6">
                  <Button 
                    fontSize={["sm", "md"]} 
                    size="sm"
                    colorScheme="blue" 
                    isDisabled={!isValidUpdateProduct} 
                    onClick={validateAndUpdateProduct}>
                    Modifier le produit
                  </Button>
                  <Button 
                    fontSize={["sm", "md"]} 
                    size="sm"
                    variant="ghost" 
                    onClick={onCloseUpdateProductModal}>
                    Fermer
                  </Button>
                </ButtonGroup>
              </ModalFooter>
            </ModalContent>
          </ModalOverlay>
        </Modal>
        <Modal isOpen={isOpenDeleteProductModal} onClose={onCloseDeleteProductModal}>
          <ModalOverlay>
            <ModalContent>
              <ModalHeader fontSize={["md", "lg"]}>
                Suppression d'un produit
              </ModalHeader>
              <ModalCloseButton />
              <ModalBody fontSize={["sm", "md"]}>
                Êtes-vous sur de vouloir supprimer "{product.productName}" ({product.quantity}) ?
              </ModalBody>
              <ModalFooter>
                <ButtonGroup spacing="6">
                  <Button 
                    fontSize={["sm", "md"]} 
                    size="sm"
                    colorScheme="red" 
                    onClick={confirmDeleteProduct}>
                    Supprimer
                  </Button>
                  <Button 
                    fontSize={["sm", "md"]} 
                    size="sm"
                    variant="ghost" 
                    onClick={onCloseDeleteProductModal}>
                    Annuler
                  </Button>
                </ButtonGroup>
              </ModalFooter>
            </ModalContent>
          </ModalOverlay>
        </Modal>
      </div>
    </div>
  );
};

export default ProductItem;
import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { locationsSelector } from '../../../store/locations/locationsSelector';
import { categoriesSelector } from '../../../store/categories/categoriesSelector';
import { deleteProduct } from '../../../store/products/productsActions';
import moment from "moment";

import { 
  Badge, 
  Button, 
  ButtonGroup, 
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useToast } from "@chakra-ui/core";
import { DeleteIcon, EditIcon } from '@chakra-ui/icons';

import "./productItem.scss";

const ProductItem = ({product}) => {
  const [isOpen, setIsOpen] = React.useState();
  const onClose = () => setIsOpen(false);
  const cancelRef = React.useRef();

  const dispatch = useDispatch(); 
  const deleteSelectedProduct = useCallback((product) => {
    dispatch(deleteProduct(product));
  }, []);

  const confirmDeleteProduct = () => {
    const productName = product.productName;
    deleteSelectedProduct({productId: product.id});
    onClose();
    toast({
      title: "Produit supprimé",
      description: `${productName} a bien été supprimé`,
      status: "success",
      duration: 5000,
      isClosable: true,
    })
  }

  const toast = useToast();

  const COLORS = ['blue', 'purple', 'red', 'green', 'orange', 'teal', 'gray', 'cyan', 'pink'];
  const locations = useSelector(locationsSelector);
  const currentLocation = locations.find(location => location.id === product.locationId);
  
  // TODO: 2 render by default ??

  const momentExpirationDate = moment(product.expirationDate, "DDMMYYYY");
  const isValidExpirationDate = momentExpirationDate.isValid();

  const currentDate = moment();
  const daysRemaining = momentExpirationDate.diff(currentDate, 'days') + 1;

  const renderProductExpirationDateState = () => {
    let status = '';
    let classes = '';

    if(!isValidExpirationDate) {
      status = `Pas de date d'expiration`;
      classes = 'no-expiration-date-alert';
    } else if(daysRemaining < 0) {
      status = `Date dépassée depuis ${daysRemaining * -1} jours!`;
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
        { status }
      </div>)
  };

  const categories = useSelector(categoriesSelector);
  const currentCategory = categories.find(category => category.id === product.categoryId);
  const renderProductCategory = () => {
    return currentCategory?.label ? (
      <div className="product-category">
        <Badge size="md" variant="solid" colorScheme={getColorSchemeById(currentCategory.id, 4)}>{currentCategory?.label}</Badge>
      </div>
    ) : '';
  };

  const getColorSchemeById = (id, shift = 0) => {
    const colorIndex = (id + shift) % 9;
    return COLORS[colorIndex];
  };

  return (
    <div className="product-item">
      <div className="product-name truncated" title={product.productName}>
        {product.productName}
      </div>
      <div className="product-location">
        <Badge size="md" variant="outline" colorScheme={getColorSchemeById(currentLocation.id)}>{currentLocation?.label}</Badge>
      </div>
      <div className="product-quantity">
        Quantité: {product.quantity}
      </div>
      {renderProductExpirationDateState()}
      {renderProductCategory()}
      <div className="product-item-actions">
      <ButtonGroup spacing="2">
          <Button 
            leftIcon={<EditIcon />}
            size="xs" 
            colorScheme="blue"
            onClick={() => 
              toast({
                title: "Non implémenté.",
                description: "Fonctionnalité non implémentée. Work In Progress ...", 
                status: "warning",
                duration: 3000,
                isClosable: true,
              })
            }>
            Modifier
          </Button>
          <Button 
            leftIcon={<DeleteIcon />}
            size="xs" 
            colorScheme="red"
            onClick={() => setIsOpen(true)
            }>
            Supprimer
          </Button>
          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay>
              <ModalContent>
                <ModalHeader>Suppression d'un produit</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  Êtes-vous sur de vouloir supprimer "{product.productName}" ({product.quantity}) ?
                </ModalBody>
                <ModalFooter>
                  <ButtonGroup spacing="6">
                    <Button colorScheme="red" onClick={() => confirmDeleteProduct()}>
                      Supprimer
                    </Button>
                    <Button variant="ghost" onClick={onClose}>Annuler</Button>
                  </ButtonGroup>
                </ModalFooter>
              </ModalContent>
            </ModalOverlay>
          </Modal>
        </ButtonGroup>
      </div>
    </div>
  );
};

export default ProductItem;
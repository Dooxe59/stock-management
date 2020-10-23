import React, { 
  useCallback, 
  useState 
} from 'react';
import { useDispatch } from 'react-redux';
import moment from "moment";
import { addProduct } from '../../store/products/productsActions';
import ProductForm from '../productForm/ProductForm';

import {
  Button, 
  ButtonGroup, 
  IconButton,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  useToast,
} from "@chakra-ui/core";
import { AddIcon } from '@chakra-ui/icons';

import "react-datepicker/dist/react-datepicker.css";
import "./addProductForm.scss";

const AddProductForm = () => {
  const { isOpen: isOpenDeleteProductModal, onOpen: onOpenDeleteProductModal, onClose: onCloseDeleteProductModal } = useDisclosure();

  const dispatch = useDispatch();
  const addNewProduct = useCallback((product) => {
    dispatch(addProduct(product));
  }, [dispatch]);

  const [productLabel, setProductLabel] = useState("");
  const handleInputProductLabelChange = (event) => {
    setProductLabel(event.target.value);
  };

  const [productQuantity, setProductQuantity] = useState("");
  const handleInputProductQuantityChange = (event) => {
    setProductQuantity(event.target.value);
  };

  const [productExpirationDate, setProductExpirationDate] = useState("");

  // TODO: refacto app parseInt
  const [productLocation, setProductLocation] = useState(1);
  const handleInputProductLocationChange = (event) => {
    const parsedValue = parseInt(event.target.value) || "";
    setProductLocation(parsedValue);
  };

  const [productCategory, setProductCategory] = useState("");
  const handleInputProductCategoryChange = (event) => {
    const parsedValue = parseInt(event.target.value) || "";
    setProductCategory(parsedValue);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      validateAndAddProduct();
      event.preventDefault();
    }
  };

  const isValidProduct =
    productLabel?.trim()?.length > 0 && productQuantity?.trim()?.length > 0;

  // const productLabelInputRef = useRef(null);
  // const setFocusOnFirstInput = () => {
  //   productLabelInputRef.current.focus();
  // };

  const toast = useToast();
  const validateAndAddProduct = () => {
    if (isValidProduct) {
      const product = {
        name: productLabel.trim(),
        locationId: productLocation,
        categoryId: productCategory,
        quantity: productQuantity.trim(),
        expirationDate: productExpirationDate,
        creationDate: moment().format('L')
      };

      product.name = product.name.charAt(0).toUpperCase() + product.name.slice(1);
      addNewProduct(product);
      toast({
        title: "Produit ajouté",
        description: `${product.name} a bien été ajouté`,
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      clearProductForm();
      // setFocusOnFirstInput();
    }
  }

  const clearProductForm = () => {
    setProductLabel("");
    setProductQuantity("");
    setProductExpirationDate("");
  };

  const closeDeleteProductModal = () => {
    onCloseDeleteProductModal();
    clearProductForm();
  };

  return (
    <div className="add-product-form">
      <IconButton 
        title="Ajouter un nouveau produit"
        icon={<AddIcon />} 
        size="xs" 
        colorScheme="teal"
        onClick={() => onOpenDeleteProductModal()}/>
      <Modal isOpen={isOpenDeleteProductModal} onClose={closeDeleteProductModal}>
        <ModalOverlay>
          <ModalContent>
            <ModalHeader fontSize={["md", "lg"]}>
              Ajouter un nouveau produit
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <ProductForm
                productLabel={productLabel}
                productQuantity={productQuantity}
                productExpirationDate={productExpirationDate}
                productLocation={productLocation} 
                productCategory={productCategory}
                handleInputProductLabelChange={(event) => handleInputProductLabelChange(event)} 
                handleInputProductQuantityChange={(event) => handleInputProductQuantityChange(event)}
                handleInputProductLocationChange={(event) => handleInputProductLocationChange(event)}
                handleInputProductCategoryChange={(event) => handleInputProductCategoryChange(event)}
                handleKeyDown={(event) => handleKeyDown(event)}
                setProductExpirationDate={(event) => setProductExpirationDate(event)}>
              </ProductForm>
            </ModalBody>
            <ModalFooter>
              <ButtonGroup spacing="6">
                <Button 
                  fontSize={["sm", "md"]} 
                  size="sm"
                  colorScheme="blue" 
                  isDisabled={!isValidProduct} 
                  onClick={() => validateAndAddProduct()}>
                  Ajouter le produit
                </Button>
                <Button 
                  fontSize={["sm", "md"]} 
                  size="sm"
                  variant="ghost" 
                  onClick={closeDeleteProductModal}>
                  Fermer
                </Button>
              </ButtonGroup>
            </ModalFooter>
          </ModalContent>
        </ModalOverlay>
      </Modal>
    </div>
  );
};

export default AddProductForm;
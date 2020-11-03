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
import ProductService from "../../services/product";

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

  // TODO: Selected key en dur :(
  const defaultSelectedLocation = "-MKl-UouPPAvf62J4F81";
  const [productLocation, setProductLocation] = useState(defaultSelectedLocation);
  const handleInputProductLocationChange = (event) => {
    setProductLocation(event.target.value || "");
  };

  const [productCategory, setProductCategory] = useState("");
  const handleInputProductCategoryChange = (event) => {
    const parsedValue = event.target.value || "";
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

  const addProductFormToast = useToast();
  const validateAndAddProduct = () => {
    if (isValidProduct) {
      const expirationDate = moment(productExpirationDate, "DD/MM/YYYY")?.isValid() ? 
        moment(productExpirationDate, "DD/MM/YYYY")?.format('L') : "";
      const product = {
        productName: productLabel.trim(),
        locationKey: productLocation,
        categoryKey: productCategory,
        quantity: productQuantity.trim(),
        expirationDate,
      };
      product.productName = product.productName.charAt(0).toUpperCase() + product.productName.slice(1);

      ProductService.create(product)
        .then((response) => {
          addNewProduct({...product, productKey: response.key});
          addProductFormToast({
            title: "Produit ajouté",
            description: `${product.productName} a bien été ajouté.`,
            status: "success",
            duration: 5000,
            isClosable: true,
          });
          clearProductForm();
        })
        .catch((e) => {
          // TODO: manage loading
          addProductFormToast({
            title: "Echec de l'ajout du produit",
            description: `${product.productName} n'a pas été ajouté. Veuillez réessayer.`,
            status: "error",
            duration: 5000,
            isClosable: true,
          });
          console.log(e);
        });
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
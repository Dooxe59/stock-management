import React, { 
  useCallback, 
  useRef, 
  useState 
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from "moment";
import { categoriesSelector } from '../../store/categories/categoriesSelector';
import { locationsSelector } from '../../store/locations/locationsSelector';
import { addProduct } from '../../store/products/productsActions';
import {
  Button, 
  ButtonGroup, 
  FormLabel, 
  IconButton,
  Input,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Select,
  useDisclosure,
  useToast,
} from "@chakra-ui/core";
import DatePicker from "react-datepicker";
import { AddIcon } from '@chakra-ui/icons';

import "react-datepicker/dist/react-datepicker.css";
import "./addProductForm.scss";

const AddProductForm = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

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

  const [productLocation, setProductLocation] = useState(1);
  const handleInputProductLocationChange = (event) => {
    setProductLocation(parseInt(event.target.value));
  };
  const locations = useSelector(locationsSelector);
  const renderSelectLocationOptions = () => {
    return locations.map(location => {
      return <option value={location.id} key={location.id}>{location.label}</option>
    });
  };

  const [productCategory, setProductCategory] = useState("");
  const handleInputProductCategoryChange = (event) => {
    setProductCategory(parseInt(event.target.value));
  };
  const categories = useSelector(categoriesSelector);
  const renderSelectCategoryOptions = () => {
    return categories.map(category => {
      return <option value={category.id} key={category.id}>{category.label}</option>
    });
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      validateAndAddProduct();
      event.preventDefault();
    }
  };

  const isValidProduct =
    productLabel?.trim()?.length > 0
    && productQuantity?.trim()?.length > 0;

  const productLabelInputRef = useRef(null);
  const setFocusOnFirstInput = () => {
    productLabelInputRef.current.focus();
  };

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
      })
      clearProductForm();
      setFocusOnFirstInput();
    }
  }

  const clearProductForm = () => {
    setProductLabel("");
    setProductQuantity("");
    setProductExpirationDate("");
  };

  return (
    <div className="add-product-form">
      <IconButton 
        title="Ajouter un nouveau produit"
        icon={<AddIcon />} 
        size="xs" 
        colorScheme="teal"
        onClick={() => onOpen()}/>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay>
          <ModalContent>
            <ModalHeader fontSize={["md", "lg"]}>
              Ajouter un nouveau produit
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <div className="product-label">
                <FormLabel fontSize={["sm", "md"]} htmlFor="productName">
                  Nom du produit
                </FormLabel>
                <Input 
                  id="productName"
                  autoFocus
                  variant="filled"
                  size="sm" 
                  autoComplete="off"
                  placeholder="Nom du produit" 
                  value={productLabel}
                  ref={productLabelInputRef}
                  onChange={handleInputProductLabelChange}
                  onKeyDown={handleKeyDown}/>
              </div>
              <div className="product-quantity">
                <FormLabel fontSize={["sm", "md"]} htmlFor="productQuantity">
                  Quantité
                </FormLabel>
                <Input 
                  id="productQuantity"
                  variant="filled"
                  size="sm" 
                  autoComplete="off"
                  placeholder="Quantité" 
                  value={productQuantity}
                  onChange={handleInputProductQuantityChange}
                  onKeyDown={handleKeyDown}/>
              </div>
              <div className="product-expiration-date">
                <FormLabel fontSize={["sm", "md"]} htmlFor="productExpirationDate">
                  Date de péremption (JJ/MM/AAAA)
                </FormLabel>
                <Input 
                  as={DatePicker}
                  id="productExpirationDate"
                  variant="filled"
                  size="sm" 
                  locale="fr"
                  autoComplete="off"
                  dateFormat="dd/MM/yyyy"
                  placeholderText="Date d'expiration"
                  selected={productExpirationDate}
                  onChange={date => setProductExpirationDate(date)}
                  onKeyDown={handleKeyDown}/>
              </div>
              <div className="product-location">
                <FormLabel fontSize={["sm", "md"]} htmlFor="productExpirationDate">
                  Emplacement
                </FormLabel>
                <Select value={productLocation} onChange={handleInputProductLocationChange}>
                  {renderSelectLocationOptions()}
                </Select>
                <div className="product-category">
                  <FormLabel fontSize={["sm", "md"]} htmlFor="productExpirationDate">
                    Catégorie
                  </FormLabel>
                  <Select value={productCategory} onChange={handleInputProductCategoryChange}>
                    <option value=""></option>
                    {renderSelectCategoryOptions()}
                  </Select>
                </div>
              </div>
            </ModalBody>
            <ModalFooter>
              <ButtonGroup spacing="6">
                <Button 
                  fontSize={["sm", "md"]} 
                  colorScheme="blue" 
                  isDisabled={!isValidProduct} 
                  onClick={() => validateAndAddProduct()}>
                  Ajouter le produit
                </Button>
                <Button 
                  fontSize={["sm", "md"]} 
                  variant="ghost" 
                  onClick={onClose}>
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
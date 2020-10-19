import React, { 
  useCallback, 
  useRef, 
  useState 
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { categoriesSelector } from '../../store/categories/categoriesSelector';
import { locationsSelector } from '../../store/locations/locationsSelector';
import { addProduct } from '../../store/products/productsActions';
import {
  Button, 
  ButtonGroup, 
  FormLabel, 
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
} from "@chakra-ui/core";
import { AddIcon } from '@chakra-ui/icons';

const AddProductForm = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const dispatch = useDispatch();
  const addNewProduct = useCallback((product) => {
    dispatch(addProduct(product));
  }, []);

  const [productLabel, setProductLabel] = useState("");
  const handleInputProductLabelChange = (event) => {
    setProductLabel(event.target.value);
  };

  const [productQuantity, setProductQuantity] = useState("");
  const handleInputProductQuantityChange = (event) => {
    setProductQuantity(event.target.value);
  };

  const [productExpirationDate, setProductExpirationDate] = useState("");
  const handleInputProductExpirationDateChange = (event) => {
    setProductExpirationDate(event.target.value);
  };

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

  const validateAndAddProduct = () => {
    if (isValidProduct) {
      const product = {
        name: productLabel.trim(),
        locationId: productLocation,
        categoryId: productCategory,
        quantity: productQuantity.trim(),
        expirationDate: productExpirationDate.trim(),
      };

      product.name = product.name.charAt(0).toUpperCase() + product.name.slice(1);
      addNewProduct(product);
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
      <Button 
        leftIcon={<AddIcon />}
        size="sm" 
        colorScheme="blue"
        onClick={() => onOpen()}>
        Ajouter un nouveau produit
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay>
          <ModalContent>
            <ModalHeader>Ajouter un nouveau produit</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <div className="product-label">
                <FormLabel htmlFor="productName">Nom du produit</FormLabel>
                <Input 
                  id="productName"
                  autoFocus
                  variant="filled"
                  size="sm" 
                  placeholder="Nom du produit" 
                  value={productLabel}
                  ref={productLabelInputRef}
                  onChange={handleInputProductLabelChange}
                  onKeyDown={handleKeyDown}/>
              </div>
              <div className="product-quantity">
                <FormLabel htmlFor="productQuantity">Quantité</FormLabel>
                <Input 
                  id="productQuantity"
                  variant="filled"
                  size="sm" 
                  placeholder="Quantité" 
                  value={productQuantity}
                  onChange={handleInputProductQuantityChange}
                  onKeyDown={handleKeyDown}/>
              </div>
              <div className="product-expiration-date">
                <FormLabel htmlFor="productExpirationDate">Date de péremption (JJ/MM/AAAA)</FormLabel>
                <Input 
                  id="productExpirationDate"
                  variant="filled"
                  size="sm" 
                  placeholder="Quantité" 
                  value={productExpirationDate}
                  onChange={handleInputProductExpirationDateChange}
                  onKeyDown={handleKeyDown}/>
              </div>
              <div className="product-location">
                <FormLabel htmlFor="productExpirationDate">Emplacement</FormLabel>
                <Select value={productLocation} onChange={handleInputProductLocationChange}>
                  {renderSelectLocationOptions()}
                </Select>
                <div className="product-category">
                  <FormLabel htmlFor="productExpirationDate">Catégorie</FormLabel>
                  <Select value={productCategory} onChange={handleInputProductCategoryChange}>
                    <option value=""></option>
                    {renderSelectCategoryOptions()}
                  </Select>
                </div>
              </div>
            </ModalBody>
            <ModalFooter>
              <ButtonGroup spacing="6">
                <Button colorScheme="blue" isDisabled={!isValidProduct} onClick={() => validateAndAddProduct()}>
                  Ajouter le produit
                </Button>
                <Button variant="ghost" onClick={onClose}>Fermer</Button>
              </ButtonGroup>
            </ModalFooter>
          </ModalContent>
        </ModalOverlay>
      </Modal>
    </div>
  );
};

export default AddProductForm;
import React, { 
  useCallback,
  useContext,
  useState 
} from 'react';
import { useDispatch } from 'react-redux';

import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';

import { addCategory } from 'store/categories/categoriesActions';
import CategoryService from 'services/category';
import { ToastContext } from 'providers/ToastProvider';
import { State } from 'utils/enums';

import './addCategoryForm.scss';

const AddCategoryForm = () => {
  const dispatch = useDispatch();
  const addNewCategory = useCallback((category) => {
    dispatch(addCategory(category));
  }, [dispatch]);

  const [newCategoryLabel, setNewCategoryLabel] = useState('');
  const [addCategoryState, setAddCategoryState] = useState('');

  const isValidNewCategoryLabel = newCategoryLabel?.trim()?.length > 0;
  const isLoadingAddCategoryState = addCategoryState === "LOADING";
  const isDisabledAddNewCategoryButton = !isValidNewCategoryLabel || isLoadingAddCategoryState;
  const {toast} = useContext(ToastContext);

  const handleInputTextChange = (event) => {
    setNewCategoryLabel(event.target.value);
  };

  const clearInputText = () => {
    setNewCategoryLabel('');
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      validateAndAddNewCategory();
      event.preventDefault();
    }
  };

  const validateAndAddNewCategory = () => {
    if (isValidNewCategoryLabel) {
      let categoryLabel = newCategoryLabel.trim();
      categoryLabel = categoryLabel.charAt(0).toUpperCase() + categoryLabel.slice(1);

      let data = {
        label: categoryLabel,
      };

      setAddCategoryState(State.LOADING);
      CategoryService.create(data)
        .then((response) => {
          addNewCategory({categoryLabel: categoryLabel, categoryKey: response.key});
          toast({
            title: 'Catégorie ajouté',
            description: `${categoryLabel} a bien été ajouté.`,
            status: 'success',
            duration: 5000,
            isClosable: true,
          });
          clearInputText();
          setAddCategoryState(State.SUCCESS);
        })
        .catch((e) => {
          setAddCategoryState(State.ERROR);
          toast({
            title: 'Echec de l\'ajout de la catégorie',
            description: `${categoryLabel} n'a pas été ajouté. Veuillez réessayer.`,
            status: 'error',
            duration: 5000,
            isClosable: true,
          });
          console.error(e);
        });
    }
  };

  return (
    <div className="add-category-form">
      <div className="p-float-label p-input-icon-right category-form">
        { isLoadingAddCategoryState && <i className="pi pi-spin pi-spinner" /> }
        <InputText 
          id="newCategoryInput" 
          value={newCategoryLabel} 
          onChange={handleInputTextChange}
          placeholder="Ajouter une catégorie" 
          className="p-inputtext-sm category-input-text"
          onKeyDown={handleKeyDown}
        />
      </div>
      <Button 
        label="Ajouter" 
        className="p-button-sm p-button-outlined add-category-button" 
        disabled={isDisabledAddNewCategoryButton}
        onClick={() => validateAndAddNewCategory()}/>
    </div>
  );
};

export default AddCategoryForm;
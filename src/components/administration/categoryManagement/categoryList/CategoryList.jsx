import React, { 
  useCallback,
  useContext, 
  useRef, 
  useState 
} from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { Button } from 'primereact/button';
import { Chip } from 'primereact/chip';
import { Menu } from 'primereact/menu';
import { InputText } from 'primereact/inputtext';
import { Sidebar } from 'primereact/sidebar';
import CategoryService from 'services/category';
import { ToastContext } from 'providers/ToastProvider';
import { updateCategory } from 'store/categories/categoriesActions';
import Uid from 'utils/uid';

import './categoryList.scss';

const CategoryList = ({categories}) => {
  const cm = useRef(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showUpdateCategorySidebar, setShowUpdateCategorySidebar] = useState(false);
  const [updateCategoryState, setUpdateCategoryState] = useState("");
  const dispatch = useDispatch();
  
  const updateCategoryStore = useCallback((category) => {
    dispatch(updateCategory(category));
  }, [dispatch]);
  
  const items = [
    {
       label: 'Modifier',
       icon: 'pi pi-fw pi-pencil',
       command:()=>{ setShowUpdateCategorySidebar(true) }
    }, 
    {
      label: 'Supprimer',
      icon: 'pi pi-fw pi-trash',
      command:()=>{ console.log('delete ', selectedCategory) }

    }
  ];

  const openContextualMenu = (e, category) => {
    cm.current.show(e);
    setSelectedCategory(category);
  };

  const {toast} = useContext(ToastContext);

  const updateExistingCategory = () => {
    if(!isValidCategory) return;
    const data = {
      label: selectedCategory.label,
    };
    setUpdateCategoryState("LOADING");
    CategoryService.update(selectedCategory.categoryKey, data)
      .then(() => {
        updateCategoryStore(selectedCategory);
        setShowUpdateCategorySidebar(false)
        toast({
          title: 'Catégorie mise à jour',
          description: `${selectedCategory.label} a bien été mise à jour.`,
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
        setUpdateCategoryState("SUCCESS");
      })
      .catch((e) => {
        toast({
          title: 'Echec de la mise à jour de la catégorie',
          description: `${selectedCategory.label} n'a pas été mis à jour. Veuillez réessayer.`,
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
        console.log(e);
        setUpdateCategoryState("ERROR");
      });
  };

  const renderCategoryItem = (category) => {
    return (
      <>
        <span aria-haspopup>{category.label}</span>
        <Button 
          icon="pi pi-bars" 
          className="p-button-rounded p-button-text" 
          onClick={(event) => openContextualMenu(event, category)} 
          aria-controls="popup_menu" 
          aria-haspopup />
      </>
      );
  };

  const renderCategories = () => {
    return categories.map((category) => {
      return (
        <div className="category-item-container" key={Uid.generate()}>
          <Menu model={items} popup ref={cm} id="popup_menu" />
          <Chip template={renderCategoryItem(category)} className="p-mr-2 p-mb-2 default-tag"/>
        </div>);
    });
  };

  const handleInputTextChange = (event) => {
    setSelectedCategory({
      label: event.target.value,
      categoryKey: selectedCategory.categoryKey,
    });
  };

  const isValidCategory = selectedCategory?.label?.trim().length > 0;
  const isLoadingUpdateCategoryState = updateCategoryState === "LOADING";
  const updateCategoryButtonLabel = isLoadingUpdateCategoryState ? "" : "Modifier"

  return (
    <div className="category-list">
      { renderCategories() }
      <Sidebar 
        visible={showUpdateCategorySidebar} 
        position="bottom" 
        onHide={() => setShowUpdateCategorySidebar(false)}>
        <span className="p-float-label">
          <InputText 
            id="updateCategoryInput" 
            value={selectedCategory?.label} 
            onChange={(e) => handleInputTextChange(e)} /> 
          <label htmlFor="updateCategoryInput">Nom de la catégorie</label>
        </span>
        <div className="p-buttonset update-button">
          <Button 
            label={updateCategoryButtonLabel} 
            icon="pi pi-check" 
            disabled={!isValidCategory}
            loading={isLoadingUpdateCategoryState}
            onClick={() => updateExistingCategory()}/>
        </div>
      </Sidebar>
    </div>
  );
};

CategoryList.propTypes = {
  categories: PropTypes.array.isRequired,
};

export default CategoryList;
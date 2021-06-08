import React from 'react';
import { useSelector } from 'react-redux';

import AddCategoryForm from './addCategoryForm/AddCategoryForm';

import CategoryList from './categoryList/CategoryList';
import { categoriesSelector } from 'store/categories/categoriesSelector';

const CategoryManagement = () => {
  const categories = useSelector(categoriesSelector);

  return (
    <>
      <AddCategoryForm />
      <CategoryList categories={categories}></CategoryList>
    </>
  );
};

export default CategoryManagement;
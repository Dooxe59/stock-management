import { ADD_CATEGORY, UPDATE_CATEGORY } from "./categoriesReducer";

export const addCategory = (category) => ({
  type: ADD_CATEGORY,
  payload: {categoryLabel: category.categoryLabel}
});

export const updateCategory = (category) => ({
  type: UPDATE_CATEGORY,
  payload: {categoryId: category.id, newCategoryLabel: category.label}
});
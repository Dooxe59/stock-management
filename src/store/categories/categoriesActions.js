import { 
  ADD_CATEGORY, 
  INIT_CATEGORY,
  UPDATE_CATEGORY 
} from "./categoriesReducer";

export const initCategory = (categories) => ({
  type: INIT_CATEGORY,
  payload: {categories}
});

export const addCategory = (category) => ({
  type: ADD_CATEGORY,
  payload: {categoryLabel: category.categoryLabel, categoryKey: category.categoryKey}
});

export const updateCategory = (category) => ({
  type: UPDATE_CATEGORY,
  payload: {categoryKey: category.categoryKey, newCategoryLabel: category.label}
});

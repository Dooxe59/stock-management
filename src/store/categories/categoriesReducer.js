const initialState = [];

export const ADD_CATEGORY = 'ADD_CATEGORY';
export const DELETE_CATEGORY = 'DELETE_CATEGORY';
export const INIT_CATEGORY = 'INIT_CATEGORY';
export const UPDATE_CATEGORY = 'UPDATE_CATEGORY';

export const categoriesReducer = (state = initialState, action) => {
  switch(action.type) {
  case ADD_CATEGORY: {
    if (!action.payload.categoryLabel || !action.payload.categoryKey) return state;

    const newItem = {
      label: action.payload.categoryLabel,
      categoryKey: action.payload.categoryKey,
    };
    return [...state, newItem];
  }
  case DELETE_CATEGORY: {
    const categoryIndex = state.findIndex(item => item.categoryKey === action.payload.categoryKey);
    if (categoryIndex === -1) return state;

    const categoryListTemp = [...state];

    categoryListTemp.splice(categoryIndex, 1);
    return categoryListTemp;
  }
  case INIT_CATEGORY: {
    if(!action.payload.categories) return;
    return action.payload.categories;
  }
  case UPDATE_CATEGORY: {
    if (!action.payload.newCategoryLabel || !action.payload.categoryKey) return state;

    const categoryIndex = state.findIndex(item => item.categoryKey === action.payload.categoryKey);
    if (categoryIndex === -1) return state;

    const categoryListTemp = [...state];
    categoryListTemp[categoryIndex].label = action.payload.newCategoryLabel;
    return categoryListTemp;
  }
  default:
    return state;
  }
};
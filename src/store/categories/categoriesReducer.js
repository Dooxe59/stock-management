const initialState = [{
  label: "Viande",
  id: 1,
},{
  label: "Poisson",
  id: 2,
},{
  label: "Légume",
  id: 3,
},{
  label: "Fruits",
  id: 4,
},{
  label: "Yaourt",
  id: 5,
},{
  label: "Conserve",
  id: 6,
}];

export const ADD_CATEGORY = 'ADD_CATEGORY';
export const UPDATE_CATEGORY = 'UPDATE_CATEGORY';

export const categoriesReducer = (state = initialState, action) => {
  switch(action.type) {
    case ADD_CATEGORY: {
      if (!action.payload.categoryLabel) return state;

      const newItem = {
        label: action.payload.categoryLabel,
        id: state.length + 1,
      };
      return [...state, newItem];
    }
    case UPDATE_CATEGORY: {
      if (!action.payload.newCategoryLabel) return state;

      const categoryIndex = state.findIndex(item => item.id === action.payload.categoryId);
      if (categoryIndex === -1) return state;

      const categoryListTemp = [...state];
      categoryListTemp[categoryIndex].label = action.payload.newCategoryLabel;
      return categoryListTemp;
    }
    default:
      return state;
  }
};
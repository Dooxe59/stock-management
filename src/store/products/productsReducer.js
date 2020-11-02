const initialState = [];

export const ADD_PRODUCT = 'ADD_PRODUCT';
export const DELETE_PRODUCT = 'DELETE_PRODUCT';
export const INIT_PRODUCT = 'INIT_PRODUCT';
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT';

export const productsReducer = (state = initialState, action) => {
  switch(action.type) {
    case ADD_PRODUCT: {
      if (!action.payload.productName || !action.payload.locationKey) return state;

      const newProduct = {
        productName: action.payload.productName,
        locationKey: action.payload.locationKey,
        categoryKey: action.payload.categoryKey,
        quantity: action.payload.quantity,
        expirationDate: action.payload.expirationDate,
        creationDate: action.payload.creationDate,
        id: state.length + 1,
      };
      return [...state, newProduct];
    }
    case INIT_PRODUCT: {
      if (!action.payload.products) return;
      return action.payload.products;
    }
    case UPDATE_PRODUCT: {
      const productIndex = state.findIndex(item => item.id === action.payload.productId);
      if (productIndex === -1) return state;

      const productListTemp = [...state];
      productListTemp[productIndex] = action.payload;
      return productListTemp;
    }
    case DELETE_PRODUCT: {
      const productIndex = state.findIndex(item => item.id === action.payload.productId);
      if (productIndex === -1) return state;

      const productListTemp = [...state];

      productListTemp.splice(productIndex, 1);
      return productListTemp;
    }
    default:
      return state;
  }
};
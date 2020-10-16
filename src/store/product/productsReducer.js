const initialState = [{
  productName: "Tomates",
  locationId: 1, // Frigo
  quantity: "4",
  expirationDate: "24/10/2020",
  id: 1,
}];

export const ADD_PRODUCT = 'ADD_PRODUCT';

export const productsReducer = (state = initialState, action) => {
  switch(action.type) {
    case ADD_PRODUCT: {
      if (!action.payload.productName || !action.payload.locationId) return state;

      const newProduct = {
        productName: action.payload.productName,
        locationId: action.payload.locationId,
        quantity: action.payload.quantity,
        expirationDate: action.payload.expirationDate,
        id: state.length + 1,
      };
      return [...state, newProduct];
    }
    default:
      return state;
  }
};
const initialState = [{
  productName: "Tomates",
  locationId: 1, // Frigo
  quantity: "4",
  expirationDate: "24/10/2020",
  creationDate: "18/10/2020",
  id: 1,
}, {
  productName: "Steak poivre",
  locationId: 1, // Frigo
  categoryId: 1, // Viande
  quantity: "2",
  expirationDate: "20/10/2020",
  creationDate: "18/10/2020",
  id: 2
}];

export const ADD_PRODUCT = 'ADD_PRODUCT';

export const productsReducer = (state = initialState, action) => {
  switch(action.type) {
    case ADD_PRODUCT: {
      if (!action.payload.productName || !action.payload.locationId) return state;

      const newProduct = {
        productName: action.payload.productName,
        locationId: action.payload.locationId,
        categoryId: action.payload.categoryId,
        quantity: action.payload.quantity,
        expirationDate: action.payload.expirationDate,
        creationDate: action.payload.creationDate,
        id: state.length + 1,
      };
      return [...state, newProduct];
    }
    default:
      return state;
  }
};
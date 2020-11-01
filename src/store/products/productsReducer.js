const initialState = [{
  productName: "Tomates",
  locationKey: "-MKl-UouPPAvf62J4F81",
  categoryKey: "-MKzFgsT_XJEc0MrUMe2", 
  quantity: "2",
  expirationDate: "24/10/2020",
  creationDate: "18/10/2020",
  id: 1,
}, {
  productName: "Steak poivre",
  locationKey: "-MKl-UouPPAvf62J4F81",
  categoryKey: "-MKzFgsT_XJEc0MrUMe2", 
  quantity: "2",
  expirationDate: "2/12/2020",
  creationDate: "18/10/2020",
  id: 2
},{
  productName: "Steak haché 5%",
  locationKey: "-MKl-UouPPAvf62J4F81",
  categoryKey: "-MKzFgsT_XJEc0MrUMe2", 
  quantity: "1",
  expirationDate: "1/11/2020",
  creationDate: "18/10/2020",
  id: 3
}, {
  productName: "Couscous",
  locationKey: "-MKl-UouPPAvf62J4F81",
  categoryKey: "-MKzFgsT_XJEc0MrUMe2", 
  quantity: "2",
  expirationDate: "27/10/2020",
  creationDate: "18/10/2020",
  id: 4
}, {
  productName: "Fish and chips",
  locationKey: "-MKl-UouPPAvf62J4F81",
  categoryKey: "-MKzFgsT_XJEc0MrUMe2", 
  quantity: "2",
  expirationDate: "14/10/2020",
  creationDate: "18/10/2020",
  id: 5
},{
  productName: "Knaki",
  locationKey: "-MKl-UouPPAvf62J4F81",
  categoryKey: "-MKzFgsT_XJEc0MrUMe2", 
  quantity: "10",
  expirationDate: "14/09/2020",
  creationDate: "18/10/2020",
  id: 6
},];

export const ADD_PRODUCT = 'ADD_PRODUCT';
export const DELETE_PRODUCT = 'DELETE_PRODUCT';
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
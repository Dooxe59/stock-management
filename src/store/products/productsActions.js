import { ADD_PRODUCT, DELETE_PRODUCT, UPDATE_PRODUCT } from "./productsReducer";

// TODO: Améliorer payload ? 
export const addProduct = (product) => ({
  type: ADD_PRODUCT,
  payload: {
    productName: product.name,
    locationId: product.locationId,
    categoryId: product.categoryId,
    quantity: product.quantity,
    expirationDate: product.expirationDate,
    creationDate: product.creationDate,
  }
});

export const deleteProduct = (product) => ({
  type: DELETE_PRODUCT,
  payload: {productId: product.productId}
});

export const updateProduct = (product) => ({
  type: UPDATE_PRODUCT,
  payload: {
    productId: product.productId,
    productName: product.name,
    locationId: product.locationId,
    categoryId: product.categoryId,
    quantity: product.quantity,
    expirationDate: product.expirationDate,
  }
});

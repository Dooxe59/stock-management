import { ADD_PRODUCT, DELETE_PRODUCT, INIT_PRODUCT, UPDATE_PRODUCT } from "./productsReducer";

export const initProduct = (products) => ({
  type: INIT_PRODUCT,
  payload: {products}
});

export const addProduct = (product) => ({
  type: ADD_PRODUCT,
  payload: {
    productName: product.name,
    locationKey: product.locationKey,
    categoryKey: product.categoryKey,
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
    locationKey: product.locationKey,
    categoryKey: product.categoryKey,
    quantity: product.quantity,
    expirationDate: product.expirationDate,
  }
});

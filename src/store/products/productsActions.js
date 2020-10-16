import { ADD_PRODUCT } from "./productsReducer";

export const addProduct = (product) => ({
  type: ADD_PRODUCT,
  payload: {
    productName: product.name,
    locationId: product.locationId,
    categoryId: product.categoryId,
    quantity: product.quantity,
    expirationDate: product.expirationDate,
  }
});
import * as types from "./actionType";

const initialState = {
  productsRecord: [],
  singleProductDetails: [],
  isLoading: false,
  isError: false,
};

const reducer = (oldState = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case types.GET_PRODUCTS_REQUEST:
      return {
        ...oldState,
        isLoading: true,
        isError: false,
      };
    case types.GET_PRODUCTS_SUCCESS:
      return {
        ...oldState,
        isLoading: false,
        isError: false,
        productsRecord: payload,
      };
    case types.GET_PRODUCTS_FAILURE:
      return {
        ...oldState,
        isLoading: false,
        isError: payload,
      };
    case types.SET_SINGLE_PRODUCT_DETAILS:
      return {
        ...oldState,
        singleProductDetails: payload,
      };
    default:
      return oldState;
  }
};

export { reducer };

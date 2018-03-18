import Product from "../../Models/Product";

const defaultState = {
  productDetails: {
    product: null,
    loading: false,
    error: null
  },
  productList: {
    list: [],
    loading: false,
    error: null
  }
};

export default function reducer(state = defaultState, action) {
  switch (action.type) {

    // GET_PRODUCT_DETAILS
    // ------------------------------------------------------------------
    case 'GET_PRODUCT_DETAILS': {
      return {
        ...state,
        productDetails: {
          ...state.productDetails,
          loading: true
        }
      };
    }

    case 'GET_PRODUCT_DETAILS_FULFILLED': {
      return {
        ...state,
        productDetails: {
          ...state.productDetails,
          loading: false,
          product: action.payload && action.payload.data ? action.payload.data : null
        }
      };
    }

    case 'GET_PRODUCT_DETAILS_REJECTED': {
      return {
        ...state,
        productDetails: {
          ...state.productDetails,
          loading: false,
          error: action.payload.response.data.error
        }
      };
    }


    // GET_PRODUCTS
    // ------------------------------------------------------------------
    case 'GET_PRODUCTS_PENDING': {
      return {
        ...state,
        productList: {
          ...state.productList,
          loading: true
        }
      };
    }

    case 'GET_PRODUCTS_FULFILLED': {
      return {
        ...state,
        productList: {
          ...state.productList,
          loading: false,
          list: action.payload && action.payload.data ? action.payload.data : []
        }
      };
    }

    case 'GET_PRODUCTS_REJECTED': {
      return {
        ...state,
        productList: {
          ...state.productList,
          loading: false,
          error: action.payload.response.data.error
        }
      };
    }

    default: return state;
  }
}

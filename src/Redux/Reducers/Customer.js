import Customer from "../../Models/Cousine";

const defaultState = {
  customer: null,
  token: null,
  loading: false,
  error: null
};

export default function reducer(state = defaultState, action) {
  switch (action.type) {

    // SIGN_UP
    // ------------------------------------------------------------------
    case 'SIGN_UP_PENDING': {
      return {
        ...state,
        loading: true,
      };
    }

    case 'SIGN_UP_FULFILLED': {
      return {
        ...state,
        loading: false,
        token: action.payload.token,
        customer: action.payload.customer
      };
    }

    case 'SIGN_UP_REJECTED': {
      return {
        ...state,
        loading: false,
        error: action.payload.response.data.error
      };
    }

    // SIGN_IN
    // ------------------------------------------------------------------
    case 'SIGN_IN_PENDING': {
      return {
        ...state,
        loading: true,
      };
    }

    case 'SIGN_IN_FULFILLED': {
      return {
        ...state,
        loading: false,
        token: action.payload.token
      };
    }

    case 'SIGN_IN_REJECTED': {
      return {
        ...state,
        loading: false,
        error: action.payload.response ? action.payload.response.data.error : 'An error has occurred.'
      };
    }

    // SIGN_OUT
    // ------------------------------------------------------------------
    case 'SIGN_OUT_FULFILLED': {
      return {
        ...state,
        token: null
      };
    }


    // CHECK_LOGIN
    // ------------------------------------------------------------------
    case 'CHECK_LOGIN_FULFILLED': {
      return {
        ...state,
        token: action.payload
      };
    }
    
    // CUSTOMER
    // ------------------------------------------------------------------
    case 'CUSTOMER_ERROR_ACK': {
      return {
        ...state,
        error: null
      };
    }

    default: return state;
  }
}

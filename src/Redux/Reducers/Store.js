import Store from "../../Models/Store";

const defaultState = {
  storeList: {
    list: [],
    loading: false,
    error: null,
  },
  storeDetails: {
    store: null,
    loading: false,
    error: null
  }
};

export default function reducer(state = defaultState, action) {
  switch (action.type) {

    // GET_STORES
    // ------------------------------------------------------------------
    case 'GET_STORES_PENDING': {
      return {
        ...state,
        storeList: {
          ...state.storeList,
          loading: true
        }
      };
    }

    case 'GET_STORES_FULFILLED': {
      return {
        ...state,
        storeList: {
          ...state.storeList,
          loading: false,
          list: action.payload && action.payload.data ? action.payload.data.map(item => new Store(item)) : []
        }
      };
    }

    case 'GET_STORES_REJECTED': {
      return {
        ...state,
        storeList: {
          ...state.storeList,
          loading: false,
          error: action.payload.response.data.error
        }
      };
    }

    // GET_STORE_DETAILS
    // ------------------------------------------------------------------
    case 'GET_STORE_DETAILS_PENDING': {
      return {
        ...state,
        storeDetails: {
          ...state.storeDetails,
          loading: true
        }
      };
    }

    case 'GET_STORE_DETAILS_FULFILLED': {
      return {
        ...state,
        storeDetails: {
          ...state.storeDetails,
          loading: false,
          store: action.payload && action.payload.data ? new Store(action.payload.data) : null
        }
      };
    }

    case 'GET_STORE_DETAILS_REJECTED': {
      return {
        ...state,
        storeDetails: {
          ...state.storeDetails,
          loading: false,
          error: action.payload.response.data.error
        }
      };
    }

    default: return state;
  }
}

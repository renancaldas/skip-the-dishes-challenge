import Cousine from "../../Models/Cousine";

const defaultState = {
  list: [],
  loading: false,
  error: null
};

export default function reducer(state = defaultState, action) {
  switch (action.type) {

    case 'GET_COUSINES_PENDING': {
      return {
        ...state,
        loading: true,
      };
    }

    case 'GET_COUSINES_FULFILLED': {
      return {
        ...state,
        loading: false,
        list: action.payload && action.payload.data ? action.payload.data.map(item => new Cousine(item)) : []
      };
    }

    case 'GET_COUSINES_REJECTED': {
      return {
        ...state,
        loading: false,
        error: action.payload.response.data.error
      };
    }

    default: return state;
  }
}

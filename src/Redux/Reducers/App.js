import Cousine from "../../Models/Cousine";

const defaultState = {
  snackBar: {
    open: false,
    message: ''
  }
};

export default function reducer(state = defaultState, action) {
  switch (action.type) {

    case 'SNACKBAR_SHOW_FULFILLED': {
      return {
        ...state,
        snackBar: {
          open: true,
          message: action.payload
        }
      };
    }

    case 'SNACKBAR_CLOSE': {
      return {
        ...state,
        snackBar: {
          open: false,
          message: ''
        }
      };
    }

    default: return state;
  }
}

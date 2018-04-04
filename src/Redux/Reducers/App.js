import Cousine from "../../Models/Cousine";

const defaultState = {
  snackBar: {
    open: false,
    message: ''
  },
  drawer: {
    open: false
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

    case 'DRAWER_OPEN': {
      return {
        ...state,
        drawer: {
          open: true
        }
      };
    }

    case 'DRAWER_CLOSE': {
      return {
        ...state,
        drawer: {
          open: false
        }
      };
    }

    default: return state;
  }
}

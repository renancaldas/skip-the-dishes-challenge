import Order from "../../Models/Order";

const defaultState = {
  list: [],
};

export default function reducer(state = defaultState, action) {
  switch (action.type) {

    // ADD_TO_CART
    // ------------------------------------------------------------------
    case 'ADD_TO_CART_FULFILLED': {
      const newList = Object.assign([], state.list);
      newList.push(action.payload);
      
      return {
        ...state,
        list: newList
      };
    }

    // REMOVE_FROM_CART
    // ------------------------------------------------------------------
    case 'REMOVE_FROM_CART_FULFILLED': {
      const newList = Object.assign([], state.list);
      newList.splice(action.payload, 1);

      return {
        ...state,
        list: newList
      };
    }

    default: return state;
  }
}

import Order from "../../Models/Order";

const defaultState = {
  orderDetails: {
    order: null,
    loading: false,
    error: null,
  },
  orderCreated: {
    order: null,
    loading: false,
    error: null
  },
  customerOrders: {
    list: [],
    loading: false,
    error: null,
  },
};

export default function reducer(state = defaultState, action) {
  switch (action.type) {

    // GET_ORDER_DETAILS
    // ------------------------------------------------------------------
    case 'GET_ORDER_DETAILS': {
      return {
        ...state,
        orderDetails: {
          ...state.orderDetails,
          loading: true
        }
      };
    }

    case 'GET_ORDER_DETAILS_FULFILLED': {
      return {
        ...state,
        orderDetails: {
          ...state.orderDetails,
          loading: false,
          order: action.payload && action.payload.data ? new Order(action.payload.data) : null
        }
      };
    }

    case 'GET_ORDER_DETAILS_REJECTED': {
      return {
        ...state,
        orderDetails: {
          ...state.orderDetails,
          loading: false,
          error: action.payload.response.data.error
        }
      };
    }

    // CREATE_ORDER
    // ------------------------------------------------------------------
    case 'CREATE_ORDER': {
      return {
        ...state,
        orderCreated: {
          ...state.orderCreated,
          loading: true
        }
      };
    }

    case 'CREATE_ORDER_FULFILLED': {
      return {
        ...state,
        orderCreated: {
          ...state.orderCreated,
          loading: false,
          order: action.payload && action.payload.data ? new Order(action.payload.data) : null
        }
      };
    }

    case 'CREATE_ORDER_REJECTED': {
      return {
        ...state,
        orderCreated: {
          ...state.orderCreated,
          loading: false,
          error: action.payload.response.data.error
        }
      };
    }

    // GET_CUSTOMER_ORDERS
    // ------------------------------------------------------------------
    case 'GET_CUSTOMER_ORDERS': {
      return {
        ...state,
        customerOrders: {
          ...state.customerOrders,
          loading: true
        }
      };
    }

    case 'GET_CUSTOMER_ORDERS_FULFILLED': {
      return {
        ...state,
        customerOrders: {
          ...state.customerOrders,
          loading: false,
          list: action.payload && action.payload.data ? action.payload.data.map(item => new Order(item)) : []
        }
      };
    }

    case 'GET_CUSTOMER_ORDERS_REJECTED': {
      return {
        ...state,
        customerOrders: {
          ...state.customerOrders,
          loading: false,
          error: action.payload.response.data.error
        }
      };
    }

    default: return state;
  }
}

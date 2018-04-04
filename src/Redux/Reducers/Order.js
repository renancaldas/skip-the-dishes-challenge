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
    case 'GET_ORDER_DETAILS_PENDING': {
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
    case 'CREATE_ORDER_PENDING': {
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
          order: action.payload && action.payload.data ? action.payload.data : null // TODO: use class Order
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

    case 'CREATE_ORDER_ACK': {
      return {
        ...state,
        orderCreated: {
          ...state.orderCreated,
          order: null
        }
      };
    }

    // GET_CUSTOMER_ORDERS
    // ------------------------------------------------------------------
    case 'GET_CUSTOMER_ORDERS_PENDING': {
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
          list: action.payload && action.payload.data ? action.payload.data : [] // TODO: use class Order
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

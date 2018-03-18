
import config from '../../config/default.json';
import axios from 'axios'; // "fetch" is an alternative as well

export function getOrderDetailsById(orderId) {
  return {
    type: 'GET_ORDER_DETAILS',
    payload: axios.get(`${config.BASE_URL}/api/v1/Order/${orderId}`)
  }
}

export function createOrder(order, token) {
  return {
    type: 'CREATE_ORDER',
    payload: axios.post(`${config.BASE_URL}/api/v1/Order`, { headers: { Authorization: `Bearer ${token}` }}, order)
  }
}

export function getOrdersByCustomer(orderId) {
  return {
    type: 'GET_CUSTOMER_ORDERS',
    payload: axios.get(`${config.BASE_URL}/api/v1/Order/customer`)
  }
}

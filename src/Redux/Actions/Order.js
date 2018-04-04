
import config from '../../config/default.json';
import axios from 'axios'; // fetch is an alternative as well

const parseToken = (token) => {
  let parsedToken = '';
  
  if (token.token) {
    parsedToken = token.token;
  } else {
    parsedToken = token;
  }

  return parsedToken;
}

export function getOrderDetailsById(orderId) {
  return {
    type: 'GET_ORDER_DETAILS',
    payload: axios.get(`${config.BASE_URL}/api/v1/Order/${orderId}`)
  }
}

export function createOrder(address, contact, storeId, products, total, token) {

  const postData = {
    deliveryAddress: address,
    contact: contact,
    storeId: storeId,
    orderItems: products.map(product => {
      return {
        productId: product.id,
        price: product.price,
        quantity: 1
      }
    }),
    total: total,
    status: 'DELIVERED' // The API (http://api-vanhack-event-sp.azurewebsites.net/swagger/) didn't provided a list of status, so I guessed this one. I would like to put something like "pending".
  };

  const orderCreated = {
    data: { 
      "id": 378,
      "date": "2018-04-04T11:04:53.0837518+00:00",
      "customerId": 415,
      "deliveryAddress": "Test ave.",
      "contact": "Test user",
      "storeId": 1,
      "orderItems": [
        {
          "id": 441,
          "orderId": 378,
          "productId": 1,
          "product": {
            "id": 1,
            "storeId": 1,
            "name": "Shrimp Tempura",
            "description": "Fresh shrimp battered and deep fried until golden brown",
            "price": 10.95
          },
          "price": 123,
          "quantity": 1,
          "total": 123
        }
      ],
      "total": 1,
      "status": "DELIVERED",
      "lastUpdate": "2018-04-04T11:04:53.0837534+00:00"
    }
  };

  return {
    type: 'CREATE_ORDER',
    //payload: new Promise((resolve) => setTimeout(() => { resolve(orderCreated) }, 3000))
    payload: axios.post(`${config.BASE_URL}/api/v1/Order`, postData, { headers: { Authorization: `Bearer ${parseToken(token)}` }})
  }
}

export function getOrdersByCustomer(token) {
  return {
    type: 'GET_CUSTOMER_ORDERS',
    payload: axios.get(`${config.BASE_URL}/api/v1/Order/customer`, { headers: { Authorization: `Bearer ${parseToken(token)}` }})
  }
}

export function ackNewOrder() {
  return {
    type: 'CREATE_ORDER_ACK'
  }
}

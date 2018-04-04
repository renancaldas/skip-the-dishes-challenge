
import config from '../../config/default.json';
import axios from 'axios'; // "fetch" is an alternative as well

export function signIn(customer) {
  const body = new FormData();

  if(customer.email)
    body.set('email', customer.email);

  if(customer.password)
    body.set('password', customer.password);

  return {
    type: 'SIGN_IN',
    payload: new Promise((resolve, reject) => {
      axios.post(`${config.BASE_URL}/api/v1/Customer/auth`, body)
        .then(response => {
          localStorage.setItem('userToken', response.data);
          resolve({ token: response.data })
        })
        .catch(err => reject(err))
    })
    
    
  }
}

export function signUp(customer) {
  return {
    type: 'SIGN_UP',
    payload: new Promise((resolve, reject) => {
      axios.post(`${config.BASE_URL}/api/v1/Customer`, customer)
        .then(response => {
          localStorage.setItem('userToken', response.data);
          resolve({ token: response.data, customer });
        })
        .catch(err => reject(err))
    })
  }
}
export function signOut() {
  return {
    type: 'SIGN_OUT',
    payload: new Promise((resolve, reject) => {
      localStorage.removeItem('userToken');
      resolve();
    })
  }
}

export function checkStoredLogin() {
  return {
    type: 'CHECK_LOGIN',
    payload: new Promise((resolve, reject) => {
      const token = localStorage.getItem('userToken');
      resolve({ token });
    })
  }
}

export function customerAckError() {
  return {
    type: 'CUSTOMER_ERROR_ACK'
  }
}
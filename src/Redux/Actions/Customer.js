
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
    payload: axios.post(`${config.BASE_URL}/api/v1/Customer/auth`, body)
  }
}

export function signUp(customer) {
  return {
    type: 'SIGN_UP',
    payload: new Promise((resolve, reject) => {
      axios.post(`${config.BASE_URL}/api/v1/Customer`, customer)
        .then(response => resolve({ token: response.data, customer }))
        .catch(err => reject(err))
    })
  }
}

export function signUpAckError() {
  return {
    type: 'SIGN_UP_ERROR_ACK'
  }
}
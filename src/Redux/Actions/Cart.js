
import config from '../../config/default.json';
import axios from 'axios'; // "fetch" is an alternative as well

export function addToCard(product) {
  return {
    type: 'ADD_TO_CART',
    payload: new Promise((resolve, reject) => resolve(product))
  }
}

export function removeFromCart(product) {
  return {
    type: 'REMOVE_FROM_CART',
    payload: new Promise((resolve, reject) => resolve(product))
  }
}

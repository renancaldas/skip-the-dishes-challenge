
import config from '../../config/default.json';
import axios from 'axios'; // "fetch" is an alternative as well

export function getAllProductsByStoreId(storeId) {
  console.log('>>> getAllProductsByStoreId', storeId)
  return {
    type: 'GET_PRODUCTS',
    payload: new Promise((resolve, reject) => {
      axios.get(`${config.BASE_URL}/api/v1/Product`)
        .then((result) => {
          // Filter all products by storeId
          result.data = result.data.filter(product => product.storeId == storeId)
          resolve(result);
        })
        .catch(err => reject(err))
    })
  }
}

export function getProductsBySeachText(searchText) {
  return {
    type: 'GET_PRODUCTS',
    payload: axios.get(`${config.BASE_URL}/api/v1/Product/search/${searchText}`)
  }
}

export function getProductDetailsById(productId) {
  return {
    type: 'GET_PRODUCT_DETAILS',
    payload: axios.get(`${config.BASE_URL}/api/v1/Product/${productId}`)
  }
}
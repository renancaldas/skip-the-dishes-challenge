
import config from '../../config/default.json';
import axios from 'axios'; // "fetch" is an alternative as well

// Observation: 
// This endpoint could be: /api/v1/Store/cousine/${cousineId}
export function getStoresByCousineId(cousineId) {
  return {
    type: 'GET_STORES',
    payload: axios.get(`${config.BASE_URL}/api/v1/Cousine/${cousineId}/stores`)
  }
}

export function getAllStores() {
  return {
    type: 'GET_STORES',
    payload: axios.get(`${config.BASE_URL}/api/v1/Store`)
  }
}

export function getStoresBySearchText(searchText) {
  return {
    type: 'GET_STORES',
    payload: axios.get(`${config.BASE_URL}/api/v1/Store/search/${searchText}`)
  }
}

export function getStoreDetailsById(storeId) {
  console.log('>>> getStoreDetailsById', storeId)
  return {
    type: 'GET_STORE_DETAILS',
    payload: axios.get(`${config.BASE_URL}/api/v1/Store/${storeId}`)
  }
}

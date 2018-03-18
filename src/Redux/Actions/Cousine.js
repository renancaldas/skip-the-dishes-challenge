
import config from '../../config/default.json';
import axios from 'axios'; // "fetch" is an alternative as well

export function getAllCousines() {
  return {
    type: 'GET_COUSINES',
    payload: axios.get(`${config.BASE_URL}/api/v1/Cousine`)
  }
}

export function getCousinesBySearchText(searchText) {
  return {
    type: 'GET_COUSINES',
    payload: axios.get(`${config.BASE_URL}/api/v1/Cousine/search/${searchText}`)
  }
}

// export function getStoresByCousineId(cousineId) {
//   return {
//     type: 'GET_COUSINES',
//     payload: axios.get(`${config.BASE_URL}/api/v1/Cousine/${cousineId}/stores`)
//   }
// }
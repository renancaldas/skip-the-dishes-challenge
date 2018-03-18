import { combineReducers } from 'redux';

import App from './App';
import Cousine from './Cousine';
import Customer from './Customer';
import Order from './Order';
import Product from './Product';
import Store from './Store';

export default combineReducers({
  App,
  Cousine,
  Customer,
  Order,
  Product,
  Store  
});

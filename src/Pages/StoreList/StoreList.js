import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import './StoreList.css';

// Redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
  getAllStores,
  getStoresByCousineId,
  getStoreDetailsById,
  getStoresBySearchText
} from '../../Redux/Actions/Store';

import {
  getAllCousines
} from '../../Redux/Actions/Cousine';

import Sidemenu from './Sidemenu/Sidemenu';
import Body from './Body/Body';

class StoreList extends Component {
  constructor(props) {
    super(props);
    
    // User not logged in
    if (!this.props.Customer.token) 
      browserHistory.push('/login'); // Go to Login
  }

  componentDidMount() {
    const { getAllStores, getAllCousines } = this.props;
    
    getAllStores();
    getAllCousines();
  } 

  render() {
    const { Store, Cousine } = this.props;

    return (
      <div className="store-list">
        <Sidemenu 
          cousineList={Cousine.list}
         />
        <Body 
          loading={Store.storeList.loading}
          storeList={Store.storeList.list}
          cousineList={Cousine.list}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    Customer: state.Customer,
    Store: state.Store,
    Cousine: state.Cousine
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    getAllStores: bindActionCreators(getAllStores, dispatch),
    getAllCousines: bindActionCreators(getAllCousines, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(StoreList);

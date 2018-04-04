import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import RaisedButton from 'material-ui/RaisedButton';

// Redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getAllCousines } from '../../Redux/Actions/Cousine';
import { getAllStores } from '../../Redux/Actions/Store';


// Local Dependencies
import './StoreList.css';
import Drawer from '../../Components/Drawer/Drawer';
import Header from '../../Components/Header/Header';
import Stores from './Stores/Stores';

class StoreList extends Component {
  constructor(props) {
    super(props);

    // User not logged in
    if (!props.Customer.token)
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
      <div >
        <Drawer />
        <Header title="Stores" />
        <Stores
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

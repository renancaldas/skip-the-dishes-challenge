import React, { Component } from 'react';
import { browserHistory, Router, Route } from 'react-router';
import Snackbar from 'material-ui/Snackbar';
import './App.css';
import config from './config/default.json';

// import store from './redux-src/store';
import Login from './Pages/Login/Login.js';
import StoreList from './Pages/StoreList/StoreList.js';
import StoreProducts from './Pages/StoreProducts/StoreProducts.js';
import OrderDetails from './Pages/OrderDetails/OrderDetails.js';

// Redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { closeSnackbar } from './Redux/Actions/App';

class App extends Component {
  componentWillReceiveProps(nextProps) {
    console.log('>>>>>> nextProps', nextProps);
  }
  render() {
    const { snackBar, closeSnackbar } = this.props;

    return (
      <div>
        <Router history={browserHistory} >
          <Route path="/" component={StoreList} />
          <Route path="/login" component={Login} />
          <Route path="/stores" component={StoreList} />
          <Route path="/store/:storeId" component={StoreProducts} />
          <Route path="/order/:orderId" component={OrderDetails} />
        </Router>
        
        <Snackbar
          open={snackBar.open}
          message={snackBar.message}
          autoHideDuration={config.SNACKBAR_HIDE_TIMEOUT}
          onRequestClose={() => closeSnackbar()}
        />
      </div>

    );
  }
}


const mapStateToProps = (state) => {
  return {
    snackBar: state.App.snackBar
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    closeSnackbar: bindActionCreators(closeSnackbar, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);

import React, { Component } from 'react';
import { browserHistory, Router, Route } from 'react-router';
import Snackbar from 'material-ui/Snackbar';

// import store from './redux-src/store';
import Login from './Pages/Login/Login.js';
import StoreList from './Pages/StoreList/StoreList.js';
import StoreProducts from './Pages/StoreProducts/StoreProducts.js';
import MyOrders from './Pages/MyOrders/MyOrders.js';

// Redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { closeSnackbar } from './Redux/Actions/App';
import { checkStoredLogin } from './Redux/Actions/Customer';

// Local Dependencies
import './App.css';
import config from './config/default.json';

class App extends Component {
  componentDidMount() {
    this.props.checkStoredLogin();
  }
  
  render() {
    const { snackBar, closeSnackbar } = this.props;

    return (
      <div>
        <Router history={browserHistory} >
          <Route path="/" component={StoreList} />
          <Route path="/login" component={props => <Login {...props} isSignIn={true}/>} />
          <Route path="/signup" component={props => <Login {...props} isSignIn={false}/>} />
          
          <Route path="/stores" component={StoreList} />
          <Route path="/store/:storeId" component={StoreProducts} />
          
          <Route path="/myorders" component={MyOrders} />
          <Route path="/myorders/:orderId" component={MyOrders} />
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
    closeSnackbar: bindActionCreators(closeSnackbar, dispatch),
    checkStoredLogin: bindActionCreators(checkStoredLogin, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);

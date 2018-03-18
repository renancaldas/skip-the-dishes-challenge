import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { Card, CardActions, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import CircularProgress from 'material-ui/CircularProgress';
import './Login.css';

// Redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { signIn, signUp, signUpAckError } from '../../Redux/Actions/Customer';
import { showSnackbar } from '../../Redux/Actions/App';

import Logo from '../../assets/img/skip_logo.png';
import config from '../../config/default.json';

class Login extends Component {
  state = {
    isSignIn: true,
    customer: {
      email: '',
      password: ''
    }
  }

  componentWillReceiveProps(nextProps) {
    const { signUpAckError, showSnackbar } = this.props;

    // An error has occured
    if (!this.props.Customer.error && nextProps.Customer.error) {
      showSnackbar(nextProps.Customer.error);
      setTimeout(() => { signUpAckError() }, config.SNACKBAR_HIDE_TIMEOUT);
    }

    // Sign up
    if (!this.props.Customer.token && nextProps.Customer.token) {
      browserHistory.push('/stores'); // Go to StoreList
    } 
  }

  onChangeName(name) {
    const { customer } = this.state;
    customer.name = name;
    this.setState({ customer });
  }

  onChangeAddress(address) {
    const { customer } = this.state;
    customer.address = address;
    this.setState({ customer });
  }

  onChangeEmail(email) {
    const { customer } = this.state;
    customer.email = email;
    this.setState({ customer });
  }

  onChangePassword(password) {
    const { customer } = this.state;
    customer.password = password;
    this.setState({ customer });
  }

  onSubmitClick() {
    const { isSignIn, customer } = this.state;
    const { signIn, signUp } = this.props;

    if (isSignIn)
      signIn(customer);
    else
      signUp(customer);
  }

  render() {
    const { isSignIn } = this.state;
    const { Customer } = this.props;

    const signInForm = (
      <div className="flex-row">
        <TextField
          hintText="Email"
          onChange={(e) => { this.onChangeEmail(e.target.value) }}
        // errorText={errors.user}
        />

        <TextField
          hintText="Password"
          onChange={(e) => { this.onChangePassword(e.target.value) }}
        // errorText={errors.user}
        />
      </div>
    );

    const signUpForm = (
      <div className="flex-row">
        <TextField
          hintText="Name"
          onChange={(e) => { this.onChangeName(e.target.value) }}
        // errorText={errors.user}
        />

        <TextField
          hintText="Address"
          onChange={(e) => { this.onChangeAddress(e.target.value) }}
        // errorText={errors.user}
        />

        <TextField
          hintText="Email"
          onChange={(e) => { this.onChangeEmail(e.target.value) }}
        // errorText={errors.user}
        />

        <TextField
          hintText="Password"
          type="password"
          onChange={(e) => { this.onChangePassword(e.target.value) }}
        // errorText={errors.user}
        />
      </div>
    )

    return (
      <div className="login">

        <div className="flex-row left">
          <img alt="" className="logo" src={Logo} />
          <label>React code challenge</label>
        </div>

        <div className="mid">
        </div>

        <div className="flex-row right">

          <Card className="card">
            <CardText className="flex-row card-content">
              {isSignIn ? signInForm : signUpForm}
            </CardText>
            <CardActions style={{ textAlign: 'right' }}>
              {
                Customer.loading ? (
                  <CircularProgress />
                ) : (
                  <FlatButton
                    primary={true}
                    className="buttonLogin"
                    label={isSignIn ? 'Sign In' : 'Sign Up'}
                    onClick={() => this.onSubmitClick()}
                  />
                )
              }
              
            </CardActions>
          </Card>

          <label
            className="toggle-form clickable"
            onClick={() => this.setState({ isSignIn: !isSignIn })}
          >
            {isSignIn ? 'I don\'t have an account' : 'I have an account'}
          </label>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    Customer: state.Customer
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    signIn: bindActionCreators(signIn, dispatch),
    signUp: bindActionCreators(signUp, dispatch),
    signUpAckError: bindActionCreators(signUpAckError, dispatch),
    showSnackbar: bindActionCreators(showSnackbar, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);

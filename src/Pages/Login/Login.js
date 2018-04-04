import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { Card, CardActions, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import CircularProgress from 'material-ui/CircularProgress';

// Redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { signIn, signUp, customerAckError } from '../../Redux/Actions/Customer';
import { showSnackbar } from '../../Redux/Actions/App';

// Local Dependencies
import './Login.css';
import Logo from '../../assets/img/skip_logo.png';
import config from '../../config/default.json';
import { isEmailValid, isStringNullOrEmpty } from '../../helpers/validations';
import { REQUIRED_FIELD, INVALID_EMAIL } from '../../helpers/messages';

class Login extends Component {
  state = {
    submitted: false,
    customer: {
      name: null,
      address: null,
      email: null,
      password: null
    }
  }

  componentWillReceiveProps(nextProps) {
    const { customerAckError, showSnackbar } = this.props;

    // An error has occured
    if (!this.props.Customer.error && nextProps.Customer.error) {
      showSnackbar(nextProps.Customer.error);
      customerAckError();
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
    const { customer } = this.state;
    const { signIn, signUp, isSignIn } = this.props;

    if (isSignIn) {
      const isInvalid = isStringNullOrEmpty(customer.email) 
        || !isEmailValid(customer.email) 
        || isStringNullOrEmpty(customer.password);
      
      if(!isInvalid)
        signIn(customer);
    } else {
      const isInvalid = isStringNullOrEmpty(customer.name) 
        || isStringNullOrEmpty(customer.address) 
        || isStringNullOrEmpty(customer.email) 
        || !isEmailValid(customer.email)
        || isStringNullOrEmpty(customer.password);
      
      if(!isInvalid)
        signUp(customer);
    }

    this.setState({ submitted: true });
  }

  render() {
    const { customer, submitted } = this.state;
    const { Customer, isSignIn } = this.props;

    const signInForm = (
      <div className="flex-row">
        <TextField
          hintText="Email"
          onChange={(e) => { this.onChangeEmail(e.target.value) }}
          errorText={submitted && (isStringNullOrEmpty(customer.email) ? REQUIRED_FIELD 
            : (!isEmailValid(customer.email) ? INVALID_EMAIL : null))}
        />
        <br />
        <TextField
          hintText="Password"
          type="password"
          onChange={(e) => { this.onChangePassword(e.target.value) }}
          errorText={submitted && isStringNullOrEmpty(customer.password) ? REQUIRED_FIELD : null}
        />
      </div>
    );

    const signUpForm = (
      <div className="flex-row">
        <TextField
          hintText="Name *"
          onChange={(e) => { this.onChangeName(e.target.value) }}
          errorText={submitted && isStringNullOrEmpty(customer.name) ? REQUIRED_FIELD : null}
        />
        <br />
        <TextField
          hintText="Address *"
          onChange={(e) => { this.onChangeAddress(e.target.value) }}
          errorText={submitted && isStringNullOrEmpty(customer.address) ? REQUIRED_FIELD : null}
        />
        <br />
        <TextField
          hintText="Email *"
          onChange={(e) => { this.onChangeEmail(e.target.value) }}
          errorText={submitted && (isStringNullOrEmpty(customer.email) ? REQUIRED_FIELD 
            : (!isEmailValid(customer.email) ? INVALID_EMAIL : null))}
        />
        <br />
        <TextField
          hintText="Password *"
          type="password"
          onChange={(e) => { this.onChangePassword(e.target.value) }}
          errorText={submitted && isStringNullOrEmpty(customer.password) ? REQUIRED_FIELD : null}
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
            onClick={() => browserHistory.push(isSignIn ? '/signup' : '/login')}
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
    customerAckError: bindActionCreators(customerAckError, dispatch),
    showSnackbar: bindActionCreators(showSnackbar, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);

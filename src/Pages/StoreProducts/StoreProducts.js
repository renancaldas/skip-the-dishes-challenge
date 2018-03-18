import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { List, ListItem } from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import AddIcon from 'material-ui/svg-icons/content/add';
import RemoveIcon from 'material-ui/svg-icons/content/remove';
import './StoreProducts.css';



// Redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { getAllProductsByStoreId } from '../../Redux/Actions/Product';
import { getStoreDetailsById } from '../../Redux/Actions/Store';
import { createOrder, ackNewOrder } from '../../Redux/Actions/Order';

class StoreProducts extends Component {
  state = {
    selectedProducts: []
  }

  constructor(props) {
    super(props);
    
    // User not logged in
    if (!this.props.Customer.token) 
      browserHistory.push('/login'); // Go to Login
  }

  componentWillReceiveProps(nextProps) {
    const { params } = this.props;

    // A new order has been created
    if(!this.props.orderCreated && nextProps.orderCreated) {
      browserHistory.push(`/order/${params.orderId}`);
    }
  }

  componentWillMount() {
    console.log('>>>> this.props', this.props);
  }

  componentDidMount() {
    const { getAllProductsByStoreId, getStoreDetailsById, params } = this.props;
    getAllProductsByStoreId(params.storeId);
    getStoreDetailsById(params.storeId);
  }

  addProduct(product) {
    const { selectedProducts } = this.state;
    selectedProducts.push(product)
    this.setState({ selectedProducts });
  }

  removeProduct(index) {
    const { selectedProducts } = this.state
    selectedProducts.splice(index, 1);
    this.setState({ selectedProducts });
  }

  openProductDetails(product) {
    console.log('product', product);
  }

  onClickCreateOrder() {
    const { createOrder, Customer } = this.props;
    const { products } = this.state;
    
    // const order = {
    //   ...
    // }

    // createOrder(order, Customer.token);
    
    let message = `
      Sorry, but unfortunately I haven't time to continue. :(
      The wifi at the hotel was really complicated...  
      But I appreciate your time and effort to be here in Brazil, giving us this unique opportunity.
      It was a great experience for me! :D
    `;

    alert(message);
  }

  render() {
    const { Product } = this.props;
    const { selectedProducts } = this.state;

    return (
      <div className="store-products" >

        <div className="flex-row left">
          <List>
            <Subheader>Products</Subheader>
            {
              Product.productList && Product.productList.list.length > 0 && Product.productList.list.map((product,index) => (
                <ListItem
                  key={index}
                  rightIcon={
                    <AddIcon
                      onClick={() => this.addProduct(product)}
                    />
                  }
                  primaryText={product.name}
                  secondaryText={product.description}
                  onClick={() => this.openProductDetails(product)}
                />
              ))
            }
          </List>
        </div>

        <div className="mid">
        </div>

        <div className="flex-row right">
          <List>
            <Subheader>Selected Products</Subheader>
            {
              selectedProducts && selectedProducts.map((product, index) => (
                <ListItem
                  key={index}
                  primaryText={product.name}
                  rightIcon={
                    <div>
                      <RemoveIcon
                        onClick={() => this.removeProduct(index)}
                      />
                    </div>
                  }
                />
              ))
            }
          </List>

          <label> Total: {selectedProducts.reduce((acc, product, index) => acc + product.price, 0)} </label>

          <RaisedButton
            primary={true}
            disabled={selectedProducts.length === 0}
            label="Place order"
            onClick={() => this.onClickCreateOrder()}
          />
        </div>
      </div>
    );
  }
}


// Redux
function mapStateToProps(state) {
  return {
    Store: state.Store,
    Product: state.Product,
    Customer: state.Customer
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getStoreDetailsById: bindActionCreators(getAllProductsByStoreId, dispatch),
    getAllProductsByStoreId: bindActionCreators(getAllProductsByStoreId, dispatch),
    createOrder: bindActionCreators(createOrder, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(StoreProducts);

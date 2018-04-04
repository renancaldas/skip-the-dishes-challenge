import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { Card, CardMedia, CardText, CardTitle, CardActions } from 'material-ui/Card';
import { List, ListItem } from 'material-ui/List';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import IconButton from 'material-ui/IconButton';
import IconDelete from 'material-ui/svg-icons/action/delete';
import IconNoItems from 'material-ui/svg-icons/av/not-interested';
import TextField from 'material-ui/TextField';
import CircularProgress from 'material-ui/CircularProgress';

// Redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getAllProductsByStoreId } from '../../Redux/Actions/Product';
import { getStoreDetailsById } from '../../Redux/Actions/Store';
import { addToCard, removeFromCart } from '../../Redux/Actions/Cart';
import { createOrder } from '../../Redux/Actions/Order';

// Local Dependencies
import './StoreProducts.css';
import Drawer from '../../Components/Drawer/Drawer';
import Header from '../../Components/Header/Header';
import ImgRestaurant from '../../assets/img/restaurant.png';
import { truncate2Decimals } from '../../helpers/calc';

class StoreProducts extends Component {
  state = {
    showOrderConfirm: false,
    address: '',
    contact: ''
  };

  constructor(props) {
    super(props);

    // User not logged in
    if (!props.Customer.token)
      browserHistory.push('/login'); // Go to Login
  }

  shouldComponentUpdate() {
    const { Store, Product } = this.props;
    return Store.storeDetails !== null && Product.productList !== null;
  }

  componentDidMount() {
    const { getAllProductsByStoreId, getStoreDetailsById, params } = this.props;

    getAllProductsByStoreId(params.storeId);
    getStoreDetailsById(params.storeId);
  }

  componentWillReceiveProps(nextProps) {
    // A new order has been created
    if (!this.props.Order.orderCreated.order && nextProps.Order.orderCreated.order) {
      browserHistory.push(`/myorders/${nextProps.Order.orderCreated.order.id}`);
    }
  }

  placeOrder() {
    const { Customer, Cart, createOrder, params } = this.props;
    const { address, contact } = this.state;

    const total = this.getTotal(Cart.list);
    createOrder(address, contact, params.storeId, Cart.list, total, Customer.token);
  }

  parsePrice(price) {
    return truncate2Decimals(price);
  }

  getTotal(cart) {
    return cart.reduce((acc, product, index) => acc + product.price, 0);
  }

  render() {
    const { Store, Product, Cart, Order, addToCard, removeFromCart } = this.props;

    const storeName = Store.storeDetails.store ? Store.storeDetails.store.name : '';
    const storeAddress = Store.storeDetails.store ? Store.storeDetails.store.address : '';

    return (
      <div className="store-products">
        <Drawer />
        <Header title="Menu" back={true} />

        <div className="menu">
          <Card>
            <CardMedia
              style={{ height: '300px', overflow: 'hidden' }}
              overlay={<CardTitle title={storeName} subtitle={storeAddress} />}
            >
              <img src={ImgRestaurant} alt="" />
            </CardMedia>
            <CardText >
              <List>
                {Product.productList.list.map(product =>
                  <ListItem
                    key={product.id}
                    primaryText={product.name}
                    secondaryText={product.description}
                    rightIcon={<label className="price">$ {this.parsePrice(product.price)}</label>}
                    onClick={() => addToCard(product)}
                  />)
                }
              </List>
            </CardText>
          </Card>
        </div>

        <div className="cart">
          <Card>
            <CardTitle title="" subtitle="Your order" />
            <CardText >
              <div>
                <TextField
                  hintText="Contact"
                  fullWidth={true}
                  onChange={e => this.setState({ contact: e.target.value })}
                />

                <TextField
                  hintText="Delivery Address"
                  fullWidth={true}
                  onChange={e => this.setState({ address: e.target.value })}
                />
              </div>

              <List>
                {Cart.list.length === 0 && <ListItem leftIcon={<IconNoItems />} primaryText="No items" />}
                {Cart.list.map((product, index) =>
                  <ListItem
                    key={index}
                    leftIcon={<IconDelete onClick={() => removeFromCart(index)} />}
                    primaryText={product.name}
                    rightIcon={<label className="price">$ {this.parsePrice(product.price)}</label>}
                  />)
                }

                {
                  Cart.list.length > 0 &&
                  <ListItem
                    disabled={true}
                    primaryText="Total"
                    rightIcon={
                      <label className="total">
                        $ {this.parsePrice(this.getTotal(Cart.list))}
                      </label>
                    }
                  />
                }
              </List>
            </CardText>
            <CardActions className="footer">
              <div />

              <RaisedButton
                label="Place order"
                secondary={true}
                disabled={Cart.list.length === 0 || this.state.address === '' || this.state.contact === '' }
                onClick={() => this.setState({ showOrderConfirm: true })}
              />
            </CardActions>
          </Card>
        </div>

        <Dialog
          actions={
              Order.orderCreated.loading ? [<CircularProgress />] : [
              <FlatButton
                label="Cancel"
                onClick={() => this.setState({ showOrderConfirm: false })}
              />,
              <FlatButton
                label="Confirm"
                secondary={true}
                onClick={() => this.placeOrder()}
              />,
            ]
          }
          modal={false}
          open={this.state.showOrderConfirm}
          onRequestClose={() => this.setState({ showOrderConfirm: false })}
        >
          Would you like to confirm the order?

          <ul>
            <li> Contact: {this.state.contact} </li>
            <li> Address: {this.state.address} </li>
            <li> Total: $ {this.parsePrice(this.getTotal(Cart.list))} </li>
          </ul>
          
        </Dialog>

      </div>
    );
  }
}

// Redux
const mapStateToProps = (state) => {
  return {
    Store: state.Store,
    Product: state.Product,
    Customer: state.Customer,
    Cart: state.Cart,
    Order: state.Order
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    getStoreDetailsById: bindActionCreators(getStoreDetailsById, dispatch),
    getAllProductsByStoreId: bindActionCreators(getAllProductsByStoreId, dispatch),
    addToCard: bindActionCreators(addToCard, dispatch),
    removeFromCart: bindActionCreators(removeFromCart, dispatch),
    createOrder: bindActionCreators(createOrder, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(StoreProducts);

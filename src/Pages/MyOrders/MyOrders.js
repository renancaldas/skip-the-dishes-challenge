import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { Card, CardMedia, CardText, CardTitle, CardActions, CardHeader } from 'material-ui/Card';
import { List, ListItem } from 'material-ui/List';
import SweetAlert from 'sweetalert-react';
import 'sweetalert/dist/sweetalert.css';
import moment from 'moment';
import { orderBy } from 'lodash';

// Redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getOrdersByCustomer, ackNewOrder } from '../../Redux/Actions/Order';
import { getAllStores } from '../../Redux/Actions/Store';

// Local Dependencies
import './MyOrders.css';
import Drawer from '../../Components/Drawer/Drawer';
import Header from '../../Components/Header/Header';

class MyOrders extends Component {
  state = {
    showOrderCreated: false
  };

  constructor(props) {
    super(props);

    // User not logged in
    if (!props.Customer.token)
      browserHistory.push('/login'); // Go to Login
  }

  componentDidMount() {
    const { Customer, getOrdersByCustomer, getAllStores, params } = this.props;

    getAllStores();

    if (Customer.token)
      getOrdersByCustomer(Customer.token);

    if (params.orderId) {
      this.setState({ showOrderCreated: true });
      this.props.ackNewOrder();
    }
  }

  getStoreById(storeId) {
    const { Store } = this.props;
    return Store.storeList.list.filter(store => store.id == storeId)[0];
  }

  shouldComponentUpdate() {
    const { Order } = this.props;
    return Order.customerOrders !== null;
  }

  parseOrderStatus(status) {
    let statusText = '';

    switch (status) {
      case 'DELIVERED': {
        statusText = 'Delivered';
        break;
      }

      default: {
        statusText = 'N/A';
        break;
      }
    }

    return statusText;
  }

  render() {
    const { Order } = this.props;

    return (
      <div className="myorders" >
        <Drawer />
        <Header title="My orders" />

        {
          Order.customerOrders.list.length === 0 ? <div>No orders</div> : (
            orderBy(Order.customerOrders.list, 'id', 'desc').map(order =>
              <Card className="order">
                <CardHeader
                  title={`Order no. ${order.id}`}
                  subtitle={`${this.parseOrderStatus(order.status)} | ${new moment(order.date).format('MM/DD/YYYY HH:mm:ss')}`}
                />

                <CardText >
                  <b>Delivery Address:</b> {order.deliveryAddress} <br />
                  <b>Contact:</b> {order.contact} <br />
                  <b>Store:</b> {this.getStoreById(order.storeId).name} <br />
                  <b>Total:</b> {order.total} <br />
                  <ul>
                    <List>
                      {
                        order.orderItems.map(item =>
                          <ListItem
                            key={item.product.id}
                            primaryText={item.product.name}
                            secondaryText={item.product.description}
                            rightIcon={<label className="price">$ {item.product.price}</label>}
                          />)
                      }
                    </List>
                  </ul>


                </CardText>
              </Card>
            )
          )
        }

        <SweetAlert
          type="success"
          show={this.state.showOrderCreated}
          title="Yay"
          text="Your order has been created successfully!"
          onConfirm={() => this.setState({ showOrderCreated: false })}
        />
      </div>
    );
  }
}


// Redux
function mapStateToProps(state) {
  return {
    Store: state.Store,
    Order: state.Order,
    Customer: state.Customer
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getAllStores: bindActionCreators(getAllStores, dispatch),
    getOrdersByCustomer: bindActionCreators(getOrdersByCustomer, dispatch),
    ackNewOrder: bindActionCreators(ackNewOrder, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MyOrders);

import React, { Component } from 'react';
import { List, ListItem } from 'material-ui/List';
import FlatButton from 'material-ui/FlatButton';

// Redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { getOrderDetailsById } from '../../Redux/Actions/Order';

class OrderDetails extends Component {
  state = {
    selectedProducts: []
  }

  componentWillMount() {
    console.log('>>>> this.props', this.props);
  }

  componentDidMount() {
    const { getOrderDetailsById, params } = this.props;
    getOrderDetailsById(params.orderId);
  }

  render() {
    const { Order } = this.props;

    return (
      <div className="order-details" >
        Order Details
      </div>
    );
  }
}


// Redux
function mapStateToProps(state) {
  return {
    Order: state.Order,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getOrderDetailsById: bindActionCreators(getOrderDetailsById, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderDetails);

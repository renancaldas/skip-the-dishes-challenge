import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';

import IconStore from 'material-ui/svg-icons/action/store';
import IconList from 'material-ui/svg-icons/action/list';
import IconSignOut from 'material-ui/svg-icons/hardware/keyboard-backspace';

// Redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { openDrawer, closeDrawer } from '../../Redux/Actions/App';
import { signOut } from '../../Redux/Actions/Customer';


class Header extends Component {

  redirect(path) {
    this.props.closeDrawer();
    browserHistory.push(path);
  }

  handleSignOut() {
    this.props.signOut();
    this.redirect('/login');
  }

  render() {
    const { drawer, openDrawer, closeDrawer } = this.props;

    return (
      <Drawer
        docked={false}
        width={250}
        open={drawer.open}
        onRequestChange={open => open ? openDrawer() : closeDrawer()}
      >
        <MenuItem leftIcon={<IconStore />} onClick={() => this.redirect('/stores')}>Stores</MenuItem>
        <MenuItem leftIcon={<IconList />} onClick={() => this.redirect('/myorders')}>My orders</MenuItem>
        <MenuItem leftIcon={<IconSignOut />} onClick={() => this.handleSignOut()}>Logout</MenuItem>
      </Drawer>
    );
  }
}


// Redux
const mapStateToProps = (state) => {
  return {
    drawer: state.App.drawer
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    openDrawer: bindActionCreators(openDrawer, dispatch),
    closeDrawer: bindActionCreators(closeDrawer, dispatch),
    signOut: bindActionCreators(signOut, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);

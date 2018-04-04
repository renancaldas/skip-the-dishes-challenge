import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/svg-icons/navigation/menu';
import IconChevronLeft from 'material-ui/svg-icons/navigation/chevron-left';

// Redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { openDrawer } from '../../Redux/Actions/App';

// Local Dependencies
import './Header.css';
import config from '../../config/default.json';
import AvatarLogo from '../../assets/img/avatar.png';

class Header extends Component {
  render() {
    const { title, back } = this.props;

    return (
      <div className="header">
        <AppBar
          title={title}
          style={{ backgroundColor: config.COLOURS.RED }}
          iconElementLeft={
            back ? (  
              <IconButton><IconChevronLeft /></IconButton>
            ) : (
              <IconButton><IconMenu /></IconButton>
            )
          }
          onLeftIconButtonClick={() => {
            if (back) 
              browserHistory.goBack();
            else
              this.props.openDrawer();
          }}
          iconElementRight={
            <div className="right-content">
              <label>Welcome user</label>
              <img
                src={AvatarLogo}
                className="avatar"
              />
            </div>
          }
        />
      </div>
    );
  }
}


// Redux
const mapStateToProps = (state) => {
  return {
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    openDrawer: bindActionCreators(openDrawer, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);

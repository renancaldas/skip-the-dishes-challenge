import React, { Component } from 'react';
import './Header.css';

// Redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import AvatarLogo from '../../../../assets/img/avatar.png';

class Header extends Component {
  render() {
    return (
      <div className="header">
        
        <div className="right-content">
          <label>Welcome user</label>
          <img
            src={AvatarLogo}
            className="avatar"
          /> 
        </div>
        
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
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);

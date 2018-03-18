import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { List, ListItem } from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import CircularProgress from 'material-ui/CircularProgress';
import './Body.css';

// Redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Header from './Header/Header.js';

class Body extends Component {
  onClickStore(store) {
    browserHistory.push(`/store/${store.id}`); // Go to StoreProducts
  }
  
  render() {
    const { storeList, cousineList, loading } = this.props;

    return (
      <div className="body">
        <Header />

        {
          loading ? (
            <CircularProgress />
          ) : (
              <List>
                <Subheader>Stores</Subheader>
                {
                  storeList && cousineList && cousineList.length > 0 && storeList.map(store => (
                    <ListItem
                      key={store.id}
                      primaryText={store.name}
                      secondaryText={`${cousineList.filter(item => item.id === store.cousineId)[0].name} | ${store.address}`}
                      onClick={() => this.onClickStore(store)}
                    />
                  ))
                }
              </List>
            )
        }

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

export default connect(mapStateToProps, mapDispatchToProps)(Body);

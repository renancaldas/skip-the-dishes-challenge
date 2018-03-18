import React, { Component } from 'react';
import { List, ListItem } from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Checkbox from 'material-ui/Checkbox';
import './Sidemenu.css';

// Redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  getStoresByCousineId
} from '../../../Redux/Actions/Store';

class Sidemenu extends Component {
  state = {
    selectedCousines: []
  }

  selectCousine(cousine, checked) {
    let { selectedCousines } = this.state;
    const { getStoresByCousineId } = this.props;
    
    // Clear all (could be a radiobutton)
    selectedCousines = [];

    if (checked) {
      selectedCousines.push(cousine);
    } else {
      selectedCousines = selectedCousines.filter(item => item.id !== cousine.id);
    }


    if(selectedCousines && selectedCousines.length == 1)
      getStoresByCousineId(selectedCousines[0].id);
    
    this.setState({ selectedCousines });
  }


  render() {
    const { cousineList } = this.props;
    const { selectedCousines } = this.state;

    return (
      <div className="sidemenu">
        <List>
          <Subheader>Cousine</Subheader>
          {
            cousineList && cousineList.map(cousine => (
              <ListItem
                leftIcon={
                  <Checkbox
                    checked={selectedCousines && selectedCousines.filter(item => item.id === cousine.id).length > 0}
                    onCheck={(ev, checked) => this.selectCousine(cousine, checked)}
                  />
                }
                key={cousine.id}
                primaryText={cousine.name}
                // secondaryText={group.users.map(user => user.name).join(', ')}
              />
            ))
          }
        </List>
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
    getStoresByCousineId: bindActionCreators(getStoresByCousineId, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Sidemenu);

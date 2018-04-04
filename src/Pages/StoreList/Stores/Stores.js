import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { uniqBy } from 'lodash';
import { List as ListMui, ListItem } from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import CircularProgress from 'material-ui/CircularProgress';
import Divider from 'material-ui/Divider';

// Local Dependencies
import './Stores.css';
import FilterBar from './FilterBar/FilterBar';

class Stores extends Component {
  state = {
    storeFilter: '',
    selectedCousineIds: null
  };

  shouldComponentUpdate() {
    const { storeList, cousineList } = this.props;
    const hasStores = storeList && storeList.length > 0;
    const hasCousines = cousineList && cousineList.length > 0;

    return hasStores && hasCousines;
  }

  onClickStore(store) {
    browserHistory.push(`/store/${store.id}`); // Go to StoreProducts
  }

  getFilteredStores() {
    const { storeFilter } = this.state;
    const { storeList } = this.props;

    return storeList.filter(store => storeFilter === '' || (store.name.toLowerCase().indexOf(storeFilter.toLowerCase()) !== -1 ))
  }

  getAvailableCousines() {
    const { selectedCousineIds } = this.state;
    const { cousineList, loading } = this.props;
    
    // Get cousines from stores
    let cousines = this.getFilteredStores().map(store => {
      return {
        id: store.cousineId,
        name: cousineList.filter(item => item.id === store.cousineId)[0].name
      }
    });

    // Get filtered cousines
    if (selectedCousineIds && selectedCousineIds.length > 0)
      cousines = cousines.filter(cousine => selectedCousineIds.indexOf(cousine.id) !== -1)

    // Map by id
    return uniqBy(cousines, 'id');
  }

  render() {
    const { storeFilter, selectedCousineIds } = this.state;
    const { storeList, cousineList, loading } = this.props;

    const cousineCategories = this.getAvailableCousines();

    return (
      loading ? (
        <CircularProgress />
      ) : (
          <div>
            <FilterBar
              cousineList={cousineList}
              storeFilter={storeFilter}
              onChangeFilter={(filter) => this.setState({ storeFilter: filter })}
              onSelectCousines={(cousines) => this.setState({ selectedCousineIds: cousines })}
              selectedCousineIds={selectedCousineIds}
            />

            <div className="list">
              <ListMui>
                {
                  cousineCategories.map(cousine => {
                    return (
                      <div key={cousine.id}>
                        <Subheader >{cousine.name}</Subheader>
                        <Divider />
                        {
                          this.getFilteredStores()
                            .filter(store => store.cousineId === cousine.id)
                            .map(store => (
                            <ListItem
                              key={store.id}
                              primaryText={store.name}
                              secondaryText={store.address}
                              onClick={() => this.onClickStore(store)}
                            />
                          ))
                        }
                      </div>
                    )
                  })
                }
              </ListMui>
            </div>
          </div>
        )
    );
  }
}

export default Stores;

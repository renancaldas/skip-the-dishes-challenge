import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { uniqBy } from 'lodash';
import { List as ListMui, ListItem } from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import CircularProgress from 'material-ui/CircularProgress';
import Divider from 'material-ui/Divider';
import AppBar from 'material-ui/AppBar';
import TextField from 'material-ui/TextField';
import IconSearch from 'material-ui/svg-icons/action/search';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import ContentFilter from 'material-ui/svg-icons/content/filter-list';
import MenuItem from 'material-ui/MenuItem';

// Local Dependencies
import './FilterBar.css';

export default (props) => <AppBar
  style={{ backgroundColor: '#EEEEEE' }}
  iconElementLeft={
    <div className="filter">
      <IconSearch
        className="filter-icon"
      />
      <TextField
        hintText={props.storeFilter === '' ? 'Filter' : ''}
        inputStyle={{ color: 'black' }}
        underlineFocusStyle={{ borderColor: 'lightgrey' }}
        value={props.storeFilter}
        onChange={(e) => props.onChangeFilter(e.target.value)}
      />
    </div>
  }
  iconElementRight={
    <div className="filter-cousine">
      <IconMenu
        multiple={true}
        iconButtonElement={<div>
          <label>
          {
            !props.selectedCousineIds || props.selectedCousineIds.length === 0 ? 'Cousines' : (
              props.selectedCousineIds.map(cousineId => props.cousineList.filter(cousine => cousine.id === cousineId)[0].name).join(', ')
            )
          }
          </label>
          <IconButton><ContentFilter /></IconButton>
        </div>}
        iconStyle={{ color: 'black' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
        targetOrigin={{ horizontal: 'right', vertical: 'top' }}
        onChange={(event, cousines) => props.onSelectCousines( cousines )}
        value={props.selectedCousineIds}
      >
        { props.cousineList.map(cousine => <MenuItem key={cousine.id} value={cousine.id} primaryText={cousine.name} />)}
      </IconMenu>
    </div>
  }
/>;

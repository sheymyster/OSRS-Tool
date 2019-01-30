import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import './navigation.css';

import {navigateToScreen} from './navigationMenuActions';

class NavigationMenu extends Component {

   render() {
     return (
       <div className="Navigation-Component">
          <div
            className="Navigation-Button-Div"
            onClick={() => this.props.navigateToScreen({currentscreen: 'dps'})}>DPS
          </div>
          <div
            className="Navigation-Button-Div"
            onClick={() => this.props.navigateToScreen({currentscreen: 'compare'})}>Compare
          </div>
          <div
            className="Navigation-Button-Div"
            onClick={() => console.log('about')}>About
          </div>
          <div
            className="Navigation-Button-Div"
            onClick={() => console.log('settings')}>Settings
          </div>
       </div>
     );
   }
};

function mapStateToProps(state) {
  return {

  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({
    navigateToScreen: navigateToScreen
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(NavigationMenu);

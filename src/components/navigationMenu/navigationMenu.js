import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import './navigation.css';

class NavigationMenu extends Component {

   render() {
     return (
       <div className="Navigation-Component">
          <div
            className="Navigation-Button-Div"
            onClick={() => console.log('dps')}>DPS
          </div>
          <div
            className="Navigation-Button-Div"
            onClick={() => console.log('compare')}>Compare
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

  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(NavigationMenu);

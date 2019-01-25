import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

class NavigationMenu extends Component {

   render() {
     return (
       <div className="Main-Menu">
          <button className="Navigation-Button">DPS</button>
          <button className="Navigation-Button">Compare</button>
          <button className="Navigation-Button">About</button>
          <button className="Navigation-Button">Settings</button>
       </div>
     );
   }
};

function mapStateToProps(state) {
  return{

  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({

  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(NavigationMenu);

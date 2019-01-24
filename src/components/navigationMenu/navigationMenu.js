import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

class NavigationMenu extends Component {

   render() {
     return (
       <div className="Main-Menu">
          <button>DPS</button>
          <button>Compare</button>
          <button>About</button>
          <button>Settings</button>
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

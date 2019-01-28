import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import './navigation.css';

class NavigationMenu extends Component {

   render() {
     return (
       <div className="Navigation-Component">
          
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

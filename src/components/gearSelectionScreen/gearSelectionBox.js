import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {changePlayerGear} from './gearSelectionActions';

import Select from 'select-react-redux';

class GearSelectionBox extends Component {

   render() {
     return (
       <div>
          
       </div>
     );
   }
};

function mapStateToProps(state) {
  return{
    playerGear: state.playerGear
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({
    changePlayerGear: changePlayerGear
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(GearSelectionBox);

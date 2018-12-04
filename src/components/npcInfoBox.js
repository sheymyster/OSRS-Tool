import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

class NPCInfoBox extends Component {

   render() {
     return (
       <div>
       </div>
     );
   }
};

function mapStateToProps(state) {
  return{}
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(NPCInfoBox);

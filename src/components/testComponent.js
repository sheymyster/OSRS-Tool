import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {changeColor} from '../actions/testAction';

class ColorChanger extends Component {

   render() {
     return (
       <div>
          <button onClick={() => this.props.changeColor()}>Change Color</button>
          Your chosen color is: {this.props.chosenColor}
       </div>
     );
   }
};

function mapStateToProps(state) {
  return{
    chosenColor: state.chosenColor
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({changeColor: changeColor}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ColorChanger);

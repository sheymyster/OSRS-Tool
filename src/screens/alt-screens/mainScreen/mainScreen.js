import React, { Component } from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import DPSscreen from '../DPSscreen/DPSscreen.js';
import CompareScreen from '../compareScreen/compareScreen.js';
import './mainScreen.css';


class MainScreen extends Component {

  showScreen() {
    if (this.props.navigation.currentscreen === 'dps') {
      return (<DPSscreen />);
    } else if (this.props.navigation.currentscreen === 'compare') {
      return (<CompareScreen />);
    }
  }

  render() {
    return (<div className="Main-Screen">{this.showScreen()}</div>);
  }
}

function mapStateToProps(state) {
  return {
    navigation: state.navigation,
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(MainScreen);

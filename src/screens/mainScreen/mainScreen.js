import React, { Component } from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import DPSscreen from '../DPSscreen/DPSscreen.js';
import './mainScreen.css';


class MainScreen extends Component {

  showScreen() {
    if (this.props.navigation.currentscreen === 'dps') {
      return <DPSscreen />
    }
  }

  render() {
    return (this.showScreen());
  }
}

function mapStateToProps(state) {
  return{
    navigation: state.navigation,
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(MainScreen);

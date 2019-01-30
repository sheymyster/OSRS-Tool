import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Popup} from 'semantic-ui-react';
import './comparisonList.css';
import allEquipmentData from '../../JSONraw/allEquipmentData.json';
import Image from 'react-image-resizer';




class ComparisonList extends Component {
  render() {
    return (
      <div>TEST</div>
    )
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

export default connect(mapStateToProps, mapDispatchToProps)(ComparisonList);

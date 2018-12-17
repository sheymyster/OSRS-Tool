import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {changePlayerGear} from './gearSelectionActions';
import Select from 'select-react-redux';
import allEquipmentData from '../../JSONraw/allEquipmentData.json';

class GearSelectionBox extends Component {

  findEquipmentNames (slot) {
    let listOfNames = {};
    Object.entries(allEquipmentData[slot]).forEach(entry => {
      listOfNames[entry[0]] = decodeURIComponent(entry[0]);
    });
    return listOfNames;
  }

   render() {
     console.log(this.findEquipmentNames('head'));
     return (
       <div>
       <Select name='Head' simpleValue controlShouldRenderValue={true} onChange={(value) => this.props.changePlayerGear('head', value)} items={this.findEquipmentNames('head')}/>
       {this.props.playerGear.head}
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

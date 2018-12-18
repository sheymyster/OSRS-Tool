import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {changePlayerGear} from './gearSelectionActions';
import Select from 'select-react-redux';
import {Dropdown} from 'semantic-ui-react';
import allEquipmentData from '../../JSONraw/allEquipmentData.json';

class GearSelectionBox extends Component {

  findEquipmentNames (slot) {
    let listOfNames = [];
    let i=0;
    Object.entries(allEquipmentData[slot]).forEach(entry => {
      let equipmentObject = {};
      equipmentObject.key = i;
      equipmentObject.value = entry[0];
      equipmentObject.text = entry[0];
      listOfNames.push(equipmentObject);
      i++;
    });
    return listOfNames;
  }

   render() {
     const {value} = '';
     return (
       <div>
        <Dropdown
        placeholder='Select Monster'
        value={value}
        onChange={(e, {value}) => this.props.changePlayerGear('head', {value})}
        fluid
        search
        selection
        options={this.findEquipmentNames('head')} />
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

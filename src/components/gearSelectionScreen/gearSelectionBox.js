import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {changePlayerGear, changeAttackStyle, changeAttackStance} from './gearSelectionActions';
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
  };

  generateEquipmentSearchboxes() {
    let slotNames = ['head', 'neck', 'chest', 'leg', 'feet', 'cape', 'ammo', 'weapon', 'shield', 'hand', 'ring'];
    let dropdownBoxes = [];
    for (let i=0; i<slotNames.length; i++) {
      let placeholderText = slotNames[i];
      let {value} = {value: this.props.playerGear[slotNames[i]]};
      dropdownBoxes.push(
        <div>
          {placeholderText + ': '}
          <Dropdown
          placeholder={placeholderText}
          value={value}
          onChange={(e, {value}) => this.props.changePlayerGear(slotNames[i], {value})}
          fluid
          search
          selection
          options={this.findEquipmentNames(slotNames[i])} />
        </div>
      )
    }
    return dropdownBoxes
  };

   render() {
     let dropdowns = this.generateEquipmentSearchboxes();
     let attackStanceOptions = [{key: 'agg', value: 'aggressive', text: 'aggressive'},
                               {key: 'acc', value: 'accurate', text: 'accurate'},
                               {key: 'def', value: 'defensive', text: 'defensive'},
                               {key: 'con', value: 'controlled', text: 'controlled'}]
     let attackStyleOptions = [{key: 'stab', value: 'stab', text: 'stab'},
                               {key: 'slash', value: 'slash', text: 'slash'},
                               {key: 'crush', value: 'crush', text: 'crush'}];
     return (
       <div>
          <div>{dropdowns}</div>
          <div>Attack Stance: <Dropdown
          value={this.props.playerGear.attackstance}
          onChange={(e, data) => this.props.changeAttackStance(data.value)}
          fluid
          selection
          options={attackStanceOptions} />
          </div>
          <div>Attack Style: <Dropdown
          value={this.props.playerGear.attackstyle}
          onChange={(e, data) => this.props.changeAttackStyle(data.value)}
          fluid
          selection
          options={attackStyleOptions} />
          </div>
      </div>
     )
   }
};

function mapStateToProps(state) {
  return{
    playerGear: state.playerGear
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({
    changePlayerGear: changePlayerGear,
    changeAttackStyle: changeAttackStyle,
    changeAttackStance: changeAttackStance
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(GearSelectionBox);

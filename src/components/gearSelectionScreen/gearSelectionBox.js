import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {changePlayerGear, changeAttackStyle, changeAttackType} from './gearSelectionActions';
import {Dropdown} from 'semantic-ui-react';
import './gear.css';
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

  highlightEquipmentRow(slot) {
    if (this.props.lockStatus.locked === true) {
      if (this.props.playerGear[slot] === this.props.lockStatus.lockedSelections.playerGear[slot]) {
        return {
          backgroundColor: 'rgba(90, 90, 90, 0.8)'
        }
      } else {
        return {
          backgroundColor: 'green'
        }
      }
    }
  };

  highlightAttackOption(name, style, type) {
    if (this.props.lockStatus.locked === true) {
      if (this.props.playerGear.attackstyle === style === this.props.lockStatus.lockedSelections.playerGear.attackstyle
        && this.props.playerGear.attacktype === type === this.props.lockStatus.lockedSelections.playerGear.attacktype) {
        return {
            backgroundColor: 'rgba(90, 90, 90, 0.8)'
          }
      } else if (this.props.playerGear.attackstyle === style !== this.props.lockStatus.lockedSelections.playerGear.attackstyle
        || this.props.playerGear.attacktype === type !== this.props.lockStatus.lockedSelections.playerGear.attacktype) {
        return {
          backgroundColor:
        }
      }
    }
  }


  getGearObject(slot, value) {
    let gearObject = {};
    gearObject[slot] = value;
    return gearObject;
  };

  changeStyleAndStance(selectedAttackObject) {
    if (this.props.playerGear.style !== selectedAttackObject.style) {
      this.props.changeAttackStyle({attackstyle: selectedAttackObject.style})
    };
    if (this.props.playerGear.type !== selectedAttackObject.type) {
      this.props.changeAttackType({attacktype: selectedAttackObject.type})
    };
  };

  generateEquipmentSearchboxes() {
    let slotNames = ['head', 'neck', 'chest', 'leg', 'feet', 'cape', 'ammo', 'weapon', 'shield', 'hand', 'ring'];
    let dropdownBoxes = [];
    for (let i=0; i<slotNames.length; i++) {
      let placeholderText = slotNames[i];
      let {value} = {value: this.props.playerGear[slotNames[i]]};
      dropdownBoxes.push(
        <div className="Equipment-Selection-Row" style={this.highlightEquipmentRow(slotNames[i])}>
          <Dropdown
          placeholder={placeholderText}
          value={value}
          onChange={(e, {value}) => this.props.changePlayerGear(this.getGearObject(slotNames[i], {value}.value))}
          fluid
          clearable
          search
          selection
          options={this.findEquipmentNames(slotNames[i])} />
        </div>
      )
    };
    let attackStanceOptions = [{key: 'agg', value: 'aggressive', text: 'aggressive'},
                              {key: 'acc', value: 'accurate', text: 'accurate'},
                              {key: 'def', value: 'defensive', text: 'defensive'},
                              {key: 'con', value: 'controlled', text: 'controlled'}]
    let attackStyleOptions = [{key: 'stab', value: 'stab', text: 'stab'},
                              {key: 'slash', value: 'slash', text: 'slash'},
                              {key: 'crush', value: 'crush', text: 'crush'}];
    dropdownBoxes.push(
      <div className="Equipment-Selection-Row" style={this.highlightEquipmentRow('attackstyle')}>
        <Dropdown
        value={this.props.playerGear.attackstyle}
        onChange={(e, data) => this.props.changeAttackStyle({attackstyle: data.value})}
        fluid
        selection
        options={attackStanceOptions}
        />
      </div>);
    dropdownBoxes.push(
      <div className="Equipment-Selection-Row" style={this.highlightEquipmentRow('attacktype')}>
        <Dropdown
        value={this.props.playerGear.attacktype}
        onChange={(e, data) => this.props.changeAttackType({attacktype: data.value})}
        fluid
        selection
        options={attackStyleOptions} />
      </div>);
    return dropdownBoxes
  };

  generateAttackOptions() {
    let buttons = [];
    if (this.props.playerGear.weapon !== '') {
      let attackOptions = allEquipmentData.weapon[this.props.playerGear.weapon].attackoptions
      let i;
      let n = Object.keys(attackOptions).length;
      for (i=0; i<n; i++) {
        let name = attackOptions[i+1].name;
        let style = attackOptions[i+1].style;
        let type = attackOptions[i+1].type;
        buttons.push(
          <div className="Attack-Style-Option" style={this.highlightAttackOption(name, style, type)}><span className="Attack-Style-Name" title={style} onClick={() => this.changeStyleAndStance(attackOptions[i+1])}>{name}</span></div>
        )
      }
    } else {
      buttons.push(<div className="Attack-Style-Option"><span className="Attack-Style-Name" title="Aggressive">Punch</span></div>);
      buttons.push(<div className="Attack-Style-Option"><span className="Attack-Style-Name" title="Accurate">Kick</span></div>);
      buttons.push(<div className="Attack-Style-Option"><span className="Attack-Style-Name" title="Defensive">Block</span></div>);
    }
    return buttons;
  };

   render() {
     return (
       <div className="Gear-Selection-Screen">
          <div className="Equipment-Selection-Dropdowns">
            {this.generateEquipmentSearchboxes()}
          </div>
          <div className="Equipment-And-Attack-Styles">
            <div className="Full-Equipment-Image-Div">
            </div>
            <div className="Attack-Style-Choices">
              {this.generateAttackOptions()}
            </div>
          </div>
      </div>
     )
   }
};

function mapStateToProps(state) {
  return{
    playerGear: state.playerGear,
    lockStatus: state.lockStatus
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({
    changePlayerGear: changePlayerGear,
    changeAttackStyle: changeAttackStyle,
    changeAttackType: changeAttackType
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(GearSelectionBox);

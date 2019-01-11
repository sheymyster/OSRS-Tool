import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {changePlayerGear} from './gearSelectionActions';
import {Dropdown} from 'semantic-ui-react';
import './gear.css';
import allEquipmentData from '../../JSONraw/allEquipmentData.json';

var unarmedOptions = {
  "1": {
    "name": "Punch",
    "style": "Accurate",
    "icon": "unarmed_punch_icon",
    "type": "Crush"
  },
  "2": {
    "name": "Kick",
    "style": "Aggressive",
    "icon": "unarmed_kick_icon",
    "type": "Crush"
  },
  "3": {
    "name": "Block",
    "style": "Defensive",
    "icon": "unarmed_block_icon",
    "type": "Crush"
  }
};


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

  highlightAttackOption(attackObject, attackNumber) {
    let chosenAttack;
    if (this.props.playerGear.weapon !== '') {
      chosenAttack = allEquipmentData.weapon[this.props.playerGear.weapon].attackoptions[this.props.playerGear.chosenattack];
    } else {
      chosenAttack = Object.assign({}, unarmedOptions);
    }
    if (this.props.lockStatus.locked === true) {
      let lockedAttack = allEquipmentData.weapon[this.props.lockStatus.lockedSelections.playerGear.weapon].attackoptions[attackNumber];
      if (lockedAttack === chosenAttack === attackObject) {
        return {
          backgroundColor: 'rgba(90, 90, 90, 0.8)',
          cursor: "pointer"
        }
      } else if (chosenAttack === attackObject &&
                 chosenAttack !== lockedAttack) {
        return {
          backgroundColor: 'rgba(139, 0, 0, 0.5)',
          cursor: "pointer"
        }
      } else {
        return {
          backgroundColor: 'rgba(100, 100, 100, 0.5)',
          cursor: "pointer"
        }
      }
    } else {
      if (this.props.playerGear.chosenattack === attackNumber) {
        return {
          backgroundColor: 'rgba(139, 0, 0, 0.5)',
          cursor: "pointer"
        }
      } else {
        return {
          backgroundColor: 'rgba(100, 100, 100, 0.5)',
          cursor: "pointer"
        }
      }
    }
  }

  determineCombatType() {
    let combatType;
    if (this.props.playerGear.weapon !== '') {
      combatType = allEquipmentData.weapon[this.props.playerGear.weapon].combattype;
    } else {
      combatType = 'melee'
    }
    return combatType;
  }

  getXpType() {
    let xpTypeObject;
    let combatType = this.determineCombatType();
    if (combatType === 'melee') {
        xpTypeObject = {
          Aggressive: 'Strength XP',
          Accurate: 'Attack XP',
          Controlled: 'Shared XP',
          Defensive: 'Defense XP'
        }
    } else if (combatType === 'ranged') {
      xpTypeObject = {
        Accurate: 'Ranged XP',
        Rapid: 'Ranged XP',
        Longrange: 'Shared XP'
      }
    } else {
      xpTypeObject = {
        Accurate: 'Magic XP',
        Defensive: 'Shared XP'
      }
    }
    return xpTypeObject;
  }

  getGearObject(slot, value) {
    let gearObject = {};
    gearObject[slot] = value;
    return gearObject;
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
    return dropdownBoxes
  };

  generateAttackOptions() {
    let buttons = [];
    if (this.props.playerGear.weapon !== '') {
      let attackOptions = allEquipmentData.weapon[this.props.playerGear.weapon].attackoptions
      let i;
      let n = Object.keys(attackOptions).length;
      for (i=0; i<n; i++) {
        let xptypes = this.getXpType();
        let tooltip = attackOptions[i+1].style + "&#10;" + attackOptions[i+1].type + "&#10;" + xptypes[attackOptions[i+1].style];
        let attackNumber = i+1;
        console.log(tooltip);
        buttons.push(
          <div title={tooltip}onClick={() => this.props.changePlayerGear({chosenattack: attackNumber})} className="Attack-Style-Option" style={this.highlightAttackOption(attackOptions[i+1], i+1)}><span className="Attack-Style-Name">{attackOptions[i+1].name}</span></div>
        )
      }
    } else {
      buttons.push(<div title="Aggressive&#10;Crush&#10;Strength XP" onClick={() => this.props.changePlayerGear({chosenattack: 1})} className="Attack-Style-Option" style={this.highlightAttackOption(unarmedOptions[1], 1)}><span className="Attack-Style-Name" title="Aggressive">Punch</span></div>);
      buttons.push(<div title="Accurate&#10;Crush&#10;Attack XP" onClick={() => this.props.changePlayerGear({chosenattack: 2})} className="Attack-Style-Option" style={this.highlightAttackOption(unarmedOptions[2], 2)}><span className="Attack-Style-Name" title="Accurate">Kick</span></div>);
      buttons.push(<div title="Defensive&#10;Crush&#10;Defense XP" onClick={() => this.props.changePlayerGear({chosenattack: 3})} className="Attack-Style-Option" style={this.highlightAttackOption(unarmedOptions[3], 3)}><span className="Attack-Style-Name" title="Defensive">Block</span></div>);
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
    changePlayerGear: changePlayerGear
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(GearSelectionBox);

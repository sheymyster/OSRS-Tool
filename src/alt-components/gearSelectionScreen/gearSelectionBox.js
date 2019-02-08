import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {changePlayerGear, changeSpell} from './gearSelectionActions';
import {Dropdown, Popup} from 'semantic-ui-react';
import './gear.css';
import allEquipmentData from '../../JSONraw/allEquipmentData.json';
import Image from 'react-image-resizer';
import magicSpellList from '../../JSONraw/magicSpellList.json';



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
    let chosenAttack = allEquipmentData.weapon[this.props.playerGear.weapon].attackoptions[this.props.playerGear.chosenattack];
    if (this.props.lockStatus.locked === true) {
      let lockedAttack = allEquipmentData.weapon[this.props.lockStatus.lockedSelections.playerGear.weapon].attackoptions[this.props.lockStatus.lockedSelections.playerGear.chosenattack];
      if (lockedAttack === attackObject) {
        return {
          backgroundColor: 'grey',
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

  highlightSpell(spellname) {
    if (this.props.playerMagic.chosenspell === spellname) {
      return {
        opacity: 1,
        cursor: "pointer",
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        borderRadius: '50%'
      }
    } else {
      return {
        opacity: 0.4,
        cursor: "pointer"
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

  handleWeaponChange(weaponObject) {
    this.props.changePlayerGear({chosenattack: 1});
    this.props.changePlayerGear(weaponObject);
    if (weaponObject.weapon === "Trident of the seas") {
      this.props.changeSpell({chosenspell: "tridentoftheseas"});
    } else if (weaponObject.weapon === "Trident of the swamp") {
      this.props.changeSpell({chosenspell: "tridentoftheswamp"});
    } else if (weaponObject.weapon === "Sanguinesti staff") {
      this.props.changeSpell({chosenspell: "sanguinestistaff"});
    } else if (this.props.playerMagic.chosenspell === "sanguinestistaff" ||
               this.props.playerMagic.chosenspell === "tridentoftheseas" ||
               this.props.playerMagic.chosenspell === "tridentoftheswamp") {
                 this.props.changeSpell({chosenspell: ""});
               }
  }

  handleSpellClick(spellObject) {
    if (spellObject.chosenspell === this.props.playerMagic.chosenspell) {
      this.props.changeSpell({chosenspell: ''});
    } else {
      this.props.changeSpell(spellObject);
    }
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

  getAttackName() {
    let name;
    if (this.props.playerMagic.chosenspell !== "") {
      name = magicSpellList[this.props.playerMagic.chosenspell].name;
    } else {
      name = this.props.playerGear.weapon;
    }
    return name;
  }

  generateEquipmentSearchboxes() {
    let slotNames = ['head', 'neck', 'chest', 'leg', 'feet', 'cape', 'ammo', 'shield', 'hand', 'ring'];
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
    }
    let {value} = {value: this.props.playerGear['weapon']};
    dropdownBoxes.splice(4, 0,
      <div className="Equipment-Selection-Row" style={this.highlightEquipmentRow('weapon')}>
        <Dropdown
        value={value}
        onChange={(e, {value}) => this.handleWeaponChange(this.getGearObject('weapon', {value}.value))}
        fluid
        search
        selection
        options={this.findEquipmentNames('weapon')} />
      </div>
    );
    return dropdownBoxes
  };

  generateAttackOptions() {
    let buttons = [];
    let attackOptions = allEquipmentData.weapon[this.props.playerGear.weapon].attackoptions
    let i;
    let n = Object.keys(attackOptions).length;
    for (i=0; i<n; i++) {
      let xptypes = this.getXpType();
      let attackNumber = i+1;
      buttons.push(
        <Popup
          content={<div className='Attack-Options-Popup'><span>{attackOptions[i+1].style}</span><span>{attackOptions[i+1].type}</span><span>{xptypes[attackOptions[i+1].style]}</span></div>}
          trigger={<div onClick={() => this.props.changePlayerGear({chosenattack: attackNumber})} className="Attack-Style-Option" style={this.highlightAttackOption(attackOptions[i+1], i+1)}><span className="Attack-Style-Name">{attackOptions[i+1].name}</span></div>}
          on='hover'
          position='bottom left'
        />
      )
    }
  return buttons;
  };

  generateSpells() {
    let spells = [];
    let allSpells = Object.keys(magicSpellList);
    allSpells.splice(allSpells.length-3, 3);
    let i;
    let n = allSpells.length;
    for (i=0; i<n; i++) {
      let spellName = magicSpellList[allSpells[i]].name.toLowerCase();
      let spellNameFormatted = spellName.split(" ").join("_");
      let spellObject = {chosenspell: allSpells[i]};
      spells.push(
        <div className="Magic-Spell"
          style={this.highlightSpell(allSpells[i])}
          title={spellName}
          onClick={() => this.handleSpellClick(spellObject)}>
          <Image
            src={require('../../assets/'+spellNameFormatted+'_icon.png')}
            height={25} width={25} />
        </div>
      )
    }
    return spells;
  };

   render() {
     return (
       <div className="Gear-Selection-Screen">
          <div className="Equipment-Selection-Dropdowns">
            {this.generateEquipmentSearchboxes()}
          </div>
          <div className="Equipment-And-Attack-Styles">
            <div className="Magic-Spell-Choices">
              {this.generateSpells()}
            </div>
            <div className="Attack-Style-Choices">
              <span className="Attack-Name">{this.getAttackName()}</span>
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
    lockStatus: state.lockStatus,
    playerMagic: state.playerMagic
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({
    changePlayerGear: changePlayerGear,
    changeSpell: changeSpell
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(GearSelectionBox);

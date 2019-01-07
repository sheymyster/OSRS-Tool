import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Popup} from 'semantic-ui-react';
import allEquipmentData from '../../JSONraw/allEquipmentData.json';
import allMonsterData from '../../JSONraw/allNPCdata.json';
import Image from 'react-image-resizer';
import {toggleLock, lockAllSelections} from './outputInformationActions';
import {changePrayer, changePotion} from '../boostSelectionScreen/boostSelectionActions';
import {changePlayerGear} from '../gearSelectionScreen/gearSelectionActions';
import {changeMonster, changeMonsterVersion} from '../npcInfoScreen/npcInfoActions';
import {changePlayerStat} from '../playerStatScreen/playerStatActions';
import './output.css';
import math from 'mathjs';

//var math = require('mathjs');

math.config({
    number: "BigNumber",
    precision: 200
});

class OutputInformationBox extends Component {

  calculateBonusLevels(statName) {
    let addedLevels;
    if (statName === 'strength') {
      if (this.props.activePotions.superstrength || this.props.activePotions.supercombat) {
        addedLevels = 5 + Math.floor(this.props.playerStats.strength*0.15)
      } else if (this.props.activePotions.strength || this.props.activePotions.combat) {
        addedLevels = 3 + Math.floor(this.props.playerStats.strength*0.10)
      } else {
        addedLevels = 0
      }
    } else if (statName === 'attack') {
      if (this.props.activePotions.superattack || this.props.activePotions.supercombat) {
        addedLevels = 5 + Math.floor(this.props.playerStats.attack*0.15)
      } else if (this.props.activePotions.attack || this.props.activePotions.combat) {
        addedLevels = 3 + Math.floor(this.props.playerStats.attack*0.10)
      } else {
        addedLevels = 0
      }
    } else if (statName === 'range') {
      if (this.props.activePotions.ranging) {
        addedLevels = 4 + Math.floor(this.props.playerStats.range*0.10)
      } else {
        addedLevels = 0
      }
    } else if (statName === 'magic') {
      if (this.props.activePotions.magic) {
        addedLevels = 4
      } else {
        addedLevels = 0
      }
    };
    return addedLevels
  }

  calculatePrayerBonuses(statName) {
    let multiplier;
    if (statName === 'strength') {
      if (this.props.activePrayers.piety) {
        multiplier = 1.23
      } else if (this.props.activePrayers.chivalry) {
        multiplier = 1.18
      } else if (this.props.activePrayers.ultimatestrength) {
        multiplier = 1.15
      } else if (this.props.activePrayers.superhumanstrength) {
        multiplier = 1.1
      } else if (this.props.activePrayers.burstofstrength) {
        multiplier = 1.05
      } else {
        multiplier = 1
      }
    } else if (statName === 'attack') {
      if (this.props.activePrayers.piety) {
        multiplier = 1.20
      } else if (this.props.activePrayers.chivalry) {
        multiplier = 1.15
      } else if (this.props.activePrayers.incrediblereflexes) {
        multiplier = 1.15
      } else if (this.props.activePrayers.improvedreflexes) {
        multiplier = 1.1
      } else if (this.props.activePrayers.clarityofthought) {
        multiplier = 1.05
      } else {
        multiplier = 1
      }
    } else if (statName === 'range') {
      if (this.props.activePrayers.rigour) {
        multiplier = 1.20
      } else if (this.props.activePrayers.eagleeye) {
        multiplier = 1.15
      } else if (this.props.activePrayers.hawkeye) {
        multiplier = 1.10
      } else if (this.props.activePrayers.sharpeye) {
        multiplier = 1.05
      } else {
        multiplier = 1
      }
    } else if (statName === 'magic') {
      if (this.props.activePrayers.augury) {
        multiplier = 1.25
      } else if (this.props.activePrayers.mysticmight) {
        multiplier = 1.15
      } else if (this.props.activePrayers.mysticlore) {
        multiplier = 1.1
      } else if (this.props.activePrayers.mysticwill) {
        multiplier = 1.05
      } else {
        multiplier = 1
      }
    }
    return multiplier;
  }

  calculateEffectiveStrength(strPotionBonus, strPrayerBonus) {
    let effectiveStrengthLevel;
    let otherBonus = 1;
    let stanceBonus;
    if (this.props.playerGear.attackstance === 'aggressive') {
      stanceBonus = 3
    } else if (this.props.playerGear.attackstance === 'controlled') {
      stanceBonus = 1
    } else {
      stanceBonus = 0
    }
    effectiveStrengthLevel = Math.floor((+this.props.playerStats.strength + strPotionBonus)*strPrayerBonus*otherBonus)+stanceBonus;
    return effectiveStrengthLevel;
  }

  calculateEffectiveAttack() {
    let effectiveAttackLevel;
    let potionBonus = this.calculateBonusLevels('attack');
    let prayerBonus = this.calculatePrayerBonuses('attack');
    let otherBonus = 1;
    let stanceBonus;
    if (this.props.playerGear.attackstance === 'accurate') {
      stanceBonus = 3
    } else if (this.props.playerGear.attackstance === 'controlled') {
      stanceBonus = 1
    } else {
      stanceBonus = 0
    }
    effectiveAttackLevel = Math.floor((+this.props.playerStats.attack + potionBonus)*prayerBonus*otherBonus)+stanceBonus;
    return effectiveAttackLevel;
  }

  calculateMaxAttackRoll() {
    let effectiveLevel = this.calculateEffectiveAttack();
    let equipmentBonus = this.calculatePlayerStat(this.props.playerGear.attackstyle+'att');
    let maxAttackRoll = effectiveLevel*(equipmentBonus+64);
    return maxAttackRoll;
  }

  calculateEnemyDefenseRoll() {
    let defenseStyle;
    if (this.props.playerGear.attackstyle === 'slash') {
      defenseStyle = 'dslash'
    } else if (this.props.playerGear.attackstyle === 'stab') {
      defenseStyle = 'dstab'
    } else {
      defenseStyle = 'dcrush'
    };
    let defenseLevel = (allMonsterData[this.props.chosenMonster.name].versions[this.props.chosenMonster.version][defenseStyle]);
    let maxDefenseRoll = defenseLevel*64
    return maxDefenseRoll;
  }

  calculateChanceToHit(maxAttackRoll, maxDefenseRoll) {
    let accuracy;
    if (maxAttackRoll > maxDefenseRoll) {
      accuracy = 1-(maxDefenseRoll+2)/(2+(maxAttackRoll+1));
    } else {
      accuracy = maxAttackRoll/(2+(maxDefenseRoll+1));
    }
    return accuracy;
  }

  calculatePlayerStat(statName) {
    let slotNames = Object.keys(this.props.playerGear);
    slotNames.pop();
    slotNames.pop();
    let statValue = 0;
    let i;
    for (i=0; i<slotNames.length; i++) {
      if (this.props.playerGear[slotNames[i]].length > 1) {
        let addedStat = allEquipmentData[slotNames[i]][this.props.playerGear[slotNames[i]]][statName];
        statValue += parseInt(addedStat, 10);
      }
    }
    return statValue;
  }

  calculateMaxMeleeHit(effectiveStrength, strengthBonus) {
    let baseDamage = 1.3 + (effectiveStrength/10) + (strengthBonus/80) + (effectiveStrength*strengthBonus)/640;
    let maxHit = Math.floor(baseDamage);
    return maxHit;
  }

  calculateAttackSpeed() {
    let attackspeed;
    if (this.props.playerGear.weapon !== '') {
      attackspeed = allEquipmentData.weapon[this.props.playerGear.weapon].attackspeed;
    } else {
      attackspeed = 6;
    }
    let secondsPerAttack = attackspeed*0.6;
    return secondsPerAttack;
  }

  calculateDPS(maxHit, monsterHP, accuracy, weaponAttackSpeed) {
    let useOverKill = true;
    let dps;
    let overkillDamagePerHit = this.calculateOverkillDamagePerHit(maxHit, monsterHP);
    if (useOverKill) {
      dps = (1/weaponAttackSpeed)*accuracy*(overkillDamagePerHit);
    } else {
      dps = (1/weaponAttackSpeed)*accuracy*(maxHit/2);
    }
    return dps;
  }

  calculateOverkillDamagePerHit(maxHit, hp) {
    let finalRatios = this.getFinalRatios(maxHit, hp);
    let flippedRatios = this.flipFinalRatios(finalRatios);
    let oddsArray = this.generateArrayOfOdds(finalRatios, flippedRatios, maxHit);
    let damagePerHit = this.calculateDPH(oddsArray, maxHit, hp);
    return damagePerHit;
  }

  calculateKillsPerHour(dps, monsterHP) {
    let killsPerHour = dps*3600/monsterHP;
    return killsPerHour;
  }

  getFinalRatios(maxHit, hp) {
    let finalRatios = [];
    let i;
    let firstLine = [];
    for (i=0; i<hp; i++) {
      if (i < maxHit) {
        firstLine.push(1);
      } else {
        firstLine.push(0);
      }
    }
    finalRatios.push(firstLine);
    let j;
    let n = hp-1;
    for (j=0; j<n; j++) {
      let additionalLine = [];
      let k;
      let m = finalRatios[j].length;
      for (k=0; k<m; k++) {
        if (k<=j) {
          additionalLine.push(0);
        } else if (k<maxHit) {
          let sectionToSum = finalRatios[j].slice(0, k);
          let sum = sectionToSum.reduce((a, b) => a + b, 0);
          additionalLine.push(sum);
        } else {
          let sectionToSum = finalRatios[j].slice(k-maxHit, k);
          let sum = sectionToSum.reduce((a, b) => a + b, 0);
          additionalLine.push(sum);
        }
      }
      finalRatios.push(additionalLine);
    }
    return finalRatios;
  }

  flipFinalRatios(finalRatios) {
  let i;
  let n = finalRatios.length;
  let flippedArray = [];
  for (i=0; i<n; i++) {
    let newRow = [];
    let j;
    let m = finalRatios.length;
    for (j=0; j<m; j++) {
      newRow.push(finalRatios[j][i]);
    }
    flippedArray.push(newRow);
  }
  return flippedArray;
}

  generateArrayOfOdds(finalRatios, flippedRatios, maxHit) {
  let targetRatios = flippedRatios.pop();
  let oddsArray = [];
  let counter = math.bignumber(0);
  let i;
  let n = targetRatios.length;
  for (i=0; i<n; i++) {
    let possibleOutcomes = math.pow(math.bignumber(maxHit), math.add(math.bignumber(i), math.bignumber(1)));
    let previousNumbers = finalRatios[i].splice(0, finalRatios.length-1);
    let previousSum = previousNumbers.reduce((a, b) => a + b, 0);
    let subOdd = math.subtract(math.bignumber(possibleOutcomes), math.bignumber(previousSum));
    let divOdd = math.divide(math.bignumber(subOdd), math.bignumber(possibleOutcomes));
    let newOdd = math.subtract(math.bignumber(divOdd), math.bignumber(counter));
    counter = math.add(math.bignumber(newOdd), math.bignumber(counter));
    oddsArray.push(newOdd);
  }
  return oddsArray;
}

  calculateDPH(oddsArray, maxHit, hp) {
  let sumproduct = math.bignumber(0);
  let i;
  let n = oddsArray.length;
  for (i=0; i<n; i++) {
    let addSum = math.add(math.bignumber(i), math.bignumber(1))
    let newSum = math.multiply(math.bignumber(addSum), oddsArray[i]);
    sumproduct = math.add(math.bignumber(newSum), math.bignumber(sumproduct));
  }
  let adjustForZero = math.eval((hp/sumproduct) * (1-(1/(1+maxHit))));
  return math.number(adjustForZero);
}

  calculatePlayerBonuses(strengthBonus, rangeStrengthBonus, magicDamageBonus, prayerBonus) {
    let bonuses = {};
    bonuses.astab = this.calculatePlayerStat('stabatt');
    bonuses.aslash = this.calculatePlayerStat('slashatt');
    bonuses.acrush = this.calculatePlayerStat('crushatt');
    bonuses.amagic = this.calculatePlayerStat('magicatt');
    bonuses.arange = this.calculatePlayerStat('rangeatt');
    bonuses.dstab = this.calculatePlayerStat('stabdef');
    bonuses.dslash = this.calculatePlayerStat('slashdef');
    bonuses.dcrush = this.calculatePlayerStat('crushdef');
    bonuses.dmagic = this.calculatePlayerStat('magicdef');
    bonuses.drange = this.calculatePlayerStat('rangedef');
    bonuses.strengthbonus = strengthBonus;
    bonuses.rangestrengthbonus = rangeStrengthBonus;
    bonuses.magicdamagebonus = magicDamageBonus;
    bonuses.prayerbonus = prayerBonus;
    return bonuses;
  }

  generateComparisonRow(labelName, statName, bonuses) {
    let row;
    if (this.props.lockStatus.locked === true) {
      let differenceValue = bonuses[statName] - this.props.lockStatus.lockedSelections.playerBonuses[statName];
      let showDifference = '';
      let displayColor;
      if (differenceValue !== 0)
        if (differenceValue>0) {
          displayColor = 'green';
          showDifference = '+'+differenceValue
        } else {
          displayColor = 'red';
          showDifference = differenceValue
        };
      row = <div className="Player-Stats-Row"><span style={{color: '#DA8D2D'}}>{labelName}: +{this.props.lockStatus.lockedSelections.playerBonuses[statName]}</span> <span style={{color: displayColor}}> {showDifference}</span></div>
    } else {
      row = <div className="Player-Stats-Row"><span style={{color: '#DA8D2D'}}>{labelName}: +{bonuses[statName]}</span></div>
    }
    return row;
  }

  generateCalculatedOutputRow(labelName, valueName, value, roundFactor) {
    let row;
    if (this.props.lockStatus.locked === true) {
      let differenceValue = value - this.props.lockStatus.lockedSelections.calculatedValues[valueName];
      let showDifference = '';
      let displayColor;
      if (differenceValue !== 0)
        if (differenceValue>0) {
          displayColor = 'green';
          showDifference = '+'+differenceValue.toFixed(roundFactor)
        } else {
          displayColor = 'red';
          showDifference = differenceValue.toFixed(roundFactor)
        };
      row = <div className="Calculated-Row"><span className="Calculated-Label">{labelName}: {this.props.lockStatus.lockedSelections.calculatedValues[valueName].toFixed(roundFactor)}</span> <span style={{color: displayColor}}> {showDifference}</span></div>
    } else {
      row = <div className="Calculated-Row"><span className="Calculated-Label">{labelName}: {value.toFixed(roundFactor)}</span></div>
    }
    return row;
  }

  getLockImage() {
    let imageLink;
    if (this.props.lockStatus.locked === false) {
      imageLink = require('../../assets/lock_off.png');
    } else {
      imageLink = require('../../assets/lock_on.png');
    }
    return imageLink
  }

  handleLockActivate(playerBonuses, calculatedValues) {
    if (this.props.lockStatus.locked === false) {
      let allSelections = {};
      allSelections.prayers = Object.assign({}, this.props.activePrayers);
      allSelections.potions = Object.assign({}, this.props.activePotions);
      allSelections.playerStats = Object.assign({}, this.props.playerStats);
      allSelections.chosenMonster = JSON.parse(JSON.stringify(this.props.chosenMonster));
      allSelections.playerGear = JSON.parse(JSON.stringify(this.props.playerGear));
      allSelections.playerBonuses = JSON.parse(JSON.stringify(playerBonuses));
      allSelections.calculatedValues = JSON.parse(JSON.stringify(calculatedValues));
      this.props.lockAllSelections({lockedSelections: allSelections});
      this.props.toggleLock({locked: !this.props.lockStatus.locked});
    } else {

    }
  }

  handleLockDeactivate(action) {
    if (action==="save") {
      this.props.toggleLock({locked: !this.props.lockStatus.locked});
    } else if (action==="discard"){
      this.props.changePotion(this.props.lockStatus.lockedSelections.potions);
      this.props.changePrayer(this.props.lockStatus.lockedSelections.prayers);
      this.props.changePlayerGear(this.props.lockStatus.lockedSelections.playerGear);
      this.props.changeMonster(this.props.lockStatus.lockedSelections.chosenMonster.name);
      this.props.changeMonsterVersion(this.props.lockStatus.lockedSelections.chosenMonster.version);
      this.props.changePlayerStat(this.props.lockStatus.lockedSelections.playerStats);
      this.props.toggleLock({locked: !this.props.lockStatus.locked});
    }
  }

  generatePopupContent() {
    return (
      <div>
        <p> Click "Save" to save your new selections. Click "Discard" to return to the locked in selections.</p>
        <button onClick={() => this.handleLockDeactivate("save")}>Save</button> <button onClick={() => this.handleLockDeactivate("discard")}>Discard</button>
      </div>
    )
  }

  generateLockButton(playerBonuses, calculatedValues) {
    if (this.props.lockStatus.locked === false) {
      return (
        <button className="Lock-Button" onClick={() => this.handleLockActivate(playerBonuses, calculatedValues)}><Image src={this.getLockImage()} width={60} height={60} /></button>
      )
    } else {
      return (
        <Popup
          content={this.generatePopupContent()}
          trigger={<button className="Lock-Button" onClick={() => this.handleLockActivate(playerBonuses, calculatedValues)}><Image src={this.getLockImage()} width={60} height={60} /></button>}
          on='click'
          position='bottom left'
        />
      )
    }
  }

   render() {
     let strPotionBonus = this.calculateBonusLevels('strength');
     let strPrayerBonus = this.calculatePrayerBonuses('strength');
     let strengthBonus = this.calculatePlayerStat('strengthbonus');
     let rangeStrengthBonus = this.calculatePlayerStat('rangestrengthbonus');
     let magicDamageBonus = this.calculatePlayerStat('magicdamage');
     let prayerBonus = this.calculatePlayerStat('prayerbonus');
     let effectiveStrength = this.calculateEffectiveStrength(strPotionBonus, strPrayerBonus);
     let maxAttackRoll = this.calculateMaxAttackRoll();
     let maxDefenseRoll = this.calculateEnemyDefenseRoll();
     let maxHit = this.calculateMaxMeleeHit(effectiveStrength, strengthBonus);
     let monsterHP = allMonsterData[this.props.chosenMonster.name].versions[this.props.chosenMonster.version].hitpoints;
     let accuracy = this.calculateChanceToHit(maxAttackRoll, maxDefenseRoll);
     let weaponAttackSpeed = this.calculateAttackSpeed();
     let dps = this.calculateDPS(maxHit, monsterHP, accuracy, weaponAttackSpeed);
     let killsPerHour = this.calculateKillsPerHour(dps, monsterHP);
     let playerBonuses = this.calculatePlayerBonuses(strengthBonus, rangeStrengthBonus, magicDamageBonus, prayerBonus);
     let calculatedValues = {maxHit: maxHit, accuracy: accuracy, dps: dps, killsPerHour: killsPerHour};

     return (
       <div className="Output-Screen">
        <div className="Lock-Button">
          <div className="Lock-Div" >
            {this.generateLockButton(playerBonuses, calculatedValues)}
          </div>
        </div>
        <div className="Player-Stats">
          <div className="Player-Stats-Title">Attack Bonuses</div>
            {this.generateComparisonRow('Stab', 'astab', playerBonuses)}
            {this.generateComparisonRow('Slash', 'aslash', playerBonuses)}
            {this.generateComparisonRow('Crush', 'acrush', playerBonuses)}
            {this.generateComparisonRow('Magic', 'amagic', playerBonuses)}
            {this.generateComparisonRow('Range', 'arange', playerBonuses)}
          <div className="Player-Stats-Title">Defense Bonuses</div>
            {this.generateComparisonRow('Stab', 'dstab', playerBonuses)}
            {this.generateComparisonRow('Slash', 'dslash', playerBonuses)}
            {this.generateComparisonRow('Crush', 'dcrush', playerBonuses)}
            {this.generateComparisonRow('Magic', 'dmagic', playerBonuses)}
            {this.generateComparisonRow('Range', 'drange', playerBonuses)}
          <div className="Player-Stats-Title">Other Bonuses</div>
            {this.generateComparisonRow('Melee Strength', 'strengthbonus', playerBonuses)}
            {this.generateComparisonRow('Range Strength', 'rangestrengthbonus', playerBonuses)}
            {this.generateComparisonRow('Magic Damage Bonus', 'magicdamagebonus', playerBonuses)}
            {this.generateComparisonRow('Prayer Bonus', 'prayerbonus', playerBonuses)}
        </div>
        <div className="Calculated-Output">
          {this.generateCalculatedOutputRow('Chance to Hit', 'accuracy', accuracy, 3)}
          {this.generateCalculatedOutputRow('Max Melee Hit', 'maxHit', maxHit, 0)}
          {this.generateCalculatedOutputRow('DPS', 'dps', dps, 3)}
          {this.generateCalculatedOutputRow('Kills Per Hour', 'killsPerHour', killsPerHour, 2)}
        </div>
       </div>
     );
   }
};

function mapStateToProps(state) {
  return {
    activePotions: state.currentBoosts.potions,
    activePrayers: state.currentBoosts.prayers,
    otherActiveBoosts: state.currentBoosts.other,
    playerStats: state.playerStats,
    playerGear: state.playerGear,
    chosenMonster: state.chosenMonster,
    lockStatus: state.lockStatus
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({
    toggleLock: toggleLock,
    lockAllSelections: lockAllSelections,
    changePrayer: changePrayer,
    changePotion: changePotion,
    changePlayerGear: changePlayerGear,
    changeMonster: changeMonster,
    changeMonsterVersion: changeMonsterVersion,
    changePlayerStat: changePlayerStat
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(OutputInformationBox);

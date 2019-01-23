import React, {Component} from 'react';   /////////////////////////////
import {bindActionCreators} from 'redux'; ////////////////////////////
import {connect} from 'react-redux';      ///// Libaries used ////////
import {Popup} from 'semantic-ui-react';  ////////////////////////////
import Image from 'react-image-resizer';  ///////////////////////////

import allEquipmentData from '../../JSONraw/allEquipmentData.json'; // Equipment Data //
import allMonsterData from '../../JSONraw/allNPCdata.json';  // Monster Data //
import magicSpellList from '../../JSONraw/magicSpellList.json'; // Spell Data //

import {toggleLock, lockAllSelections} from './outputInformationActions';  /////////////////////////////////////
import {changePrayer, changePotion, changeOtherBoost} from '../boostSelectionScreen/boostSelectionActions'; /////////////////////
import {changePlayerGear, changeSpell} from '../gearSelectionScreen/gearSelectionActions'; // Redux Actions //
import {changeMonster, changeMonsterVersion} from '../npcInfoScreen/npcInfoActions'; /////////////////////////
import {changePlayerStat} from '../playerStatScreen/playerStatActions'; //////////////////////////////////////

import {
  calculateStrengthPotionBonus, calculateStrengthPrayerBonus, calculateEffectiveStrengthLevel,
  calculateAttackPotionBonus, calculateAttackPrayerBonus, calculateEffectiveAttackLevel,
  calculateMaxMeleeHit, calculateMaxAttackRoll, calculateStrengthOtherBonus,
  calculateAttackOtherBonus} from './meleeCalculations'; // functions for melee //

import {
  calculateRangePotionBonus, calculateRangePrayerBonus, calculateEffectiveRangeLevel,
  calculateRangeOtherBonus, calculateMaxRangeHit} from './rangeCalculations'; // functions for range //

import {
  calculateMagicPotionBonus, calculateMagicPrayerBonus, calculateEffectiveMagicLevel,
  calculateMagicOtherBonus, calculateMaxMagicHit} from './magicCalculations'; // functions for magic //

import {
  getFinalRatios,
  flipFinalRatios,
  generateArrayOfOdds,
  calculateAverageDamagePerHit
} from './overkillCalculations'; // functions for calculating effect of overkill and resulting dps //

import {
  checkVoidSet,
  checkUndead,
  checkBarrows,
  checkDHC
} from './specialChecks'; // functions for checking special conditions like sets //

import './output.css'; // Styling //
import math from 'mathjs'; // Library for working with big numbers //


math.config({
    number: "BigNumber",
    precision: 200
});

class OutputInformationBox extends Component {

  calculateEnemyDefenseRoll() {
    let defenseStyle;
    let chosenAttack = allEquipmentData.weapon[this.props.playerGear.weapon].attackoptions[this.props.playerGear.chosenattack];
    if (this.props.playerMagic.chosenspell !== '') {
      defenseStyle = 'dmagic'
    } else if (chosenAttack.type === 'ranged') {
      defenseStyle = 'drange'
    } else if (chosenAttack.type === 'magic') {
      defenseStyle = 'dmagic'
    } else {
      if (chosenAttack.type === 'Slash') {
        defenseStyle = 'dslash'
      } else if (chosenAttack.type === 'Stab') {
        defenseStyle = 'dstab'
      } else if (chosenAttack.type === 'Crush') {
        defenseStyle = 'dcrush'
      };
    }
    let defenseLevel;
    if (defenseStyle === 'dmagic') {
      defenseLevel = allMonsterData[this.props.chosenMonster.name].versions[this.props.chosenMonster.version].mage + 8;
    } else {
      defenseLevel = allMonsterData[this.props.chosenMonster.name].versions[this.props.chosenMonster.version].def + 8;
    }
    let defenseStat = (allMonsterData[this.props.chosenMonster.name].versions[this.props.chosenMonster.version][defenseStyle]);
    let maxDefenseRoll = defenseLevel*(defenseStat+64);
    return maxDefenseRoll;
  }

  calculateChanceToHit(maxAttackRoll, maxDefenseRoll) {
    let accuracy;
    if (maxAttackRoll > maxDefenseRoll) {
      accuracy = 1-(maxDefenseRoll+2)/(2*(maxAttackRoll+1));
    } else {
      accuracy = maxAttackRoll/(2*(maxDefenseRoll+1));
    }
    return accuracy;
  }

  determineCombatType() {
    let combatType;
    if (this.props.playerMagic.chosenspell !== '') {
      combatType = 'magic'
    } else {
      combatType = allEquipmentData.weapon[this.props.playerGear.weapon].combattype;
    }
    return combatType;
  }

  determineAttackType() {
    let attackType;
    if (this.props.playerMagic.chosenspell !== '') {
      attackType = 'magic'
    } else {
      attackType = allEquipmentData.weapon[this.props.playerGear.weapon].attackoptions[this.props.playerGear.chosenattack].type.toLowerCase();
    }
    return attackType;
  }

  getEffectiveAttack(effectiveMeleeAttack, effectiveRange, effectiveMagic) {
    let combatType = this.determineCombatType();
    if (combatType === "melee") {
      return effectiveMeleeAttack;
    } else if (combatType === "ranged") {
      return effectiveRange;
    } else {
      return effectiveMagic;
    }
  }

  getMaxHit(meleeMaxHit, rangeMaxHit, magicMaxHit) {
    let combatType = this.determineCombatType();
    if (combatType === "melee") {
      return meleeMaxHit;
    } else if (combatType === "ranged") {
      return rangeMaxHit;
    } else {
      return magicMaxHit;
    }
  }

  calculatePlayerStat(statName) {
    let slotNames = Object.keys(this.props.playerGear);
    slotNames.pop();
    let statValue = 0;
    let i;
    for (i=0; i<slotNames.length; i++) {
      if (this.props.playerGear[slotNames[i]].length > 1) {
        let addedStat = allEquipmentData[slotNames[i]][this.props.playerGear[slotNames[i]]][statName];
        statValue += addedStat;
      }
    }
    return statValue;
  }

  calculateAttackSpeed () {
    let attackspeed;
    let combatType = this.determineCombatType();
    if (this.props.playerMagic.chosenspell !== '') {
      attackspeed = 5;
    } else {
      attackspeed = allEquipmentData.weapon[this.props.playerGear.weapon].attackspeed;
      if (allEquipmentData.weapon[this.props.playerGear.weapon].attackoptions[this.props.playerGear.chosenattack].style === 'Rapid') {
        attackspeed -= 1
      }
    }
    let secondsPerAttack = attackspeed*0.6;
    return secondsPerAttack;
  }

  calculateDPS(maxHit, monsterHP, accuracy, weaponAttackSpeed) {
    let overkillDamagePerHit = this.calculateOverkillDamagePerHit(maxHit, monsterHP);
    let dps = (1/weaponAttackSpeed)*accuracy*(overkillDamagePerHit);
    return dps;
  }

  calculateOverkillDamagePerHit(maxHit, hp) {
    let finalRatios = getFinalRatios(maxHit, hp);
    let flippedRatios = flipFinalRatios(finalRatios);
    let oddsArray = generateArrayOfOdds(finalRatios, flippedRatios, maxHit);
    let damagePerHit = calculateAverageDamagePerHit(oddsArray, maxHit, hp);
    return damagePerHit;
  }

  calculateKillsPerHour(dps, monsterHP) {
    let killsPerHour = dps*3600/monsterHP;
    return killsPerHour;
  }

  calculateXpPerHour(killsPerHour, monsterHP) {
    let xpPerHour = Math.floor(monsterHP*killsPerHour*4);
    return xpPerHour;
  }

  calculatePlayerBonuses() {
    let bonuses = {};
    bonuses.astab = this.calculatePlayerStat('stabatt');
    bonuses.aslash = this.calculatePlayerStat('slashatt');
    bonuses.acrush = this.calculatePlayerStat('crushatt');
    bonuses.amagic = this.calculatePlayerStat('magicatt');
    bonuses.aranged = this.calculatePlayerStat('rangeatt');
    bonuses.dstab = this.calculatePlayerStat('stabdef');
    bonuses.dslash = this.calculatePlayerStat('slashdef');
    bonuses.dcrush = this.calculatePlayerStat('crushdef');
    bonuses.dmagic = this.calculatePlayerStat('magicdef');
    bonuses.dranged = this.calculatePlayerStat('rangedef');
    bonuses.strength = this.calculatePlayerStat('strengthbonus');
    bonuses.rangestrength = this.calculatePlayerStat('rangestrengthbonus');
    bonuses.magicdamage = this.calculatePlayerStat('magicdamage');
    bonuses.prayer = this.calculatePlayerStat('prayerbonus');
    return bonuses;
  }

  checkSpecialConditions(playerGear, monsterName) {
    let checkObject = {};
    checkObject.voidset = checkVoidSet(playerGear);
    checkObject.barrowsset = checkBarrows(playerGear);
    checkObject.isundead = checkUndead(monsterName);
    checkObject.ontask = this.props.otherActiveBoosts.ontask;
    checkObject.dhc = checkDHC(playerGear, monsterName);
    return checkObject;
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
      row = <div className="Player-Stats-Row"><span style={{color: '#DA8D2D'}}>{labelName}: {this.props.lockStatus.lockedSelections.playerBonuses[statName]}</span> <span style={{color: displayColor}}> {showDifference}</span></div>
    } else {
      row = <div className="Player-Stats-Row"><span style={{color: '#DA8D2D'}}>{labelName}: {bonuses[statName]}</span></div>
    }
    return row;
  }

  generateCalculatedOutputRow(labelName, valueName, value, roundFactor, startSymbol, endSymbol) {
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
      row = <div className="Calculated-Row"><span className="Calculated-Label">{labelName}: {startSymbol}{this.props.lockStatus.lockedSelections.calculatedValues[valueName].toFixed(roundFactor)}{endSymbol}</span> <span style={{color: displayColor}}> {showDifference}</span></div>
    } else {
      row = <div className="Calculated-Row"><span className="Calculated-Label">{labelName}: {startSymbol}{value.toFixed(roundFactor)}{endSymbol}</span></div>
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
      allSelections.otherActiveBoosts = Object.assign({}, this.props.otherActiveBoosts);
      allSelections.playerStats = Object.assign({}, this.props.playerStats);
      allSelections.chosenMonster = JSON.parse(JSON.stringify(this.props.chosenMonster));
      allSelections.playerGear = Object.assign({}, this.props.playerGear);
      allSelections.playerMagic = Object.assign({}, this.props.playerMagic);
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
      this.props.changeOtherBoost(this.props.lockStatus.lockedSelections.otherActiveBoosts);
      this.props.changePlayerGear(this.props.lockStatus.lockedSelections.playerGear);
      this.props.changeSpell(this.props.lockStatus.lockedSelections.playerMagic);
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
     // formula getting long so chose to save chosen attack object in new object //
     let chosenAttack = allEquipmentData.weapon[this.props.playerGear.weapon].attackoptions[this.props.playerGear.chosenattack];

     // precalculate potion and prayer bonuses for 4 combat stats //
     let strPotionBonus = calculateStrengthPotionBonus(this.props.activePotions, this.props.playerStats.strength);
     let strPrayerBonus = calculateStrengthPrayerBonus(this.props.activePrayers);
     let attPotionBonus = calculateAttackPotionBonus(this.props.activePotions, this.props.playerStats.attack);
     let attPrayerBonus = calculateAttackPrayerBonus(this.props.activePrayers);
     let rangePotionBonus = calculateRangePotionBonus(this.props.activePotions, this.props.playerStats.range);
     let rangePrayerBonus = calculateRangePrayerBonus(this.props.activePrayers);
     let magicPotionBonus = calculateMagicPotionBonus(this.props.activePotions);
     let magicPrayerBonus = calculateMagicPrayerBonus(this.props.activePrayers);

     // check for various extra bonuses to pass to bonus calcs below //
     let specialCheckObject = this.checkSpecialConditions(this.props.playerGear, this.props.chosenMonster.name);

     // precalculate other bonuses such as void sets or damage boosting gear //
     let attOtherBonus = calculateAttackOtherBonus(this.props.playerGear, specialCheckObject);
     let strOtherBonus = calculateStrengthOtherBonus(this.props.playerGear, specialCheckObject);
     let rangeOtherBonus = calculateRangeOtherBonus(this.props.playerGear, specialCheckObject);
     let magicOtherBonus = calculateMagicOtherBonus(this.props.playerGear, specialCheckObject);

     // add up equipment attack, defense, and other bonuses and store as object //
     let playerBonuses = this.calculatePlayerBonuses();

     // precalculate effects of potions, prayers, and stance //
     let effectiveStrength = calculateEffectiveStrengthLevel(chosenAttack.style.toLowerCase(), this.props.playerStats.strength, strPotionBonus, strPrayerBonus, strOtherBonus);
     let effectiveMeleeAttack = calculateEffectiveAttackLevel(chosenAttack.style.toLowerCase(), this.props.playerStats.attack, attPotionBonus, attPrayerBonus, attOtherBonus);
     let effectiveRange = calculateEffectiveRangeLevel(chosenAttack.style.toLowerCase(), this.props.playerStats.range, rangePotionBonus, rangePrayerBonus, rangeOtherBonus);
     let effectiveMagic = calculateEffectiveMagicLevel(this.props.playerStats.magic, magicPotionBonus, magicPrayerBonus, magicOtherBonus);

     // precalculate max hit of all 3 styles, only the one the player is using will be used of course
     let meleeMaxHit = calculateMaxMeleeHit(effectiveStrength, playerBonuses.strength);
     let rangeMaxHit = calculateMaxRangeHit(effectiveRange, playerBonuses.rangestrength);
     let magicMaxHit;
     if (this.props.playerMagic.chosenspell !== '') {
       magicMaxHit = calculateMaxMagicHit(magicSpellList[this.props.playerMagic.chosenspell].maxhit, playerBonuses.magicdamage, this.props.playerGear, specialCheckObject, (this.props.playerStats.magic + magicPotionBonus));
     };

     // choose which effective attack to use based on what user has selected (weapon type or spell) //
     let effectiveAttack = this.getEffectiveAttack(effectiveMeleeAttack, effectiveRange, effectiveMagic);

     // choose which maxHit to use based on what the user has selected (weapon type or spell) //
     let maxHit = this.getMaxHit(meleeMaxHit, rangeMaxHit, magicMaxHit);

     // use effective attack and equipment bonuses for chosen attack style to determine player max attack roll //
     let maxAttackRoll = calculateMaxAttackRoll(effectiveAttack, playerBonuses[("a"+this.determineAttackType())]);
     // use chosen monster stats and player attack style to determine enemy max defense roll //
     let maxDefenseRoll = this.calculateEnemyDefenseRoll();

     let monsterHP = allMonsterData[this.props.chosenMonster.name].versions[this.props.chosenMonster.version].hitpoints;
     let accuracy = this.calculateChanceToHit(maxAttackRoll, maxDefenseRoll);
     let weaponAttackSpeed = this.calculateAttackSpeed();
     let dps = this.calculateDPS(maxHit, monsterHP, accuracy, weaponAttackSpeed);
     let killsPerHour = this.calculateKillsPerHour(dps, monsterHP);
     let xpPerHour = this.calculateXpPerHour(killsPerHour, monsterHP);
     let calculatedValues = {maxHit: maxHit, accuracy: (100*accuracy), dps: dps, killsPerHour: killsPerHour, xp:xpPerHour};

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
            {this.generateComparisonRow('Range', 'aranged', playerBonuses)}
          <div className="Player-Stats-Title">Defense Bonuses</div>
            {this.generateComparisonRow('Stab', 'dstab', playerBonuses)}
            {this.generateComparisonRow('Slash', 'dslash', playerBonuses)}
            {this.generateComparisonRow('Crush', 'dcrush', playerBonuses)}
            {this.generateComparisonRow('Magic', 'dmagic', playerBonuses)}
            {this.generateComparisonRow('Range', 'dranged', playerBonuses)}
          <div className="Player-Stats-Title">Other Bonuses</div>
            {this.generateComparisonRow('Melee Strength', 'strength', playerBonuses)}
            {this.generateComparisonRow('Range Strength', 'rangestrength', playerBonuses)}
            {this.generateComparisonRow('Magic Damage Bonus', 'magicdamage', playerBonuses)}
            {this.generateComparisonRow('Prayer Bonus', 'prayer', playerBonuses)}
        </div>
        <div className="Calculated-Output">
          {this.generateCalculatedOutputRow('Chance to Hit', 'accuracy', (accuracy*100), 2, '', '%')}
          {this.generateCalculatedOutputRow('Max Hit', 'maxHit', maxHit, 0, '', '')}
          {this.generateCalculatedOutputRow('DPS', 'dps', dps, 3, '', '')}
          {this.generateCalculatedOutputRow('Kills Per Hour', 'killsPerHour', killsPerHour, 2, '', '')}
          {this.generateCalculatedOutputRow('XP Per Hour', 'xp', xpPerHour, 0, '', '')}
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
    lockStatus: state.lockStatus,
    playerMagic: state.playerMagic
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({
    toggleLock: toggleLock,
    lockAllSelections: lockAllSelections,
    changePrayer: changePrayer,
    changePotion: changePotion,
    changeOtherBoost: changeOtherBoost,
    changePlayerGear: changePlayerGear,
    changeMonster: changeMonster,
    changeMonsterVersion: changeMonsterVersion,
    changePlayerStat: changePlayerStat,
    changeSpell: changeSpell
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(OutputInformationBox);

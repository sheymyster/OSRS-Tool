import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import allEquipmentData from '../../JSONraw/allEquipmentData.json';
import allMonsterData from '../../JSONraw/allNPCdata.json';
import './output.css';

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

  calculateEffectiveStrength() {
    let effectiveStrengthLevel;
    let potionBonus = this.calculateBonusLevels('strength');
    let prayerBonus = this.calculatePrayerBonuses('strength');
    let otherBonus = 1;
    let stanceBonus;
    if (this.props.playerGear.attackstance === 'aggressive') {
      stanceBonus = 3
    } else if (this.props.playerGear.attackstance === 'controlled') {
      stanceBonus = 1
    } else {
      stanceBonus = 0
    }
    effectiveStrengthLevel = Math.floor((+this.props.playerStats.strength + potionBonus)*prayerBonus*otherBonus)+stanceBonus;
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

  calculateChanceToHit() {
    let accuracy;
    let maxAttackRoll = this.calculateMaxAttackRoll();
    let maxDefenseRoll = this.calculateEnemyDefenseRoll();
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

  calculateMaxMeleeHit() {
    let strengthBonus = this.calculatePlayerStat('strengthbonus');
    let effectiveStrength = this.calculateEffectiveStrength();
    let baseDamage = 1.3 + (effectiveStrength/10) + (strengthBonus/80) + (effectiveStrength*strengthBonus)/640;
    let maxHit = Math.floor(baseDamage);
    return maxHit;
  }

  calculateAttackSpeed() {
    let attackspeed;
    if (this.props.playerGear.weapon !== '') {
      attackspeed = allEquipmentData.weapon[this.props.playerGear.weapon].attackspeed;
    }
    let secondsPerAttack = attackspeed*0.6;
    return secondsPerAttack;
  }

  calculateDPS() {
    let maxHit = this.calculateMaxMeleeHit();
    let accuracy = this.calculateChanceToHit();
    let weaponAttackSpeed = this.calculateAttackSpeed();
    let dps = (1/weaponAttackSpeed)*accuracy*(maxHit/2);
    return dps;
  }

  calculateKillsPerHour() {
    let dps = this.calculateDPS();
    let monsterHP = allMonsterData[this.props.chosenMonster.name].versions[this.props.chosenMonster.version].hitpoints;
    let killsPerHour = dps*3600/monsterHP;
    return killsPerHour;
  }

   render() {
     return (
       <div className="Output-Screen">
        <div className="Player-Stats">
          <div className="Player-Stats-Title">Attack Bonuses</div>
          <div className="Player-Stats-Row">Stab: {this.calculatePlayerStat('stabatt')}</div>
          <div className="Player-Stats-Row">Crush: {this.calculatePlayerStat('crushatt')}</div>
          <div className="Player-Stats-Row">Slash: {this.calculatePlayerStat('slashatt')}</div>
          <div className="Player-Stats-Row" className="Player-Stats-Row">Magic: {this.calculatePlayerStat('magicatt')}</div>
          <div className="Player-Stats-Row">Range: {this.calculatePlayerStat('rangeatt')}</div>
          <div className="Player-Stats-Title">Defense Bonuses</div>
          <div className="Player-Stats-Row">Stab: {this.calculatePlayerStat('stabdef')}</div>
          <div className="Player-Stats-Row">Crush: {this.calculatePlayerStat('crushdef')}</div>
          <div className="Player-Stats-Row" className="Player-Stats-Row">Slash: {this.calculatePlayerStat('slashdef')}</div>
          <div className="Player-Stats-Row">Magic: {this.calculatePlayerStat('magicdef')}</div>
          <div className="Player-Stats-Row">Range: {this.calculatePlayerStat('rangedef')}</div>
          <div className="Player-Stats-Title">Other Bonuses</div>
          <div className="Player-Stats-Row">Melee Strength: +{this.calculatePlayerStat('strengthbonus')}</div>
          <div className="Player-Stats-Row">Ranged Strength: +{this.calculatePlayerStat('rangestrengthbonus')}</div>
          <div className="Player-Stats-Row">Magic Damage: +{this.calculatePlayerStat('magicdamage')}%</div>
          <div className="Player-Stats-Row">Prayer: +{this.calculatePlayerStat('prayerbonus')}</div>
        </div>
        <div className="Calculated-Output">
          <div>Chance to Hit: {(this.calculateChanceToHit()*100).toFixed(2)}%</div>
          <div>Max Melee Hit: {this.calculateMaxMeleeHit()}</div>
          <div>DPS before OK: {this.calculateDPS().toFixed(3)}</div>
          <div>Kills Per Hour: {this.calculateKillsPerHour().toFixed(2)}</div>
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
    chosenMonster: state.chosenMonster
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(OutputInformationBox);
import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

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

  }

   render() {
     return (
       <div>
          <div>Potion Bonuses</div>
          <div>+ {this.calculateBonusLevels('strength')} strength levels</div>
          <div>+ {this.calculateBonusLevels('attack')} attack levels</div>
          <div>+ {this.calculateBonusLevels('range')} range levels</div>
          <div>+ {this.calculateBonusLevels('magic')} magic levels</div>
          <div>Strength multiplier is {this.calculatePrayerBonuses('strength')}</div>
          <div>Attack multiplier is {this.calculatePrayerBonuses('attack')}</div>
          <div>Range attack multiplier is {this.calculatePrayerBonuses('range')}</div>
          <div>Magic attack multiplier is {this.calculatePrayerBonuses('magic')}</div>
          <div>Effective Strength: </div>
          <div>Effective Attack: </div>
       </div>
     );
   }
};

function mapStateToProps(state) {
  return{
    activePotions: state.currentBoosts.potions,
    activePrayers: state.currentBoosts.prayers,
    otherActiveBoosts: state.currentBoosts.other,
    playerStats: state.playerStats
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(OutputInformationBox);

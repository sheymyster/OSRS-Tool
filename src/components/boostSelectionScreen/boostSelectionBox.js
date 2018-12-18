import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {changePrayer, changePotion, changeOtherBoost} from './boostSelectionActions';
import './boost.css';

class BoostSelectionBox extends Component {

   render() {
     return (
       <div className="boostScreen">
          <div> POTION SELECTION </div>
          <div> <input type="checkbox" onChange={() => {this.props.changePotion('strength', !this.props.activePotions.strength)}}/> Strength Potion   {this.props.activePotions.strength.toString()}</div>
          <div> <input type="checkbox" onChange={() => {this.props.changePotion('attack', !this.props.activePotions.attack)}}/> Attack Potion   {this.props.activePotions.attack.toString()}</div>
          <div> <input type="checkbox" onChange={() => {this.props.changePotion('superstrength', !this.props.activePotions.superstrength)}}/> Super Strength Potion   {this.props.activePotions.superstrength.toString()}</div>
          <div> <input type="checkbox" onChange={() => {this.props.changePotion('superattack', !this.props.activePotions.superattack)}}/> Super Attack Potion   {this.props.activePotions.superattack.toString()}</div>
          <div> <input type="checkbox" onChange={() => {this.props.changePotion('combat', !this.props.activePotions.combat)}}/> Combat Potion   {this.props.activePotions.combat.toString()}</div>
          <div> <input type="checkbox" onChange={() => {this.props.changePotion('supercombat', !this.props.activePotions.supercombat)}}/> Super Combat Potion   {this.props.activePotions.supercombat.toString()}</div>
          <div> <input type="checkbox" onChange={() => {this.props.changePotion('ranging', !this.props.activePotions.ranging)}}/> Ranging Potion   {this.props.activePotions.ranging.toString()}</div>
          <div> <input type="checkbox" onChange={() => {this.props.changePotion('magic', !this.props.activePotions.magic)}}/> Magic Potion   {this.props.activePotions.magic.toString()}</div>
          <div> PRAYER SELECTION </div>
          <div> <input type="checkbox" onChange={() => {this.props.changePrayer('burstofstrength', !this.props.activePrayers.burstofstrength)}}/> Burst Of Strength   {this.props.activePrayers.burstofstrength.toString()}</div>
          <div> <input type="checkbox" onChange={() => {this.props.changePrayer('superhumanstrength', !this.props.activePrayers.superhumanstrength)}}/> Superhuman Strength   {this.props.activePrayers.superhumanstrength.toString()}</div>
          <div> <input type="checkbox" onChange={() => {this.props.changePrayer('ultimatestrength', !this.props.activePrayers.ultimatestrength)}}/> Ultimate Strength  {this.props.activePrayers.ultimatestrength.toString()}</div>
          <div> <input type="checkbox" onChange={() => {this.props.changePrayer('clarityofthought', !this.props.activePrayers.clarityofthought)}}/> Clarity Of Thought   {this.props.activePrayers.clarityofthought.toString()}</div>
          <div> <input type="checkbox" onChange={() => {this.props.changePrayer('improvedreflexes', !this.props.activePrayers.improvedreflexes)}}/> Improved Reflexes   {this.props.activePrayers.improvedreflexes.toString()}</div>
          <div> <input type="checkbox" onChange={() => {this.props.changePrayer('incrediblereflexes', !this.props.activePrayers.incrediblereflexes)}}/> Incredible Reflexes   {this.props.activePrayers.incrediblereflexes.toString()}</div>
          <div> <input type="checkbox" onChange={() => {this.props.changePrayer('sharpeye', !this.props.activePrayers.sharpeye)}}/> Sharp Eye  {this.props.activePrayers.sharpeye.toString()}</div>
          <div> <input type="checkbox" onChange={() => {this.props.changePrayer('hawkeye', !this.props.activePrayers.hawkeye)}}/> Hawk Eye   {this.props.activePrayers.hawkeye.toString()}</div>
          <div> <input type="checkbox" onChange={() => {this.props.changePrayer('eagleeye', !this.props.activePrayers.eagleeye)}}/> Eagle Eye   {this.props.activePrayers.eagleeye.toString()}</div>
          <div> <input type="checkbox" onChange={() => {this.props.changePrayer('mysticwill', !this.props.activePrayers.mysticwill)}}/> Mysic Will  {this.props.activePrayers.mysticwill.toString()}</div>
          <div> <input type="checkbox" onChange={() => {this.props.changePrayer('mysticlore', !this.props.activePrayers.mysticlore)}}/> Mystic Lore   {this.props.activePrayers.mysticlore.toString()}</div>
          <div> <input type="checkbox" onChange={() => {this.props.changePrayer('mysticmight', !this.props.activePrayers.mysticmight)}}/> Mystic Might   {this.props.activePrayers.mysticmight.toString()}</div>
          <div> <input type="checkbox" onChange={() => {this.props.changePrayer('chivalry', !this.props.activePrayers.chivalry)}}/> Chivalry   {this.props.activePrayers.chivalry.toString()}</div>
          <div> <input type="checkbox" onChange={() => {this.props.changePrayer('piety', !this.props.activePrayers.piety)}}/> Piety   {this.props.activePrayers.piety.toString()}</div>
          <div> <input type="checkbox" onChange={() => {this.props.changePrayer('rigour', !this.props.activePrayers.rigour)}}/> Rigour   {this.props.activePrayers.rigour.toString()}</div>
          <div> <input type="checkbox" onChange={() => {this.props.changePrayer('augury', !this.props.activePrayers.augury)}}/> Augury   {this.props.activePrayers.augury.toString()}</div>
       </div>
     );
   }
};


function mapStateToProps(state) {
  return {
    activePotions : state.currentBoosts.potions,
    activePrayers: state.currentBoosts.prayers,
    otherActiveBoosts: state.currentBoosts.other
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({
    changePotion: changePotion,
    changePrayer: changePrayer,
    changeOtherBoost: changeOtherBoost
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(BoostSelectionBox);

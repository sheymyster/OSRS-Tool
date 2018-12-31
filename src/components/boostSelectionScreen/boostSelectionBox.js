import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {changePrayer, changePotion, changeOtherBoost} from './boostSelectionActions';
import './boost.css';

class BoostSelectionBox extends Component {

   render() {
     return (
       <div className="Boost-Screen">
        <div className="Selection-Field">
            <div className="Selection-Title">
              <span>POTIONS</span>
            </div>
            <div className="Selection-Checkboxes">
              <div> <input type="checkbox" onChange={() => {this.props.changePotion('strength', !this.props.activePotions.strength)}}/> Strength Potion</div>
              <div> <input type="checkbox" onChange={() => {this.props.changePotion('attack', !this.props.activePotions.attack)}}/> Attack Potion</div>
              <div> <input type="checkbox" onChange={() => {this.props.changePotion('superstrength', !this.props.activePotions.superstrength)}}/> Super Strength Potion</div>
              <div> <input type="checkbox" onChange={() => {this.props.changePotion('superattack', !this.props.activePotions.superattack)}}/> Super Attack Potion</div>
              <div> <input type="checkbox" onChange={() => {this.props.changePotion('combat', !this.props.activePotions.combat)}}/> Combat Potion</div>
              <div> <input type="checkbox" onChange={() => {this.props.changePotion('supercombat', !this.props.activePotions.supercombat)}}/> Super Combat Potion</div>
              <div> <input type="checkbox" onChange={() => {this.props.changePotion('ranging', !this.props.activePotions.ranging)}}/> Ranging Potion</div>
              <div> <input type="checkbox" onChange={() => {this.props.changePotion('magic', !this.props.activePotions.magic)}}/> Magic Potion</div>
            </div>
        </div>
        <div className="Selection-Field">
            <div className="Selection-Title">
              <span>PRAYERS</span>
            </div>
            <div className="Selection-Checkboxes">
              <div> <input type="checkbox" onChange={() => {this.props.changePrayer('burstofstrength', !this.props.activePrayers.burstofstrength)}}/> Burst Of Strength</div>
              <div> <input type="checkbox" onChange={() => {this.props.changePrayer('superhumanstrength', !this.props.activePrayers.superhumanstrength)}}/> Superhuman Strength</div>
              <div> <input type="checkbox" onChange={() => {this.props.changePrayer('ultimatestrength', !this.props.activePrayers.ultimatestrength)}}/> Ultimate Strength</div>
              <div> <input type="checkbox" onChange={() => {this.props.changePrayer('clarityofthought', !this.props.activePrayers.clarityofthought)}}/> Clarity Of Thought</div>
              <div> <input type="checkbox" onChange={() => {this.props.changePrayer('improvedreflexes', !this.props.activePrayers.improvedreflexes)}}/> Improved Reflexes</div>
              <div> <input type="checkbox" onChange={() => {this.props.changePrayer('incrediblereflexes', !this.props.activePrayers.incrediblereflexes)}}/> Incredible Reflexes</div>
              <div> <input type="checkbox" onChange={() => {this.props.changePrayer('sharpeye', !this.props.activePrayers.sharpeye)}}/> Sharp Eye</div>
              <div> <input type="checkbox" onChange={() => {this.props.changePrayer('hawkeye', !this.props.activePrayers.hawkeye)}}/> Hawk Eye</div>
              <div> <input type="checkbox" onChange={() => {this.props.changePrayer('eagleeye', !this.props.activePrayers.eagleeye)}}/> Eagle Eye</div>
              <div> <input type="checkbox" onChange={() => {this.props.changePrayer('mysticwill', !this.props.activePrayers.mysticwill)}}/> Mysic Will</div>
              <div> <input type="checkbox" onChange={() => {this.props.changePrayer('mysticlore', !this.props.activePrayers.mysticlore)}}/> Mystic Lore</div>
              <div> <input type="checkbox" onChange={() => {this.props.changePrayer('mysticmight', !this.props.activePrayers.mysticmight)}}/> Mystic Might</div>
              <div> <input type="checkbox" onChange={() => {this.props.changePrayer('chivalry', !this.props.activePrayers.chivalry)}}/> Chivalry</div>
              <div> <input type="checkbox" onChange={() => {this.props.changePrayer('piety', !this.props.activePrayers.piety)}}/> Piety</div>
              <div> <input type="checkbox" onChange={() => {this.props.changePrayer('rigour', !this.props.activePrayers.rigour)}}/> Rigour</div>
              <div> <input type="checkbox" onChange={() => {this.props.changePrayer('augury', !this.props.activePrayers.augury)}}/> Augury</div>
            </div>
        </div>
        <div className="Selection-Field">
            <div className="Selection-Title">
              <span>OTHER</span>
            </div>
            <div className="Selection-Checkboxes">
            </div>
          </div>
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

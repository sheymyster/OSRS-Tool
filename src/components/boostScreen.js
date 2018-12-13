import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {changeBoost} from '../actions/boostSelectionBoxActions';
import '../index.css';

class BoostSelectionBox extends Component {

   render() {
     return (
       <div className="boostScreen">
          <div> <input type="checkbox" value = {this.props.currentBoosts.potions.strengthpotion} /> Strength Potion </div>
          <div> <input type="checkbox" value = {this.props.currentBoosts.potions.attackpotion} /> Attack Potion </div>
          <div> <input type="checkbox" value = {this.props.currentBoosts.potions.superstrengthpotion} /> Super Strength Potion </div>
          <div> <input type="checkbox" value = {this.props.currentBoosts.potions.superattackpotion} /> Super Attack Potion </div>
          <div> <input type="checkbox" value = {this.props.currentBoosts.potions.combatpotion} /> Combat Potion </div>
          <div> <input type="checkbox" value = {this.props.currentBoosts.potions.supercombatpotion} /> Super Combat Potion </div>
       </div>
     );
   }
};

function mapStateToProps(state) {
  return {
    currentBoosts : state.currentBoosts
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({changeBoost: changeBoost}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(BoostSelectionBox);

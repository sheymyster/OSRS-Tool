import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {changePrayer, changePotion, changeOtherBoost} from '../actions/boostSelectionBoxActions';
import '../index.css';

class BoostSelectionBox extends Component {

  handleBoostChange(category, name) {
    let newValue;
    if (this.props.currentBoosts[category][name] == 'false') {
      newValue = 'true'
    } else {
      newValue = 'false'
    };
    switch (category) {
      case 'potions':
       return this.props.changePotion(name, newValue)
    }
  };
  
   render() {

     return (
       <div className="boostScreen">
          <div> <input type="checkbox" onChange={() => {this.handleBoostChange('potions', 'strengthpotion')}}/> Strength Potion </div>
          <div> <input type="checkbox" /> Attack Potion </div>
          <div> <input type="checkbox" /> Super Strength Potion </div>
          <div> <input type="checkbox" /> Super Attack Potion </div>
          <div> <input type="checkbox" /> Combat Potion </div>
          <div> <input type="checkbox" /> Super Combat Potion </div>
          {this.props.currentBoosts.potions.strength}
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
  return bindActionCreators({
    changePotion: changePotion,
    changePrayer: changePrayer,
    changeOtherBoost: changeOtherBoost
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(BoostSelectionBox);

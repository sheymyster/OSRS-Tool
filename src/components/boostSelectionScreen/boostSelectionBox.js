import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import Image from 'react-image-resizer';
import {changePrayer, changePotion, changeOtherBoost} from './boostSelectionActions';
import './boost.css';

class BoostSelectionBox extends Component {

   highlightPotion(name) {
     if (this.props.activePotions[name]) {
       if (this.props.lockStatus.locked === true && this.props.activePotions[name] === this.props.lockStatus.lockedSelections.potions[name]) {
         return {
           backgroundColor: 'rgba(90, 90, 90, 0.8)',
           borderRadius: '50%'
         }
       } else {
         return {
           backgroundColor: 'rgba(0, 128, 0, 0.5)',
           borderRadius: '50%'
         }
       }
     } else if (this.props.lockStatus.locked === true && this.props.activePotions[name] !== this.props.lockStatus.lockedSelections.potions[name]) {
        return {
          backgroundColor: 'rgba(255, 0, 0, 0.5)',
          borderRadius: '50%'
        }
     } else {
       return
     }
   }

   highlightPrayer(name) {
     if (this.props.activePrayers[name]) {
       if (this.props.lockStatus.locked === true && this.props.activePrayers[name] === this.props.lockStatus.lockedSelections.prayers[name]) {
         return {
           backgroundColor: 'rgba(90, 90, 90, 0.8)',
           borderRadius: '50%'
         }
       } else {
         return {
           backgroundColor: 'rgba(255, 255, 0, 0.3)',
           borderRadius: '50%'
         }
       }
     } else if (this.props.lockStatus.locked === true && this.props.activePrayers[name] !== this.props.lockStatus.lockedSelections.prayers[name]) {
        return {
          backgroundColor: 'rgba(255, 0, 0, 0.5)',
          borderRadius: '50%'
        }
     } else {
       return
     }
   }

   generatePotionButtons() {
     let listOfPotions = Object.keys(this.props.activePotions);
     let potionButtons = [];
     let i;
     let n = listOfPotions.length;
     for (i=0; i<n; i++) {
       let potionObject = {};
       let boolean = !this.props.activePotions[listOfPotions[i]];
       potionObject[listOfPotions[i]] = boolean;
       potionButtons.push(
         <div className="Potion-Image" title={listOfPotions[i]} style={this.highlightPotion(listOfPotions[i])} onClick={() => {this.props.changePotion(potionObject)}}>
           <Image src={require('../../assets/'+listOfPotions[i]+'_potion.png')} height={50} width={50}/>
         </div>
       )
     }
     return potionButtons
   }

   generatePrayerButtons() {
     let listOfPrayers = Object.keys(this.props.activePrayers);
     let prayerButtons = [];
     let i;
     let n = listOfPrayers.length;
     for (i=0; i<n; i++) {
       let prayerObject = {};
       let boolean = !this.props.activePrayers[listOfPrayers[i]];
       prayerObject[listOfPrayers[i]] = boolean;
       prayerButtons.push(
         <div className="Prayer-Image" title={listOfPrayers[i]} style={this.highlightPrayer(listOfPrayers[i])} onClick={() => {this.props.changePrayer(prayerObject)}}>
           <Image src={require('../../assets/'+listOfPrayers[i]+'.png')} height={40} width={40}/>
         </div>
       )
     }
     return prayerButtons
   }

   render() {

     return (
       <div className="Boost-Screen">
        <div className="Selection-Field">
            <div className="Selection-Images">
              {this.generatePotionButtons()}
            </div>
        </div>
        <div className="Selection-Field">
            <div className="Selection-Images">
              {this.generatePrayerButtons()}
            </div>
        </div>
        <div className="Selection-Field">
            <div className="Selection-Images">
              <div className="Other-Boost-Image">
                <Image src={require('../../assets/slayer_icon.png')} height={50} width={50}/>
              </div>
              <div className="Other-Boost-Image">
                <Image src={require('../../assets/undead.png')} height={50} width={50}/>
              </div>
              <div className="Other-Boost-Image">
                <Image src={require('../../assets/void_icon.png')} height={50} width={50}/>
              </div>
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
    otherActiveBoosts: state.currentBoosts.other,
    lockStatus: state.lockStatus
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

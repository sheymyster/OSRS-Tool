import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import Image from 'react-image-resizer';
import {changePrayer, changePotion, changeOtherBoost} from './boostSelectionActions';
import {checkUndead, checkBarrows, checkVoidSet} from '../outputInformationScreen/specialChecks';
import './boost.css';

class BoostSelectionBox extends Component {

   highlightPotion(name) {
     if (this.props.activePotions[name]) {
       if (this.props.lockStatus.locked === true && this.props.activePotions[name] === this.props.lockStatus.lockedSelections.potions[name]) {
         return {
           backgroundColor: 'rgba(90, 90, 90, 0.8)'
         }
       } else {
         return {
           backgroundColor: 'rgba(0, 128, 0, 0.5)'
         }
       }
     } else if (this.props.lockStatus.locked === true && this.props.activePotions[name] !== this.props.lockStatus.lockedSelections.potions[name]) {
        return {
          backgroundColor: 'rgba(255, 0, 0, 0.5)'
        }
     } else {
       return
     }
   }

   highlightPrayer(name) {
     if (this.props.activePrayers[name]) {
       if (this.props.lockStatus.locked && this.props.activePrayers[name] === this.props.lockStatus.lockedSelections.prayers[name]) {
         return {
           backgroundColor: 'rgba(90, 90, 90, 0.8)'
         }
       } else {
         return {
           backgroundColor: 'rgba(255, 255, 0, 0.3)'
         }
       }
     } else if (this.props.lockStatus.locked === true && this.props.activePrayers[name] !== this.props.lockStatus.lockedSelections.prayers[name]) {
        return {
          backgroundColor: 'rgba(255, 0, 0, 0.5)'
        }
     } else {
       return
     }
   }

   highlightOtherBoost(boostname) {
     if (this.props.otherActiveBoosts[boostname]) {
       if (this.props.lockStatus.locked && this.props.otherActiveBoosts[boostname] === this.props.lockStatus.lockedSelections.otherActiveBoosts[boostname]) {
         return {
           backgroundColor: 'rgba(90, 90, 90, 0.8)'
         }
       } else {
          return {
           backgroundColor: 'rgba(0, 128, 0, 0.5)'
         }
       }
     } else if (this.props.lockStatus.locked && this.props.otherActiveBoosts[boostname] !== this.props.lockStatus.lockedSelections.otherActiveBoosts[boostname]) {
        return {
          backgroundColor: 'rgba(255, 0, 0, 0.5)'
        }
     } else {
        return
     }
   }

   highlightUndead(undead) {
     let lockedUndead;
     if (this.props.lockStatus.locked) {
       lockedUndead = checkUndead(this.props.lockStatus.lockedSelections.chosenMonster.name);
     }
     if (undead) {
       if (this.props.lockStatus.locked && undead === lockedUndead) {
         return {
           backgroundColor: 'rgba(90, 90, 90, 0.8)'
         }
       } else {
          return {
           backgroundColor: 'rgba(0, 128, 0, 0.5)'
         }
       }
     } else if (this.props.lockStatus.locked && undead !== lockedUndead) {
        return {
         backgroundColor: 'rgba(255, 0, 0, 0.5)'
       }
     } else {
        return
     }
   }

   getVoidSetImage(voidset) {
     if (voidset.hasvoid) {
       if (voidset.settype === 'melee') {
         return 'Void_melee_helm_icon';
       } else if (voidset.settype === 'mage') {
         return 'Void_mage_helm_icon';
       } else {
         return 'Void_ranger_helm_icon';
       }
     } else {
       return 'Void_ranger_helm_icon';
     }
   }

   highlightVoid(voidset) {
     let lockedVoid;
     if (this.props.lockStatus.locked) {
       lockedVoid = checkVoidSet(this.props.lockStatus.lockedSelections.playerGear);
     }
     if (voidset.hasvoid) {
       if (this.props.lockStatus.locked && voidset.hasvoid === lockedVoid.hasvoid) {
         return {
           backgroundColor: 'rgba(90, 90, 90, 0.8)'
         }
       } else {
          return {
           backgroundColor: 'rgba(0, 128, 0, 0.5)'
         }
       }
     } else if (this.props.lockStatus.locked && voidset.hasvoid !== lockedVoid.hasvoid) {
        return {
         backgroundColor: 'rgba(255, 0, 0, 0.5)'
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

     let voidset = checkVoidSet(this.props.playerGear);
     let hasbarrows = checkBarrows(this.props.playerGear);
     let isundead = checkUndead(this.props.chosenMonster.name);

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
              <div className="Other-Boost-Image"
                onClick={() => this.props.changeOtherBoost({ontask: !this.props.otherActiveBoosts.ontask})}
                style={this.highlightOtherBoost('ontask')}
                title="On Task">
                  <Image src={require('../../assets/slayer_icon.png')} height={40} width={40}/>
              </div>
              <div className="Other-Boost-Image"
                style={this.highlightUndead(isundead)}
                title="Enemy is undead">
                  <Image src={require('../../assets/undead.png')} height={40} width={40}/>
              </div>
              <div className="Other-Boost-Image"
                style={this.highlightVoid(voidset)}
                title="Void set active">
                  <Image src={require('../../assets/' + this.getVoidSetImage(voidset) + '.png')} height={40} width={40}/>
              </div>
              <div className="Other-Boost-Image"
                onClick={() => this.props.changeOtherBoost({imbuedheart: !this.props.otherActiveBoosts.imbuedheart})}
                style={this.highlightOtherBoost('imbuedheart')}
                title="Imbued Heart">
                  <Image src={require('../../assets/imbued_heart_icon.png')} height={40} width={40}/>
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
    lockStatus: state.lockStatus,
    playerGear: state.playerGear,
    chosenMonster: state.chosenMonster
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

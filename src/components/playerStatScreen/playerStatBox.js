import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import Image from 'react-image-resizer';

import {changePlayerStat} from './playerStatActions';
import {changePlayerGear} from '../gearSelectionScreen/gearSelectionActions';
import './playerStats.css';

const request = require('request');


let maxMeleeGear = {
  head: 'Serpentine helm',
  neck: 'Amulet of torture',
  chest: 'Bandos chestplate',
  leg: 'Bandos tassets',
  feet: 'Primordial boots',
  cape: 'Infernal cape',
  ammo: 'Peaceful blessing',
  weapon: 'Abyssal whip',
  shield: 'Avernic defender',
  hand: 'Barrows gloves',
  ring: 'Berserker ring (i)',
  chosenattack: 1
}

let maxRangeGear = {
  head: 'Armadyl helmet',
  neck: 'Necklace of anguish',
  chest: 'Armadyl chestplate',
  leg: 'Armadyl chainskirt',
  feet: 'Pegasian boots',
  cape: 'Ava\'s assembler',
  ammo: 'Dragon bolts',
  weapon: 'Twisted bow',
  shield: '',
  hand: 'Barrows gloves',
  ring: 'Archers ring (i)',
  chosenattack: 1
}

let maxMagicGear = {
  head: 'Ancestral hat',
  neck: 'Occult necklace',
  chest: 'Ancestral robe top',
  leg: 'Ancestral robe bottom',
  feet: 'Eternal boots',
  cape: 'Imbued saradomin cape',
  ammo: '',
  weapon: 'Kodai wand',
  shield: 'Mages book',
  hand: 'Tormented bracelet',
  ring: 'Seers ring (i)',
  chosenattack: 1
}

class PlayerStatBox extends Component {

  testHiScores() {
    let proxyurl = 'https://cors-anywhere.herokuapp.com/';
    let url = 'https://secure.runescape.com/m=hiscore_oldschool/index_lite.ws?player=lp lul lr le';
      request(proxyurl + url, function(error, response, body) {
        let stats = JSON.stringify(body);
        console.log(stats);
      })
  }

  highlightPlayerStatInputs(stat) {
    if (this.props.lockStatus.locked === true) {
      if (this.props.playerStats[stat] === this.props.lockStatus.lockedSelections.playerStats[stat]) {
        return {
          backgroundColor: 'rgba(90, 90, 90, 0.8)'
        }
      } else if (this.props.playerStats[stat] > this.props.lockStatus.lockedSelections.playerStats[stat]) {
        return {
          backgroundColor: 'green'
        }
      } else {
        return {
          backgroundColor: 'red'
        }
      }
    }
  }

   render() {

     return (
       <div className="Player-Stat-Screen">
          <div className="Player-Stat-Row">
            <Image src={require('../../assets/attack_icon.png')} width={50} height={50} />
            <input className="Player-Stat-Input" style={this.highlightPlayerStatInputs('attack')} type='number' value={this.props.playerStats.attack} onChange={(e) => this.props.changePlayerStat({attack: parseInt(e.target.value, 10)})}/>
          </div>
          <div className="Player-Stat-Row">
            <Image src={require('../../assets/strength_icon.png')} width={50} height={50} />
            <input className="Player-Stat-Input" style={this.highlightPlayerStatInputs('strength')} type='number' value={this.props.playerStats.strength} onChange={(e) => this.props.changePlayerStat({strength: parseInt(e.target.value, 10)})}/>
          </div>
          <div className="Player-Stat-Row">
            <Image src={require('../../assets/ranged_icon.png')} width={50} height={50} />
            <input className="Player-Stat-Input" style={this.highlightPlayerStatInputs('range')} type='number' value={this.props.playerStats.range} onChange={(e) => this.props.changePlayerStat({range: parseInt(e.target.value, 10)})}/>
          </div>
          <div className="Player-Stat-Row">
            <Image src={require('../../assets/magic_icon.png')} width={50} height={50} />
            <input className="Player-Stat-Input" style={this.highlightPlayerStatInputs('magic')} type='number' value={this.props.playerStats.magic} onChange={(e) => this.props.changePlayerStat({magic: parseInt(e.target.value, 10)})}/>
          </div>
          <div className="Mock-Gear-Button-Div">
            <button className="Mock-Gear-Button" onClick={() => this.props.changePlayerGear(maxMeleeGear)}>Max Melee</button>
            <button className="Mock-Gear-Button" onClick={() => this.props.changePlayerGear(maxRangeGear)}>Max Range</button>
            <button className="Mock-Gear-Button" onClick={() => this.props.changePlayerGear(maxMagicGear)}>Max Mage</button>
          </div>
       </div>
     );
   }
};


function mapStateToProps(state) {
  return {
    playerStats: state.playerStats,
    playerGear: state.playerGear,
    lockStatus: state.lockStatus
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({
    changePlayerStat: changePlayerStat,
    changePlayerGear: changePlayerGear
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(PlayerStatBox);

import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import Image from 'react-image-resizer';

import {changePlayerStat} from './playerStatActions';
import {changePlayerGear} from '../gearSelectionScreen/gearSelectionActions';
import './playerStats.css';

const request = require('request');




class PlayerStatBox extends Component {


  mockGear() {
    let mockGear = {
      head: 'Dragon full helm',
      neck: 'Amulet of torture',
      chest: 'Bandos chestplate',
      leg: 'Bandos tassets',
      feet: 'Primordial boots',
      cape: 'Infernal cape',
      ammo: 'Peaceful blessing',
      weapon: 'Abyssal whip',
      shield: 'Avernic defender',
      hand: 'Barrows gloves',
      ring: 'Berserker ring (i)'
    }
    this.props.changePlayerGear(mockGear);
  }

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
            <input className="Player-Stat-Input" style={this.highlightPlayerStatInputs('attack')} type='number' defaultValue={1} onChange={(e) => this.props.changePlayerStat('attack', e.target.value)}/>
          </div>
          <div className="Player-Stat-Row">
            <Image src={require('../../assets/strength_icon.png')} width={50} height={50} />
            <input className="Player-Stat-Input" style={this.highlightPlayerStatInputs('strength')} type='number' defaultValue={1} onChange={(e) => this.props.changePlayerStat('strength', e.target.value)}/>
          </div>
          <div className="Player-Stat-Row">
            <Image src={require('../../assets/ranged_icon.png')} width={50} height={50} />
            <input className="Player-Stat-Input" style={this.highlightPlayerStatInputs('range')} type='number' defaultValue={1} onChange={(e) => this.props.changePlayerStat('range', e.target.value)}/>
          </div>
          <div className="Player-Stat-Row">
            <Image src={require('../../assets/magic_icon.png')} width={50} height={50} />
            <input className="Player-Stat-Input" style={this.highlightPlayerStatInputs('magic')} type='number' defaultValue={1} onChange={(e) => this.props.changePlayerStat('magic', e.target.value)}/>
          </div>
          <div className="Mock-Gear-Button-Div">
            <button className="Mock-Gear-Button" onClick={() => this.mockGear()}>Mock Gear</button>
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

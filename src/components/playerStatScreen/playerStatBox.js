import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {changePlayerStat} from './playerStatActions';
import {changePlayerGear} from '../gearSelectionScreen/gearSelectionActions';

const request = require('request');




class PlayerStatBox extends Component {


  mockGear() {
    this.props.changePlayerGear('head', {value:'Dragon full helm'});
    this.props.changePlayerGear('neck', {value:'Amulet of torture'});
    this.props.changePlayerGear('chest', {value:'Bandos chestplate'});
    this.props.changePlayerGear('leg', {value:'Bandos tassets'});
    this.props.changePlayerGear('feet', {value:'Primordial boots'});
    this.props.changePlayerGear('cape', {value:'Infernal cape'});
    this.props.changePlayerGear('ammo', {value:'Peaceful blessing'});
    this.props.changePlayerGear('weapon', {value:'Abyssal whip'});
    this.props.changePlayerGear('shield', {value:'Dragonfire shield'});
    this.props.changePlayerGear('hand', {value:'Barrows gloves'});
    this.props.changePlayerGear('ring', {value:'Berserker ring (i)'});
  }

  testHiScores() {
    let proxyurl = 'https://cors-anywhere.herokuapp.com/';
    let url = 'https://secure.runescape.com/m=hiscore_oldschool/index_lite.ws?player=lp lul lr le';
      request(proxyurl + url, function(error, response, body) {
        let stats = JSON.stringify(body);
        console.log(stats);
      })
  }
   render() {

     return (
       <div>
          <div>Strength Level <input type='number' defaultValue={1} onChange={(e) => this.props.changePlayerStat('strength', e.target.value)}/></div>
          <div>Attack Level <input type='number' defaultValue={1} onChange={(e) => this.props.changePlayerStat('attack', e.target.value)}/></div>
          <div>Range Level <input type='number' defaultValue={1} onChange={(e) => this.props.changePlayerStat('range', e.target.value)}/></div>
          <div>Magic Level <input type='number' defaultValue={1} onChange={(e) => this.props.changePlayerStat('magic', e.target.value)}/></div>
          <button onClick={() => this.mockGear()}>Mock Gear</button>
       </div>
     );
   }
};


function mapStateToProps(state) {
  return {
    playerStats: state.playerStats,
    playerGear: state.playerGear
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({
    changePlayerStat: changePlayerStat,
    changePlayerGear: changePlayerGear
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(PlayerStatBox);

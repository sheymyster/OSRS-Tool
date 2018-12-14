import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {changePlayerStat} from './playerStatActions';

const request = require('request');




class PlayerStatBox extends Component {


  testHiScores() {
    let url = 'http://services.runescape.com/m=hiscore_oldschool/index_lite.ws?player=Hess'
      request.get({url:url, mode:"nocors"}, function(error, response, body) {
        let stats = JSON.stringify(body);
        console.log(stats);
      })
  }
   render() {
     return (
       <div>
          <div><button onClick={() => this.testHiScores()}>test</button></div>
          <div>Strength Level <input type='number' defaultValue={1} onChange={(e) => this.props.changePlayerStat('strength', e.target.value)}/></div>
          <div>Attack Level <input type='number' defaultValue={1} onChange={(e) => this.props.changePlayerStat('attack', e.target.value)}/></div>
          <div>Range Level <input type='number' defaultValue={1} onChange={(e) => this.props.changePlayerStat('range', e.target.value)}/></div>
          <div>Magic Level <input type='number' defaultValue={1} onChange={(e) => this.props.changePlayerStat('magic', e.target.value)}/></div>
       </div>
     );
   }
};


function mapStateToProps(state) {
  return {
    playerStats: state.playerStats
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({
    changePlayerStat: changePlayerStat
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(PlayerStatBox);

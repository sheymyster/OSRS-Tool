import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import Image from 'react-image-resizer';
import Select from 'react-select';
import {changeMonster} from '../actions/npcInfoBoxActions';
import allMonsterData from '../JSONraw/allMonsterData.json';

class NPCInfoBox extends Component {

  handleChange(event) {
    this.props.changeMonster(event.target.value);
  }

   render() {
     let monsterLinkObject = {
       "vorkath": "9/9a/Vorkath",
       "fire giant": "1/16/Fire_giant",
       "chaos druid": "0/0e/Chaos_druid"
     };

     let monsterNames = [
       { value: 'vorkath', label: 'Vorkath'},
       { value: 'fire giant', label: 'Fire Giant'},
       { value: 'chaos druid', label: 'Chaos Druid'}
     ]

     let imageLink = "https://oldschool.runescape.wiki/images/" + monsterLinkObject[this.props.chosenMonster] + ".png"
     return (
       <div>
          {allMonsterData.attributes[0].name}
          <Image
            src={imageLink}
            width={300}
            height={300}
          />
          <div>
            <div> Combat Level: {allMonsterData.attributes[0].combatlvl}   Hitpoints: {allMonsterData.attributes[0].hitpoints}</div>
            <div> Immune to Poison?: {allMonsterData.attributes[0].immunepoison}   Immunte to Venom?: {allMonsterData.attributes[0].immunevenom}</div>
            <div> Attack Level: {allMonsterData.attributes[0].attacklvl}   Stab Attack: {allMonsterData.attributes[0].stabattack}</div>
            <div> Strength Level: {allMonsterData.attributes[0].strengthlvl}   Slash Attack: {allMonsterData.attributes[0].slashattack}</div>
            <div> Defense Level: {allMonsterData.attributes[0].defenselvl}   Crush Attack: {allMonsterData.attributes[0].crushattack}</div>
            <div> Magic Level: {allMonsterData.attributes[0].magiclvl}   Magic Attack: {allMonsterData.attributes[0].magicattack}</div>
            <div> Range Level: {allMonsterData.attributes[0].rangelvl}   Range Attack: {allMonsterData.attributes[0].rangeattack}</div>
          </div>
          <select onChange={event => this.handleChange(event)} >
            <option value="vorkath">Vorkath</option>
            <option value="fire giant">Fire Giant</option>
            <option value="chaos druid">Chaos Druid</option>
          </select>
        </div>
     );
   }
};

function mapStateToProps(state) {
  return{
    chosenMonster : state.chosenMonster
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({changeMonster: changeMonster}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(NPCInfoBox);

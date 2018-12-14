import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import Image from 'react-image-resizer';
import Select from 'select-react-redux';
import {changeMonster} from './npcInfoActions';
import allMonsterImageLinks from '../../JSONraw/allMonsterImageLinks.json';
import allMonsterData from '../../JSONraw/allMonsterData.json';



class NPCInfoBox extends Component {

  testFunction(input) {
    console.log(input);
  };

   render() {

     let imageLink = "https://oldschool.runescape.wiki/images/" + allMonsterImageLinks[this.props.chosenMonster] + ".png"
     let selectionOptions = {};

     Object.entries(allMonsterImageLinks).forEach(entry => {
       selectionOptions[entry[0]] = decodeURIComponent(entry[0].split('_').join(' '))
     });

     const onChange = (val) => {
      this.props.changeMonster(val);
     };

     return (

       <div>
          {this.props.chosenMonster.split('_').join(' ')}
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
            <Select
            onChange={onChange}
            items={selectionOptions}
            />
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

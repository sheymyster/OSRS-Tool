import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import Image from 'react-image-resizer';
import Select from 'select-react-redux';
import {changeMonster, changeMonsterVersion} from './npcInfoActions';
import allMonsterImageLinks from '../../JSONraw/allMonsterImageLinks.json';
import allMonsterData from '../../JSONraw/allNPCdata.json';
import './npc.css';



class NPCInfoBox extends Component {

  generateVersionButtons(monsterName) {
    let versions = Object.keys(allMonsterData[this.props.chosenMonster.name].versions);
    let buttons = [];
    for (let i=0; i<versions.length; i++) {
      buttons.push(<div><button onClick={() => this.props.changeMonsterVersion(versions[i])}>{versions[i]}</button></div>)
    }
    return buttons;
  }

  changeMonsterAndVersion(monster) {
    this.props.changeMonster(monster);
    let newMonsterKeys = Object.keys(allMonsterData[monster].versions);
    let initialVersion = newMonsterKeys[0];
    this.props.changeMonsterVersion(initialVersion);
  }

   render() {
     //console.log(allMonsterData.Vorkath.attributes[0].combatlvl)
     let imageLink = "https://oldschool.runescape.wiki/images/" + allMonsterImageLinks[this.props.chosenMonster.name] + ".png"
     let selectionOptions = {};

     Object.entries(allMonsterImageLinks).forEach(entry => {
       selectionOptions[entry[0]] = entry[0].split('_').join(' ').replace('%28', '(').replace('%29', ')');
     });

     return (

       <div>
          {this.props.chosenMonster.name.split('_').join(' ')}
          <Image
            src={imageLink}
            width={300}
            height={300}
          />
          <div>
            <div> Combat Level: {allMonsterData[this.props.chosenMonster.name].versions[this.props.chosenMonster.version].combat}   Hitpoints: {allMonsterData[this.props.chosenMonster.name].versions[this.props.chosenMonster.version].hitpoints}</div>
            <div> Immune to Poison: {allMonsterData[this.props.chosenMonster.name].versions[this.props.chosenMonster.version].immunepoison}</div>
            <div> Immune to Venom: {allMonsterData[this.props.chosenMonster.name].versions[this.props.chosenMonster.version].immunevenom}</div>
            <div> Attack Level: {allMonsterData[this.props.chosenMonster.name].versions[this.props.chosenMonster.version].att}   Stab Attack: {allMonsterData[this.props.chosenMonster.name].versions[this.props.chosenMonster.version].astab}</div>
            <div> Strength Level: {allMonsterData[this.props.chosenMonster.name].versions[this.props.chosenMonster.version].str}   Slash Attack: {allMonsterData[this.props.chosenMonster.name].versions[this.props.chosenMonster.version].aslash}</div>
            <div> Defense Level: {allMonsterData[this.props.chosenMonster.name].versions[this.props.chosenMonster.version].def}   Crush Attack: {allMonsterData[this.props.chosenMonster.name].versions[this.props.chosenMonster.version].acrush}</div>
            <div> Magic Level: {allMonsterData[this.props.chosenMonster.name].versions[this.props.chosenMonster.version].mage}   Magic Attack: {allMonsterData[this.props.chosenMonster.name].versions[this.props.chosenMonster.version].amage}</div>
            <div> Range Level: {allMonsterData[this.props.chosenMonster.name].versions[this.props.chosenMonster.version].range}   Range Attack: {allMonsterData[this.props.chosenMonster.name].versions[this.props.chosenMonster.version].arange}</div>
            <div> Stab Defense: {allMonsterData[this.props.chosenMonster.name].versions[this.props.chosenMonster.version].dstab}   Range Defense: {allMonsterData[this.props.chosenMonster.name].versions[this.props.chosenMonster.version].drange}</div>
            <div> Slash Defense: {allMonsterData[this.props.chosenMonster.name].versions[this.props.chosenMonster.version].dslash}   Magic Defense: {allMonsterData[this.props.chosenMonster.name].versions[this.props.chosenMonster.version].dmagic}</div>
            <div> Crush Defense: {allMonsterData[this.props.chosenMonster.name].versions[this.props.chosenMonster.version].dcrush}</div>
          </div>
            <Select
            onChange={(value) => this.changeMonsterAndVersion(value.replace('%28', '(').replace('%29', ')'))}
            items={selectionOptions}
            />
          <div className="Version-Buttons">
            {this.generateVersionButtons(this.props.chosenMonster.name)}
          </div>
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
  return bindActionCreators({
    changeMonster: changeMonster,
    changeMonsterVersion: changeMonsterVersion}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(NPCInfoBox);

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
      buttons.push(<div><button className="Version-Button" style={this.highlightVersionButton(versions[i])} onClick={() => this.props.changeMonsterVersion(versions[i])}>{versions[i]}</button></div>)
    }
    return buttons;
  }

  changeMonsterAndVersion(monster) {
    this.props.changeMonster(monster);
    let newMonsterKeys = Object.keys(allMonsterData[monster].versions);
    let initialVersion = newMonsterKeys[0];
    this.props.changeMonsterVersion(initialVersion);
  }

  highlightVersionButton(version) {
    if (this.props.chosenMonster.version === version) {
      return {
        backgroundColor: 'green'
      }
    } else {
      return
    }
  }

   render() {
     let imageLink = "https://oldschool.runescape.wiki/images/" + allMonsterImageLinks[this.props.chosenMonster.name] + ".png"
     let selectionOptions = {};
     let iconWidth = 25;
     let iconHeight = 25;
     Object.entries(allMonsterImageLinks).forEach(entry => {
       selectionOptions[entry[0]] = entry[0].split('_').join(' ').replace('%28', '(').replace('%29', ')');
     });
     let npcSelectorValue = {}
     npcSelectorValue[this.props.chosenMonster.name] = this.props.chosenMonster.name.split("_").join(" ");
     return (

       <div className="NPC-Info-Screen">
          <div className="NPC-Name">{this.props.chosenMonster.name.split('_').join(' ')}</div>
          <Image
            src={imageLink}
            width={250}
            height={250}
          />
          <div>
            <div className="NPC-Combat-HP-Row">
              <div className="NPC-Combat-HP-Item">
                <span className="NPC-Combat-HP-Title">Combat Level</span>
                <span className="NPC-Combat-HP-Span"> {allMonsterData[this.props.chosenMonster.name].versions[this.props.chosenMonster.version].combat}</span>
              </div>
              <div className="NPC-Combat-HP-Item">
                <span className="NPC-Combat-HP-Title">Hitpoints</span>
                <span className="NPC-Combat-HP-Span">{allMonsterData[this.props.chosenMonster.name].versions[this.props.chosenMonster.version].hitpoints}</span>
              </div>
            </div>
            <div className="NPC-Stats-Title-Row">
              <Image src={require('../../assets/combat_icon.png')} width={iconWidth} height={iconHeight}/>
              <span className="NPC-Stats-Title">Combat Stats</span>
            </div>
            <div className="NPC-Stats-Row">
              <div className="NPC-Stats-Row-Item">
                <Image src={require('../../assets/attack_icon.png')} width={iconWidth} height={iconHeight}/>
                <span>{allMonsterData[this.props.chosenMonster.name].versions[this.props.chosenMonster.version].att}</span>
              </div>
              <div className="NPC-Stats-Row-Item">
                <Image src={require('../../assets/strength_icon.png')} width={iconWidth} height={iconHeight}/>
                <span>{allMonsterData[this.props.chosenMonster.name].versions[this.props.chosenMonster.version].str}</span>
              </div>
              <div className="NPC-Stats-Row-Item">
                <Image src={require('../../assets/defence_icon.png')} width={iconWidth} height={iconHeight}/>
                <span>{allMonsterData[this.props.chosenMonster.name].versions[this.props.chosenMonster.version].def}</span>
              </div>
              <div className="NPC-Stats-Row-Item">
                <Image src={require('../../assets/magic_icon.png')} width={iconWidth} height={iconHeight}/>
                <span>{allMonsterData[this.props.chosenMonster.name].versions[this.props.chosenMonster.version].mage}</span>
              </div>
              <div className="NPC-Stats-Row-Item">
                <Image src={require('../../assets/ranged_icon.png')} width={iconWidth} height={iconHeight}/>
                <span>{allMonsterData[this.props.chosenMonster.name].versions[this.props.chosenMonster.version].range}</span>
              </div>
            </div>
            <div className="NPC-Stats-Title-Row">
              <Image src={require('../../assets/attack_icon.png')} width={iconWidth} height={iconHeight}/>
              <span className="NPC-Stats-Title">Aggressive Stats</span>
            </div>
            <div className="NPC-Stats-Row">
              <div className="NPC-Stats-Row-Item">
                <Image src={require('../../assets/stab_icon.png')} width={iconWidth} height={iconHeight}/>
                <span>{allMonsterData[this.props.chosenMonster.name].versions[this.props.chosenMonster.version].astab}</span>
              </div>
              <div className="NPC-Stats-Row-Item">
                <Image src={require('../../assets/slash_icon.png')} width={iconWidth} height={iconHeight}/>
                <span>{allMonsterData[this.props.chosenMonster.name].versions[this.props.chosenMonster.version].aslash}</span>
              </div>
              <div className="NPC-Stats-Row-Item">
                <Image src={require('../../assets/crush_icon.png')} width={iconWidth} height={iconHeight}/>
                <span>{allMonsterData[this.props.chosenMonster.name].versions[this.props.chosenMonster.version].acrush}</span>
              </div>
              <div className="NPC-Stats-Row-Item">
                <Image src={require('../../assets/magic_icon.png')} width={iconWidth} height={iconHeight}/>
                <span>{allMonsterData[this.props.chosenMonster.name].versions[this.props.chosenMonster.version].amagic}</span>
              </div>
              <div className="NPC-Stats-Row-Item">
                <Image src={require('../../assets/ranged_icon.png')} width={iconWidth} height={iconHeight}/>
                <span>{allMonsterData[this.props.chosenMonster.name].versions[this.props.chosenMonster.version].arange}</span>
              </div>
            </div>
            <div className="NPC-Stats-Title-Row">
              <Image src={require('../../assets/defence_icon.png')} width={iconWidth} height={iconHeight}/>
              <span className="NPC-Stats-Title">Defensive Stats</span>
            </div>
            <div className="NPC-Stats-Row">
              <div className="NPC-Stats-Row-Item">
                <Image src={require('../../assets/stab_icon.png')} width={iconWidth} height={iconHeight}/>
                <span>{allMonsterData[this.props.chosenMonster.name].versions[this.props.chosenMonster.version].dstab}</span>
              </div>
              <div className="NPC-Stats-Row-Item">
                <Image src={require('../../assets/slash_icon.png')} width={iconWidth} height={iconHeight}/>
                <span>{allMonsterData[this.props.chosenMonster.name].versions[this.props.chosenMonster.version].dslash}</span>
              </div>
              <div className="NPC-Stats-Row-Item">
                <Image src={require('../../assets/crush_icon.png')} width={iconWidth} height={iconHeight}/>
                <span>{allMonsterData[this.props.chosenMonster.name].versions[this.props.chosenMonster.version].dcrush}</span>
              </div>
              <div className="NPC-Stats-Row-Item">
                <Image src={require('../../assets/magic_icon.png')} width={iconWidth} height={iconHeight}/>
                <span>{allMonsterData[this.props.chosenMonster.name].versions[this.props.chosenMonster.version].dmagic}</span>
              </div>
              <div className="NPC-Stats-Row-Item">
                <Image src={require('../../assets/ranged_icon.png')} width={iconWidth} height={iconHeight}/>
                <span>{allMonsterData[this.props.chosenMonster.name].versions[this.props.chosenMonster.version].drange}</span>
              </div>
            </div>
            <div className="NPC-Stats-Title-Other-Bonuses">
              <span className="NPC-Stats-Title">Other Bonuses</span>
              <span className="NPC-Stats-Title">Immunities</span>
            </div>
            <div className="NPC-Stats-Row">
              <div className="NPC-Stats-Row-Item">
                <Image src={require('../../assets/attack_icon.png')} width={iconWidth} height={iconHeight}/>
                <span>{allMonsterData[this.props.chosenMonster.name].versions[this.props.chosenMonster.version].attbns}</span>
              </div>
              <div className="NPC-Stats-Row-Item">
                <Image src={require('../../assets/strength_icon.png')} width={iconWidth} height={iconHeight}/>
                <span>{allMonsterData[this.props.chosenMonster.name].versions[this.props.chosenMonster.version].strbns}</span>
              </div>
              <div className="NPC-Stats-Row-Item">
                <Image src={require('../../assets/ranged_strength_icon.png')} width={iconWidth} height={iconHeight}/>
                <span>{allMonsterData[this.props.chosenMonster.name].versions[this.props.chosenMonster.version].rngbns}</span>
              </div>
              <div className="NPC-Stats-Row-Item">
                <Image src={require('../../assets/poison_hitsplat.png')} width={iconWidth} height={iconHeight}/>
                <span>{allMonsterData[this.props.chosenMonster.name].versions[this.props.chosenMonster.version].immunepoison}</span>
              </div>
              <div className="NPC-Stats-Row-Item">
                <Image src={require('../../assets/venom_hitsplat.png')} width={iconWidth} height={iconHeight}/>
                <span>{allMonsterData[this.props.chosenMonster.name].versions[this.props.chosenMonster.version].immunevenom}</span>
              </div>
            </div>
          </div>
          <div className="NPC-Dropdown">
            <Select
            onChange={(value) => this.changeMonsterAndVersion(value.replace('%28', '(').replace('%29', ')'))}
            items={selectionOptions}
            />
          </div>
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

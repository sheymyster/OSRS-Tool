import React, { Component } from 'react';
import NPCInfoBox from '../components/npcInfoScreen/npcInfoBox';
import BoostSelectionBox from '../components/boostSelectionScreen/boostSelectionBox';
import PlayerStatBox from '../components/playerStatScreen/playerStatBox';
import OutputInformationBox from '../components/outputInformationScreen/outputInformationBox';
import GearSelectionBox from '../components/gearSelectionScreen/gearSelectionBox';
import './DPSscreen.css';


class DPSscreen extends Component {
  render() {
    return (
      <div className="Main-Container">
        <div className="NPC-Info-Container">
          <NPCInfoBox />
        </div>
        <div className="Stat-Gear-Container">
          <PlayerStatBox />
          <GearSelectionBox />
        </div>
        <div className="Boost-Container">
          <BoostSelectionBox />
        </div>
        <div className="Output-Container">
          <OutputInformationBox />
        </div>
      </div>
    );
  }
}

export default DPSscreen;

import React, { Component } from 'react';
import NPCInfoBox from './components/npcInfoScreen/npcInfoBox';
import BoostSelectionBox from './components/boostSelectionScreen/boostSelectionBox';
import PlayerStatBox from './components/playerStatScreen/playerStatBox';
import OutputInformationBox from './components/outputInformationScreen/outputInformationBox';
import GearSelectionBox from './components/gearSelectionScreen/gearSelectionBox';
import './App.css';


class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="Left-Container">
          <div className="Top-Left-Container">
            <NPCInfoBox />
            <div className="Stat-And-Gear-Container">
              <PlayerStatBox />
              <GearSelectionBox />
            </div>
            <BoostSelectionBox />
          </div>
        </div>
        <OutputInformationBox />
      </div>
    );
  }
}


export default App;

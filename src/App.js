import React, { Component } from 'react';
import NPCInfoBox from './components/npcInfoBox';
import BoostSelectionBox from './components/boostScreen';
import './App.css';


class App extends Component {
  render() {
    return (
      <div className="App">
        <NPCInfoBox />
        <BoostSelectionBox />
      </div>
    );
  }
}


export default App;

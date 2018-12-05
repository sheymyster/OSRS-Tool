import React, { Component } from 'react';
import ColorChanger from './components/testComponent';
import NPCInfoBox from './components/npcInfoBox';


class App extends Component {
  render() {
    return (
      <div className="App">
        Time to start writing code
        <ColorChanger />
        <NPCInfoBox />
      </div>
    );
  }
}


export default App;

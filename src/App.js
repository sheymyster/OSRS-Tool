import React, { Component } from 'react';
import NavigationMenu from './components/navigationMenu/navigationMenu.js';
import MainScreen from './screens/mainScreen/mainScreen.js';
import './App.css';


class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="Navigation-Menu"><NavigationMenu /></div>
        <div className="Main-Screen"><MainScreen /></div>
      </div>
    );
  }
}

export default App;

import React, { Component } from 'react';
import NavigationMenu from './components/navigationMenu/navigationMenu.js';
import MainScreen from './screens/mainScreen/mainScreen.js';
import './App.css';


class App extends Component {
  render() {
    return (
      <div className="App">
        <NavigationMenu />
        <MainScreen />
      </div>
    );
  }
}

export default App;

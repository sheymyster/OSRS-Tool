import React, { Component } from 'react';
import NavigationMenu from './components/navigationMenu/navigationMenu.js';
import MainScreen from './screens/mainScreen/mainScreen.js';
import DPSscreen from './screens/bulma-screens/bulma-dps-screen.js';
import './App.css';


/*<div className="Navigation-Menu"><NavigationMenu /></div>
<div className="Main-Screen"><MainScreen /></div>*/

class App extends Component {
  render() {
    return (
      <div class="hero hero.header hero.footer app-background">
        <div ><NavigationMenu /></div>
        <div ><DPSscreen /></div>
      </div>
    );
  }
}

export default App;

import { combineReducers } from 'redux';
import npcInfoReducer from './components/npcInfoScreen/npcInfoReducer';
import boostSelectionReducer from './components/boostSelectionScreen/boostSelectionReducer';
import playerStatReducer from './components/playerStatScreen/playerStatReducer';
import gearSelectionReducer from './components/gearSelectionScreen/gearSelectionReducer';
import outputInformationReducer from './components/outputInformationScreen/outputInformationReducer';
import magicReducer from './components/gearSelectionScreen/magicReducer';
import navigationMenuReducer from './components/navigationMenu/navigationMenuReducer';

export default combineReducers({
 chosenMonster: npcInfoReducer,
 currentBoosts: boostSelectionReducer,
 playerStats: playerStatReducer,
 playerGear: gearSelectionReducer,
 lockStatus: outputInformationReducer,
 playerMagic: magicReducer,
 navigation: navigationMenuReducer
});

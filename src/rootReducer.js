import { combineReducers } from 'redux';
import npcInfoReducer from './components/npcInfoScreen/npcInfoReducer';
import boostSelectionReducer from './components/boostSelectionScreen/boostSelectionReducer';
import playerStatReducer from './components/playerStatScreen/playerStatReducer';
import gearSelectionReducer from './components/gearSelectionScreen/gearSelectionReducer';

export default combineReducers({
 chosenMonster: npcInfoReducer,
 currentBoosts: boostSelectionReducer,
 playerStats: playerStatReducer,
 playerGear: gearSelectionReducer
});

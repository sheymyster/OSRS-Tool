import { combineReducers } from 'redux';
import npcInfoReducer from './components/npcInfoScreen/npcInfoReducer';
import boostSelectionReducer from './components/boostSelectionScreen/boostSelectionReducer';
import playerStatReducer from './components/playerStatScreen/playerStatReducer';

export default combineReducers({
 chosenMonster: npcInfoReducer,
 currentBoosts: boostSelectionReducer,
 playerStats: playerStatReducer
});

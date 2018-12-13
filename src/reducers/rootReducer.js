import { combineReducers } from 'redux';
import monsterSelectionReducer from './monsterSelectionReducer';
import boostSelectionReducer from './boostSelectionReducer';

export default combineReducers({
 chosenMonster: monsterSelectionReducer,
 currentBoosts: boostSelectionReducer
});

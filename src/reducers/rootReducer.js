import { combineReducers } from 'redux';
import testReducer from './testReducer';
import monsterSelectionReducer from './monsterSelectionReducer';

export default combineReducers({
 chosenColor: testReducer,
 chosenMonster: monsterSelectionReducer
});

import { combineReducers } from 'redux';
import preferences from './preferences';
import timer from './timer';
import sessions from './sessions';

export default combineReducers({
    preferences,
    timer,
    sessions,
});

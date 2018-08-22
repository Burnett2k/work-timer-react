import { combineReducers } from 'redux'
import preferences from './preferences'
import timer from './timer'

export default combineReducers({
  preferences,
  timer
})
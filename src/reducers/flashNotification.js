import {ACTION_TYPES} from '../constants/ActionTypes'
import Immutable from 'immutable';

const initialState = Immutable.fromJS({
  {notice: [], alert: [], error: []}
});

export default function flashNotification(state = initialState, action) {
  switch(action.type) {
    case ACTION_TYPES.SET_ERROR:
      return state
    default:
      return state;
  }
}
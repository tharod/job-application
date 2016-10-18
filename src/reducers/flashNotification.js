import * as types from '../constants/types';
import Immutable from 'immutable';

const initialState = Immutable.fromJS({
  {notice: [], alert: [], error: []}
});

export default function flashNotification(state = initialState, action) {
  switch(action.type) {
    case types.SET_ERROR:
      return state
    default:
      return state;
  }
}
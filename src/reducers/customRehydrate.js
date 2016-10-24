import * as types from '../constants/types';
import Immutable from 'immutable';
import { Map } from 'immutable'

const initialState = Immutable.fromJS(
  {rehydrated: false}
);

export default function customRehydrate(state = initialState, action) {
  var data = action.data
  switch(action.type) {
    case types.REHYDRATED_DONE:
      return state.merge({rehydrated: true})
    default:
      return state;
  }
}

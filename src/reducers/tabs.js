import * as types from '../constants/types';
import Immutable from 'immutable';
import { Map } from 'immutable'

const initialState = Immutable.fromJS(
  { activeTab: 0 }
);

export default function tabs(state = initialState, action) {
  var data = action.data
  switch(action.type) {
    case types.CHANGE_TAB_NAV:
      return state.merge({ activeTab: action.activeTab })
    default:
      return state;
  }
}

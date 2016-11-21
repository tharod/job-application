import * as types from '../constants/types';
import Immutable from 'immutable';
import { Map } from 'immutable'

const initialState = Immutable.fromJS(
  { user_id: [], submitting: null }
);

export default function searchUsers(state = initialState, action) {
  var data = action.data
  switch(action.type) {
    case types.SEARCH_USERS:
      return state.merge({ submitting: true })
    case types.SEARCH_USERS_SUCCESS:
      return state.merge({ user_id: data.user_id, submitting: false })
    case types.SEARCH_USERS_ERROR:
      return state.merge({ user_id: [], submitting: false })
    case types.SEARCH_USERS_RESET:
      return initialState
    default:
      return state;
  }
}

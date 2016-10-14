import {ACTION_TYPES} from '../constants/ActionTypes'
import Immutable from 'immutable';
import { Map } from 'immutable'

const initialState = Immutable.fromJS(
  {signed_in: false, user_id: null, token: null, errors: null }
);

export default function auth(state = initialState, action) {
  var data = action.data
  switch(action.type) {
    case ACTION_TYPES.CREATE_SESSION:
      return state.merge({signed_in: true, user_id: data.user_id, token: data.token, errors: null })
    case ACTION_TYPES.CREATE_SESSION_ERROR:
      return state.merge({signed_in: false, user_id: null, token: null, errors: data.message })
    default:
      return state;
  }
}

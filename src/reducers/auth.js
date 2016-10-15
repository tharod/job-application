import {ACTION_TYPES} from '../constants/ActionTypes'
import Immutable from 'immutable';
import { Map } from 'immutable'

const initialState = Immutable.fromJS(
  {signedIn: false, userId: null, token: null, errors: null }
);

export default function auth(state = initialState, action) {
  var data = action.data
  switch(action.type) {
    case ACTION_TYPES.CREATE_SESSION:
      return state.merge({signedIn: true, userId: data.user_id, token: data.token, errors: null })
    case ACTION_TYPES.CREATE_SESSION_ERROR:
      return state.merge({signedIn: false, userId: null, token: null, errors: data.message })
    case ACTION_TYPES.LOGOUT:
      return state.merge({signedIn: false, userId: null, token: null, errors: null })
    default:
      return state;
  }
}

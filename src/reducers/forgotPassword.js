import * as types from '../constants/types';
import Immutable from 'immutable';
import { Map } from 'immutable'

const initialState = Immutable.fromJS(
  { message: null, submitting: false }
);

export default function auth(state = initialState, action) {
  var data = action.data
  switch(action.type) {
    case types.FORGOT_PASSWORD:
      return state.merge({ submitting: true })
    case types.FORGOT_PASSWORD_SUCCESS:
      return state.merge({ submitting: false })
    case types.FORGOT_PASSWORD_ERROR:
      return state.merge({ submitting: false, message: data.message })
    default:
      return state;
  }
}

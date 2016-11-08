import * as types from '../constants/types';
import Immutable from 'immutable';
import { Map } from 'immutable'

const initialState = Immutable.fromJS(
  { users: [],  submitting: null }
);

export default function invitedJobUserDetails(state = initialState, action) {
  var data = action.data
  switch(action.type) {
    case types.INVITED_JOBS_USER_DETAILS:
      return state.merge({ submitting: true })
    case types.INVITED_JOBS_USER_DETAILS_SUCCESS:
      return state.set('users', state.get('users').push(...data));
    case types.INVITED_JOBS_USER_DETAILS_ERROR:
      return state.merge({ user_id: [], submitting: false })
    default:
      return state;
  }
}

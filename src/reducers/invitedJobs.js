import * as types from '../constants/types';
import Immutable from 'immutable';
import { Map } from 'immutable'

const initialState = Immutable.fromJS(
  { user_id: [], submitting: null }
);

export default function invitedJobs(state = initialState, action) {
  var data = action.data
  switch(action.type) {
    case types.INVITED_JOBS:
      return state.merge({ submitting: true })
    case types.INVITED_JOBS_SUCCESS:
      return state.merge({ user_id: data.user_id, submitting: false })
    case types.INVITED_JOBS_ERROR:
      return state.merge({ user_id: [], submitting: false })
    default:
      return state;
  }
}

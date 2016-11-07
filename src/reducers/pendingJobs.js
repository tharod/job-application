import * as types from '../constants/types';
import Immutable from 'immutable';
import { Map } from 'immutable'

const initialState = Immutable.fromJS(
  { job_id: [], submitting: null }
);

export default function pendingJobs(state = initialState, action) {
  var data = action.data
  switch(action.type) {
    case types.PENDING_JOB:
      return state.merge({ job_id: [], submitting: true })
    case types.PENDING_JOB_SUCCESS:
      return state.merge({ job_id: data.job_id, submitting: false })
    case types.PENDING_JOB_ERROR:
      return state.merge({ job_id: [], submitting: false })
    case types.PENDING_JOB_RESET:
      return initialState
    default:
      return state;
  }
}

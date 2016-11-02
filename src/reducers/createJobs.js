import * as types from '../constants/types';
import Immutable from 'immutable';
import { Map } from 'immutable'

const initialState = Immutable.fromJS(
  { errors: null, submitting: false }
);

export default function createJobs(state = initialState, action) {
  var data = action.data
  switch(action.type) {
    case types.CREATE_JOB:
      return state.merge({ submitting: true })
    case types.SUCCESS_CREATE_JOB:
      return state.merge({ submitting: false })
    case types.ERROR_CREATE_JOB:
      return state.merge({errors: data.message, submitting: false })
    default:
      return state;
  }
}

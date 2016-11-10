import * as types from '../constants/types';
import Immutable from 'immutable';
import { Map } from 'immutable'

const initialState = Immutable.fromJS(
  { users: [], submitting: null, message: null }
);

export default function invitedJobUserDetails(state = initialState, action) {
  var data = action.data
  switch(action.type) {
    case types.INVITED_JOBS_USER_DETAILS:
      return state.merge({ submitting: true })
    case types.INVITED_JOBS_USER_DETAILS_SUCCESS:
      return state.updateIn(['users'], user=>user.push(...data))
    case types.INVITED_JOBS_USER_UPDATE_LIKE:
      const indexOfListToUpdate = state.get('users').findIndex(list => {
        return list.get('user_id') === action.user_id;
      });
      // debugger
      if (indexOfListToUpdate===-1){
        return state
      }
      return state.setIn(['users', indexOfListToUpdate, 'is_liked'], !state.getIn(['users', indexOfListToUpdate, 'is_liked']))
    case types.INVITED_JOBS_USER_DETAILS_ERROR:
      return state.merge({ submitting: false, message: data.message })
    case types.INVITED_JOBS_USER_DETAILS_RESET:
      return initialState
    default:
      return state;
  }
}

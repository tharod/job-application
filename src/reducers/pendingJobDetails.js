import * as types from '../constants/types';
import Immutable from 'immutable';

const initialState = Immutable.fromJS(
  {posts: [], submitting: false}
);

export default function pendingJobDetails(state = initialState, action) {
  var data = action.data
  switch(action.type) {
    case types.PENDING_JOB_DETAILS:
      return state.merge({ submitting: true })
    case types.PENDING_JOB_DETAILS_SUCCESS:
      return state.set('posts', state.get('posts').push(...data));
    case types.PENDING_JOB_DETAILS_ERROR:
      return state.merge({ submitting: false })
    case types.PENDING_JOB_DETAILS_RESET:
      return initialState
    case types.PENDING_JOB_DELETE_SUCCESS:
      const index = state.get('posts').findIndex(post => post.job_id === data.job_id)
      if(index===-1){
        return state
      }else{
        return state.deleteIn(['posts', index])  
      }
      
    default:
      return state;
  }
}

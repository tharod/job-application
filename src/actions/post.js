import * as types from '../constants/types';
import * as routePath from '../constants/routePath';
import 'whatwg-fetch';

export function pendingJobs() {
  return function(dispatch){
    dispatch({ type: types.PENDING_JOB })
    const url = API_URL + routePath.PENDING_JOB
    fetch(url, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({})
      })
      .then(function(response){
        return(response.json());
      })
      .then(function(data){
        if (data.result==0){
          dispatch({
            type: types.PENDING_JOB_SUCCESS,
            data: data
          })
        }else{
          dispatch({
            type: types.PENDING_JOB_ERROR,
            data: data
          })
        }
      })
      .catch(function(error){
        console.log("Opps...", "Error while pendingjob access:: " + error);
      })
  }
}

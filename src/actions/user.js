import * as types from '../constants/types';
import 'whatwg-fetch';

// processType mean: like or unlike
export function likeUnlikeUser(user_id, is_liked, actionType='invitedUser') {
  const uri = is_liked ? '/users/unlike' : '/users/like'
  return function(dispatch){
    const url = API_URL + uri;
    fetch(url, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({user_id: user_id})
      })
      .then(function(response){
        return(response.json());
      })
      .then(function(data){
        if (data.result==0){
          if(actionType==='invitedUser'){
            dispatch({
              type: types.INVITED_JOBS_USER_UPDATE_LIKE,
              user_id: user_id
            })
          }else{
            dispatch({
              type: types.SEARCH_USER_DETAILS_LIKE,
              user_id: user_id
            })
          }
        }else{
          dispatch({
            type: types.INVITED_JOBS_USER_DETAILS_ERROR,
            data: data
          })
        }
      })
      .catch(function(error){
        console.log("Opps...", "Error while create LIKE_UNLIKE_USER:: " + error);
      })
  }
}

export function inviteUserHandler(user_id) {
  return function(dispatch){
    dispatch({
      type: types.SEARCH_USER_INVITE,
      user_id: user_id
    })
  }
}


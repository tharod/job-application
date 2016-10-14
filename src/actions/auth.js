import {ACTION_TYPES} from '../constants/ActionTypes'
import 'whatwg-fetch';

export function createSession({email}, {password}) {
  return function(dispatch){
    const url = "http://localhost:3000/session/create";
    fetch(url, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: email,
          password: password,
        })
      })
      .then(function(response){
        return(response.json());
      })
      .then(function(data){
        if (data.result==0){
          dispatch({
            type: ACTION_TYPES.CREATE_SESSION,
            data: data
          })
        }else{
          dispatch({
            type: ACTION_TYPES.CREATE_SESSION_ERROR,
            data: data
          })
        }
      })
      .catch(function(error){
        console.log("Opps...", "Error while create createSession:: " + error);
      })
  }
  
}

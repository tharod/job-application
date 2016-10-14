import {ACTION_TYPES} from '../constants/ActionTypes'
import 'whatwg-fetch';

export function createSession() {
  var email = 'test@test.com'
  var password = '111111aA'
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
        // console.log("========first then======", response)
        return(response.json());
      })
      .then(function(data){
        if (data.result==0){
          dispatch({
            type: ACTION_TYPES.CREATE_SESSION,
            auth: data
          })
        }else{

        }
        // console.log("=======second then ", data)
      })
      .catch(function(error){
        console.log("Opps...", "Error while create createSession:: " + error);
      })
  }
  
}

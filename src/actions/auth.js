import {ACTION_TYPES} from '../constants/ActionTypes'
import 'whatwg-fetch';
import { browserHistory } from 'react-router';

export function createSession({email, password}) {
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
          browserHistory.push('/search-job')
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

export function destroySession() {
  return function(dispatch){
    dispatch({
      type: ACTION_TYPES.LOGOUT
    })

    browserHistory.push('/')
  }
}

export function createUser({email, password, country, firstName, lastName}) {
  return function(dispatch){
    const url = API_URL + '/users'
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
          first_name: firstName,
          last_name: lastName,
          country: country
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
          browserHistory.push('/search-job')
        }else{
          dispatch({
            type: ACTION_TYPES.CREATE_SESSION_ERROR,
            data: data
          })
        }
      })
      .catch(function(error){
        console.log("Opps...", "Error while create user:: " + error);
      })
  }
}

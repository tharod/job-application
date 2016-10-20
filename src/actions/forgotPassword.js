import * as types from '../constants/types';
import 'whatwg-fetch';

import { push } from 'react-router-redux';

export function forgotPassword({email}) {
  return function(dispatch){
    dispatch({ type: types.FORGOT_PASSWORD })
    const url = API_URL + "/users/forgot_password";
    fetch(url, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: email
        })
      })
      .then(function(response){
        return(response.json());
      })
      .then(function(data){
        console.log("===================data forgotPassword==========", data)
        if (data.result==0){
          dispatch({
            type: types.FORGOT_PASSWORD_SUCCESS
          })
          dispatch(push('/login'));
        }else{
          dispatch({
            type: types.FORGOT_PASSWORD_ERROR,
            data: data
          })
        }
      })
      .catch(function(error){
        console.log("Opps...", "Error while create createSession:: " + error);
      })
  }
}

import * as types from '../constants/types';
import * as routePath from '../constants/routePath';
import 'whatwg-fetch';
import { push } from 'react-router-redux';
// import _ from 'lodash';

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

export function newPostJob({title, budget, categories, payType, description, lasting, privacy}) {
    let hour_rate=null
    let fixed_price = null

    if(payType==='hour_rate'){
      hour_rate = budget
      fixed_price = null
    }

    if(payType==='fixed_rate'){
      hour_rate = null
      fixed_price = budget
    }
  
    const hash = {title: title, description: description, currency: 1, budget: fixed_price, hour_rate: hour_rate, pay_type: payType, category: categories, lasting: lasting, privacy: privacy}
    
    alert(JSON.stringify(hash))

  return function(dispatch){
    dispatch({ type: types.CREATE_JOB })
    dispatch({
      type: types.SUCCESS_CREATE_JOB,
      data: {}
    })

       


    dispatch(push('/post?active=pendingJobs'));
  }
}

function sortingData(arr, keyArr){
  const sorted = []
  keyArr.map(function(value, index){
    arr.map(function(v1, i1){
      if(v1.job_id===value){
        sorted.push(v1)
      }
    })
  })
 return sorted
}

export function pendingJobDetails(ids) {
  return function(dispatch){
    let promises = [];

    dispatch({ type: types.PENDING_JOB_DETAILS })
    const url = API_URL + routePath.PENDING_JOB_DETAILS
    let datas = []
    ids.map(function(id, index){
      let promise = fetch(url, {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            id: id
          })
        })
        .then(function(response){
          return(response.json());
        })
        .then(function(data){
          if (data.result==0){
            datas.push(data)
          }else{
            dispatch({
              type: types.PENDING_JOB_DETAILS_ERROR
            })
          }
        })
        .catch(function(error){
          console.log("Opps...", "Error while PENDING_JOB_DETAILS access:: " + error);
        })
      promises.push(promise)
    })
    return Promise.all(promises).then(() => {
      dispatch({
        type: types.PENDING_JOB_DETAILS_SUCCESS,
        data: sortingData(datas, ids)
      })
    });


  }
}

export function deletePendingJobPost(id) {
  return function(dispatch){
    // dispatch({ type: types.PENDING_JOB_DELETE })
    dispatch({
      type: types.PENDING_JOB_DELETE_SUCCESS,
      data: {job_id: id}
    })
  }
}


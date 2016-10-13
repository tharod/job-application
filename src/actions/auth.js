import {ACTION_TYPES} from '../constants/ActionTypes'

export function createSession() {
  return function(dispatch){
    dispatch({
      type: ACTION_TYPES.CREATE_SESSION,
      feeds: data.feeds
    })
  }
}

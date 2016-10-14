import {ACTION_TYPES} from '../constants/ActionTypes'
import Immutable from 'immutable';
import { Map } from 'immutable'

const initialState = Immutable.fromJS(
  {signed_in: true, user_id: null, token: null, errors: null }
);

export default function auth(state = initialState, action) {
  console.log("========state & initialState=========", state, initialState)
  switch(action.type) {
    case ACTION_TYPES.CREATE_SESSION:
      return state.setIn(['signed_in'], false)
    default:
      console.log("========default state", state)
      return state;
  }
}

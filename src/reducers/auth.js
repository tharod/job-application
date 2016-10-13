import {ACTION_TYPES} from '../constants/ActionTypes'
import Immutable from 'immutable';

const initialState = Immutable.fromJS({
  auth: {signed_in: false, user_id: null, token: null, message: null }
});

export default function auth(state = initialState, action) {
  switch(action.type) {
    case ACTION_TYPES.CREATE_SESSION:
      console.log("login page")
      return state;
    default:
      return state;
  }
}

import { combineReducers } from 'redux';
import PageLoaderReducer from './pageLoader';
import { routerReducer } from 'react-router-redux'

const rootReducer = combineReducers({
  routing: routerReducer,
  pageLoader: PageLoaderReducer
});

export default rootReducer;

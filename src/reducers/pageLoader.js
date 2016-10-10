export default function pageLoader(state = {isFetching: false}, action) {
  switch(action.type) {
    case 'PAGE_LOADER':
      console.log(action)
      return {...state, isFetching: true}
    case 'STOP_PAGE_LOADER':
      console.log(action)
      return {...state, isFetching: false}
    default:
      return state;
  }
}
import { createStore, combineReducers } from 'redux'

import looReducer from './reducers/looReducer'
// import all reducers here

const rootReducer = combineReducers({
  looReducer
  // put reducers here
})

const store = createStore(rootReducer)

export default store
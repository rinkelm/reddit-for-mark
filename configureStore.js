import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
import subredditReducer from './reducers/subreddit'

const loggerMiddleware = createLogger()

export default function configureStore(preloadedState) {
  return createStore(
    subredditReducer,
    preloadedState,
    applyMiddleware(thunkMiddleware)
  )
}
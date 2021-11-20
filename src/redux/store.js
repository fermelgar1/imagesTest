import {createStore, combineReducers, compose, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import imageReducer from './imagesDucks'

const rootReducer = combineReducers({
  images: imageReducer,
})

const generateStore = () => {
  const store = createStore(rootReducer, compose(applyMiddleware(thunk)))
  return store
}

export default generateStore

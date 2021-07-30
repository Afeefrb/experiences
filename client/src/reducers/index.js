import {combineReducers} from 'redux'
import posts from './posts'
import auth from './auth'

//Exports to src/ > index.js (provider)
export default combineReducers({ posts, auth })
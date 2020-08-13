import {combineReducers} from 'redux'
import posts from './posts'
import users from './users'
import my_challenges from './my_challenges'
import notes from './notes'

const rootReducer = combineReducers({
    posts, users, my_challenges, notes
})

export default rootReducer
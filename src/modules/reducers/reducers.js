import {combineReducers} from 'redux'
import posts from './posts'
import users from './users'
import my_challenges from './my_challenges'
import notes from './notes'
import comments from './comments'
import follows from './follows'
import current_my_challenge from './current_my_challenge'

const rootReducer = combineReducers({
    posts, users, my_challenges, notes, comments, follows, current_my_challenge 
})

export default rootReducer
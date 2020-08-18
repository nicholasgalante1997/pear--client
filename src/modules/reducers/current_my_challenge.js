const current_my_challenge = (state={}, action) => {
    switch(action.type){
        case 'SET_CURRENT_MY_CHALLENGE': 
            return action.payload.value 
        default:
            return state
    }
}

export default current_my_challenge;
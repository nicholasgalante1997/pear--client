const my_challenges = (state=[], action) => {
    switch(action.type){
        case 'FETCH_MY_CHALLENGES': 
            return action.payload.value 
        case 'ADD_MY_CHALLENGE': 
            return [...state, action.payload.value]
        case 'UPDATE_MY_CHALLENGE': 
            return [...state.filter(my_challenge => my_challenge.id !== action.payload.value.id), action.payload.value]
        default: 
            return state
    }
}

export default my_challenges
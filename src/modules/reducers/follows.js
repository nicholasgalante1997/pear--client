const follows = (state=[], action) => {
    switch(action.type){
        case 'FETCH_FOLLOWS': 
            return action.payload.value 
        case 'ADD_FOLLOW': 
            return [...state, action.payload.value]
        case 'REMOVE_FOLLOW': 
            return [...state].filter(follow => follow.id !== action.payload.value)
            return
        default: 
            return state
    }
}

export default follows
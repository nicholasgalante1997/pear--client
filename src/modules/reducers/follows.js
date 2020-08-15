const follows = (state=[], action) => {
    switch(action.type){
        case 'FETCH_FOLLOWS': 
            return action.payload.value 
        case 'ADD_FOLLOW': 
            return [...state, action.payload.value]
        default: 
            return state
    }
}

export default follows
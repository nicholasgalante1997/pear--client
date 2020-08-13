const notes = (state=[], action) => {
    switch(action.type){
        case 'FETCH_NOTES':
            return action.payload.value
        case 'ADD_NOTE': 
            return [...state, action.payload.value]
        default: 
            return state
    }
}

export default notes
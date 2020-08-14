const comments = (state=[], action) => {
    switch(action.type){
        case 'FETCH_COMMENTS': 
            return action.payload.value 
        case 'ADD_COMMENT': 
            return [...state, action.payload.value]
        case 'UPDATE_COMMENT': 
            return [...state.filter(comment => comment.id !== action.payload.value.id), action.payload.value] 
        default: 
            return state
    }
}

export default comments 
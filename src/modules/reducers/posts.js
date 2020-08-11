const posts = (state=[], action) => {
    switch(action.type){
        case 'FETCH_POSTS': 
            return action.payload.value
        case 'ADD_POST':
            return [...state, action.payload.value]
        case 'ADD_COMMENT': 
        // need to take the comments that are associated with the post
        // and add in new comment 
       let post = state.find(post => post.id === action.payload.value.post.id)
        console.log(state, action.payload.value, post)
            return ""
        default: 
            return state 
    }
}

export default posts
let setPosts = posts => ({type: 'FETCH_POSTS', payload: {value: posts}})

let addPost = post => ({type: 'ADD_POST', payload: {value: post}})

let addComment = comment => ({type: 'ADD_COMMENT', payload: {value: comment}})

export {setPosts, addPost, addComment}
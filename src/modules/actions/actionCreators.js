let setPosts = posts => ({type: 'FETCH_POSTS', payload: {value: posts}})

let addPost = post => ({type: 'ADD_POST', payload: {value: post}})

let addComment = comment => ({type: 'ADD_COMMENT', payload: {value: comment}})

let setUsers = users => ({type: 'FETCH_USERS', payload: {value: users}})

export {setPosts, addPost, addComment, setUsers}
// ACTION CONTROLLER FOR REDUX STATE

// POSTS ACTIONS
let setPosts = posts => ({type: 'FETCH_POSTS', payload: {value: posts}})
let addPost = post => ({type: 'ADD_POST', payload: {value: post}})
let updatePost = post => ({type: 'UPDATE_POST', payload: {value: post}})

// USERS ACTIONS
let setUsers = users => ({type: 'FETCH_USERS', payload: {value: users}})
let addUser = user => ({type: 'ADD_USER', payload: {value: user}})

// CHALLENGE ACTIONS
let setMyChallenges = my_challenges => ({type: 'FETCH_MY_CHALLENGES', payload: {value: my_challenges}})
let addMyChallenge = my_challenge => ({type: 'ADD_MY_CHALLENGE', payload: {value: my_challenge}})

// MY CHALLENGE ACTIONS
let updateMyChallenge = my_challenge => ({type: 'UPDATE_MY_CHALLENGE', payload: {value: my_challenge}})

// NOTE ACTIONS
let setNotes = notes => ({type: 'FETCH_NOTES', payload: {value: notes}})
let addNote = note => ({type: 'ADD_NOTE', payload: {value: note}})

// COMMENT ACTIONS
let setComments = comments => ({type: 'FETCH_COMMENTS', payload: {value: comments}})
let addComment = comment => ({type: 'ADD_COMMENT', payload: {value: comment}})
let updateComment = comment => ({type: 'UPDATE_COMMENT', payload: {value: comment}})



export {setPosts, addPost, addComment, setUsers, setMyChallenges, updateMyChallenge, addMyChallenge, setNotes, addNote, setComments, updatePost, updateComment, addUser}
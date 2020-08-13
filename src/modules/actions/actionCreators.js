let setPosts = posts => ({type: 'FETCH_POSTS', payload: {value: posts}})

let addPost = post => ({type: 'ADD_POST', payload: {value: post}})

let addComment = comment => ({type: 'ADD_COMMENT', payload: {value: comment}})

let setUsers = users => ({type: 'FETCH_USERS', payload: {value: users}})

let setMyChallenges = my_challenges => ({type: 'FETCH_MY_CHALLENGES', payload: {value: my_challenges}})

let addMyChallenge = my_challenge => ({type: 'ADD_MY_CHALLENGE', payload: {value: my_challenge}})

let updateMyChallenge = my_challenge => ({type: 'UPDATE_MY_CHALLENGE', payload: {value: my_challenge}})

let setNotes = notes => ({type: 'FETCH_NOTES', payload: {value: notes}})

let addNote = note => ({type: 'ADD_NOTE', payload: {value: note}})


export {setPosts, addPost, addComment, setUsers, setMyChallenges, updateMyChallenge, addMyChallenge, setNotes, addNote}
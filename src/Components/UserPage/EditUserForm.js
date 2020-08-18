import React, { Component } from 'react'; 

class EditUserForm extends Component {
    state = { 
        bio: "",
        img_url: "",
        programming_preferences: ""
     }

    //  LIFECYCLE
    componentDidMount(){
        this.setCurrentUserAttributesToState()
    }

    componentDidUpdate(prevProps, prevState){
        if (prevProps.currentUser !== this.props.currentUser){
            this.setCurrentUserAttributesToState()
        }
    }

    // THIS IS A SAFETY CHECK FOR THE EDIT FORM SENDING BLANK VALUES
    setCurrentUserAttributesToState = () => {
        this.setState({
            bio: this.props.currentUser.bio,
            img_url: this.props.currentUser.img_url,
            programming_preferences: this.props.currentUser.programming_preferences
        })
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit = (event) => {
        event.preventDefault()
        fetch(`http://localhost:3001/api/v1/users/${this.props.currentUser.id}`, {
            method: 'PATCH',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(this.state)
        })
        .then(r => r.json())
        .then(response => {
            this.setState({
            bio: "",
            img_url: "",
            programming_preferences: ""
        })
            this.props.updateCurrentUser(response)
        })
    }

    render() { 
        return ( 
            <form onSubmit={this.handleSubmit}>
                <label>Edit Bio</label>
                <input type='text' name='bio' value={this.state.bio} onChange={this.handleChange} placeholder={this.props.currentUser.bio}/>
                <label>Edit Avatar</label>
                <input type='text' name='img_url' value={this.state.img_url} onChange={this.handleChange} placeholder={this.props.currentUser.img_url}/>
                <label>Edit Programming Preferences</label>
                <input type='text' name='programming_preferences' value={this.state.programming_preferences} onChange={this.handleChange} placeholder={this.props.currentUser.programming_preferences}/>
                <button type='submit'>Donezo</button>
            </form>
         );
    }
}
 
export default EditUserForm;
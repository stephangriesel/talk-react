import React, { Component } from 'react';
import axios from 'axios';

class SignUp extends Component {

    state = {
        username: "",
        password: ""
    }

    handleChange = (event) => {
        const {name, value} = event.target
        this.setState({[name]: value})
    }

    handleSubmit = (event)=> {
        event.preventDefault()
        let newUser = this.state
        axios({
               method: "post",
               url: "http://localhost:5000/api/signup", 
               data: newUser,
               withCredentials: true,
            })
            .then((response)=> {
                debugger
                console.log("Success")
                this.props.loggedIn({loggedIn: true, user: response.data})
                this.props.history.push("/topics") // signup working but not being redirected
            })
            .catch((err)=> {
                console.log("Error error")
            })
    }

    render() {
        return (
            <div className="signupForm">
                <form onSubmit={this.handleSubmit}> 
                    <div>
                        {/* <label>Username:</label> */}
                        <input type="text" onChange={this.handleChange} name="username" placeholder="USERNAME" value={this.state.username} />
                    </div>
                    <div>
                        {/* <label>Password:</label> */}
                        <input type="password" name="password" onChange={this.handleChange} placeholder="PASSWORD" value={this.state.password} />
                    </div>
                    <div>
                        <button type="submit" value="Submit">SIGN UP</button>
                    </div>
                </form>
            </div>
        )
    }
}

export default SignUp;
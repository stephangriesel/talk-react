import React, { Component } from 'react';
import '../../css/Auth.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import AuthService from './auth-service';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: ""
        };
        this.service = new AuthService();
    }

    handleSubmit = (event) => {
        event.preventDefault()
        const username = this.state.username; // <<
        const password = this.state.password; // <<
        this.service.login(username,password) // <<
        let newUser = this.state
        axios({
            method: "post",
            url: "http://localhost:5000/api/login", // can see it is working but is not redirecting
            data: newUser,
            withCredentials: true,
        })
            .then((response) => {
                this.setState({ username: "", password: "" }); // <<
                this.props.getUser(response) // <<
                let data = response.data
                this.props.loggedIn({ loggedIn: true, user: data })
                debugger
                this.props.history.push("/topics") // not redirecting to topics
            })
            .catch((err) => {
                this.props.history.push({ pathname: "/login", state: { message: "unauthorized" } })
            })
    }

    handleChange = (event) => {
        let updateInput = {}
        updateInput[event.target.name] = event.target.value
        this.setState(updateInput)
    }

    render() {
        return (
            <div className="loginForm">
                <form onSubmit={this.handleSubmit}>
                    <div>
                        {/* <label>Username:</label> */}
                        <input type="text" name="username" onChange={this.handleChange} placeholder="USERNAME" value={this.state.username} />
                    </div>
                    <div>
                        {/* <label>Password:</label> */}
                        <input type="password" onChange={this.handleChange} name="password" placeholder="PASSWORD" value={this.state.password} />
                    </div>
                    <div>
                        <button type="submit" value="Submit">LOG IN</button>
                    </div>
                </form>
            </div>
        )
    }
}

export default Login;
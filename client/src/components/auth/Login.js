import React, { Component } from 'react';
import '../../css/Auth.css';
import axios from 'axios';
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

    handleChange = (event) => {
        let updateInput = {}
        updateInput[event.target.name] = event.target.value
        this.setState(updateInput)
    }

    handleSubmit = (event)=> {
        event.preventDefault()
        let newUser = this.state
        axios({
            method: "post",
            url: "http://localhost:5000/api/login", // can see it is working but is not redirecting
            data: newUser,
            withCredentials: true,
        })
        .then((response)=> {
            let data = response.data
            this.props.loggedIn({loggedIn: true, user: data})
            this.props.history.push("/")
            debugger
        })

            .catch((err) => {
                this.props.history.push({ pathname: "/login", state: { message: "unauthorized" } })
            })
    }

    render() {
        return (
            <div className="loginForm">
                <form onSubmit={this.handleSubmit}>
                    <div>
                        <input type="text" name="username" onChange={this.handleChange} placeholder="USERNAME" value={this.state.username} />
                    </div>
                    <div>
                        <input type="password" onChange={this.handleChange} name="password" placeholder="PASSWORD" value={this.state.password} />
                    </div>
                    <div>
                        <button type="submit" value="Submit">LOG IN</button>
                    </div>
                </form>

                <p>{this.props.location && this.props.location.state? this.props.location.state.message:""}</p> {/* STATUS MESSAGE */}

            </div>
        )
    }
}

export default Login;
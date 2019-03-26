import React, { Component } from 'react';
import '../../css/Auth.css';


class Login extends Component {
    render() {
        return (
            <div className="loginForm">
            <form action="/login" method="post">
                <div>
                    {/* <label>Username:</label> */}
                    <input type="text" name="username" placeholder="USERNAME" />
                </div>
                <div>
                    {/* <label>Password:</label> */}
                    <input type="password" name="password" placeholder="PASSWORD"/>
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
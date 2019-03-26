import React, { Component } from 'react';

class SignUp extends Component {
    render() {
        return (
            <div className="signupForm">
                <form action="/signup" method="post">
                    <div>
                        {/* <label>Username:</label> */}
                        <input type="text" name="username" placeholder="USERNAME" />
                    </div>
                    <div>
                        {/* <label>Password:</label> */}
                        <input type="password" name="password" placeholder="PASSWORD"/>
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
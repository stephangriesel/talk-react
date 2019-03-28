import React, { Component } from 'react';
import '../../css/Logout.css';
import axios from "axios";
// import AuthService from './auth-service';


class Logout extends Component {

    constructor(props) {
        super(props)
        debugger
    }

    // logout = () => {
    //     debugger
    //     this.setState({ username: {}, loggedIn: false })
    //     localStorage.setItem("state", "{}")
    // }

    logMeOut = () => {
        debugger
        axios({
            method: "POST",
            url: "http://localhost:5000/api/logout",
            withCredentials: true,
        })
            .then((response) => {
                // this.props.loggedIn({ loggedIn: false, user: data })
                this.props.logout()
                debugger
            })
            .catch((error) => {
                console.log(error)
            })
    }

    render() {
        return (
            <div className="statusMsg">
                <button className="button is-primary" onClick={this.logMeOut}>Logout</button>
            </div>
        )
    }
}

export default Logout;
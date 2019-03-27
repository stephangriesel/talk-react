import React, { Component } from 'react';
import '../../css/Logout.css';
import axios from "axios";

class Logout extends Component {

    constructor(props) {
        super(props)
        debugger
    }
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
            })
            .catch((error) => {
                console.log(error)
            })
    }

    render() {
        return (
            <div className="statusMsg">
                <h1>Procced to logout? <i className="fas fa-hand-peace"></i></h1>
                <button onClick={this.logMeOut}>Logout</button>
            </div>
        )
    }
}

export default Logout;
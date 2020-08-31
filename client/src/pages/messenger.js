import React, { Component } from "react";
import socketIOClient, { Socket } from "socket.io-client";
import Chatbox from "../components/Chatbox";


class Messenger extends Component {
    state = {
        message: ""
    }

    handleInputChange = event => {
        this.setState({ message: event.target.value })
    }
    
    render() {
        return (
            <div className="container">
            <Chatbox message={this.state.message} handleInputChange={this.handleInputChange} />
            </div>
        )
    }
}

export default Messenger;
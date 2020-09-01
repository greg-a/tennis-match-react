import React, { Component, useRef, useEffect } from "react";
import Chatbox from "../components/Chatbox";
import io from 'socket.io-client';

class Messenger extends Component {
    state = {
        message: ""
    };

    componentDidMount() {
        this.socketConnect();
    }

    handleInputChange = event => {
        this.setState({ message: event.target.value })
    };

    pushSendMessage = event => {
        if (event.key === "Enter") {
            event.preventDefault();
            alert("Message sent: " + this.state.message);
            this.setState({ message: "" });
        }
    };

    socketConnect = () => {
        const socket = io();
        socket.on('connect', () => {
            console.log(socket.connected); 
          });
    }
    
    render() {
        return (
            <div className="container">
                <Chatbox message={this.state.message} handleInputChange={this.handleInputChange} pushSendMessage={this.pushSendMessage} />
            </div>
        )
    }
}

export default Messenger;
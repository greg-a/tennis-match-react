import React, { Component, useRef, useEffect } from "react";
import io from 'socket.io-client';

class Messenger extends Component {
    state = {
        message: "",
        messages: []
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
            const socket = io();

            socket.emit("message", this.state.message);

            this.setState({ message: "" });
        }
    };

    socketConnect = () => {
        const socket = io();
        socket.on('connect', () => {
            console.log("connected to socket");
        });

        socket.on("newMessage", message => {
            this.setState(state => {
                const messages = state.messages.concat(message);

                return { messages };
            })

            return () => {
                socket.disconnect()
            }
        })
    };

    render() {
        return (
            <div className="container">
                <ul class="list-group messages-list p-5">
                    {this.state.messages.map(message => (
                        <li className="list-group-item">
                            {message}
                        </li>
                    ))}
                </ul>
                <div className="input-group pr-5">
                    <div className="input-group-prepend">
                        <span className="input-group-text">Message</span>
                    </div>
                    <textarea className="form-control" aria-label="With textarea" onChange={this.handleInputChange} onKeyDown={this.pushSendMessage} value={this.state.message}></textarea>
                </div>
            </div>
        )
    }
}

export default Messenger;
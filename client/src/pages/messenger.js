import React, { Component, useRef, useEffect } from "react";
import io from 'socket.io-client';

class Messenger extends Component {
    state = {
        sendMessage: "",
        viewMessages: [],
        username: "",
        room: "",
        friends: ["Jarrett", "Patrick"]
    };

    getProfileInfo = () => {
        fetch("/api/profile")
            .then(res => res.json())
            .then((profileInfo) => {
                console.log(profileInfo);
                this.setState({
                    username: profileInfo.username
                })
            })
            .catch(err => console.log(err));
    }

    componentDidMount() {
        this.getProfileInfo();
    }

    handleInputChange = event => {
        if (event.type === "click") {
            //sends request to server to join a room based on click event
            this.setState({ room: event.target.innerHTML });
            const username = this.state.username;
            const room = event.target.innerHTML;
            const socket = io();

            //sends server username and name of room
            socket.emit("joinRoom", { username, room });

            //listens for new messages being emitted by the socket server
            socket.on("output", data => {
                console.log(data)
                this.setState(state => {
                    const viewMessages = state.viewMessages.concat(data);
                    return { viewMessages };
                })
    
                return () => {
                    socket.disconnect()
                }
            })
        
        }
        else {
            this.setState({ sendMessage: event.target.value });
        }
    };

    // sends message to socket server
    pushSendMessage = event => {
        if (event.key === "Enter") {
            event.preventDefault();
            const socket = io();

            socket.emit("input", {
                user: this.state.username,
                message: this.state.sendMessage,
                room: this.state.room
            });

            this.setState({ sendMessage: "" });
        }
    };

    render() {
        return (
            <div className="container">
                <h2>{this.state.room}</h2>
                <ul className="list-group messages-list p-5">
                    {this.state.viewMessages.map(data => (
                        <li className="list-group-item">
                            {data.user}: {data.message}
                        </li>
                    ))}
                </ul>
                <div className="input-group pr-5">
                    <div className="input-group-prepend">
                        <span className="input-group-text">Message</span>
                    </div>
                    <textarea className="form-control" aria-label="With textarea" placeholder="Send message..." name="sendMessage" onChange={this.handleInputChange} onKeyDown={this.pushSendMessage} value={this.state.sendMessage}></textarea>
                </div>
                <ul className="list-group messages-list p-5">
                    {this.state.friends.map(friend => (
                        <li className="list-group-item list-group-item-action" name="room" onClick={this.handleInputChange}>
                            {friend}
                        </li>
                    ))}
                </ul>
            </div>
        )
    }
}

export default Messenger;
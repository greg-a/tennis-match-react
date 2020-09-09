import React, { Component } from "react";
import io from 'socket.io-client';
import Nav from "../components/Nav";

class Messenger extends Component {
    state = {
        sendMessage: "",
        allMessages: [],
        showMessages: [],
        user: {},
        sendTo: {},
        room: "",
        users: [],
        userSearch: "",
        navValue: "tab-one"
    };

    
    componentDidMount() {
        this.getProfileInfo();
    };


    getProfileInfo = () => {
        fetch("/api/profile")
            .then(res => res.json())
            .then((profileInfo) => {
                console.log(profileInfo);
                this.setState({
                    user: {
                        username: profileInfo.username,
                        userid: profileInfo.id
                    }
                })
            })
            .catch(err => console.log(err));

        fetch("/api/messages")
            .then(res => res.json())
            .then((messages) => {
                console.log("messages: " + JSON.stringify(messages));
                let messagesArr = [];
                messages.forEach(message => {
                    let newMessage = {
                        message: "",
                        sender: "",
                        recipient: ""
                    }
                    newMessage.message += message.message
                    newMessage.sender += message.sender.username
                    newMessage.recipient += message.recipient.username
                    messagesArr.push(newMessage);
                })
                this.setState({ allMessages: messagesArr });
                console.log("state: " + JSON.stringify(this.state.allMessages))
            })
            .catch(err => console.log(err));
    };

    handleUserSearch = event => {
        fetch("api/users/" + event.target.value)
            .then(res => res.json())
            .then((users) => {
                console.log(users);
                this.setState({ users: users })
            })
            .catch(err => console.log(err));

        console.log(event.target.value)
    };

    handleInputChange = event => {
        if (event.type === "click") {
            //sends request to server to join a room based on click event
            const username = this.state.user.username;
            const recipientUsername = event.target.dataset.recipient;
            const recipientId = event.target.dataset.friendid;
            const room = event.target.dataset.friendid + "+" + this.state.user.userid;
            const socket = io();

            this.setState({ sendTo: { id: recipientId, username: recipientUsername },room: room, showMessages: this.state.allMessages.filter(data => data.recipient === recipientUsername || data.sender === recipientUsername) });

            //sends server username and name of room
            socket.emit("joinRoom", { username, room });

            //listens for new messages being emitted by the socket server
            socket.on("output", data => {
                console.log(data);
                this.setState(state => {
                    const allMessages = state.allMessages.concat(data);
                    return { allMessages };
                });

                return () => {
                    socket.disconnect()
                };
            });

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
                user: this.state.user.username,
                message: this.state.sendMessage,
                room: this.state.room
            });

            fetch("/api/message", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    message: this.state.sendMessage,
                    secondUser: this.state.sendTo.id
                })
            })
                .then(res => {
                    console.log("Your message was sent!");
                    console.log(res);
                })
                .catch(err => console.log(err));

            this.setState({ sendMessage: "" });
        }
    };

    render() {
        return (
            <div>
                <Nav
                    value={this.state.navValue}
                />
                <div className="container">
                    <h2>{this.state.sendTo.username}</h2>
                    <ul className="list-group messages-list p-5">
                        {this.state.showMessages.map(data => (
                            <li className="list-group-item">
                                {data.sender}: {data.message}
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
                        <input type="text" className="form-control" placeholder="Username" aria-label="Username" aria-describedby="basic-addon1" onChange={this.handleUserSearch}></input>
                        {this.state.users.map(user => (
                            <li className="list-group-item list-group-item-action" name="room" onClick={this.handleInputChange} data-friendid={user.id} data-recipient={user.username}>
                                {user.username}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        )
    }
}

export default Messenger;
import React, { Component } from "react";
import io from 'socket.io-client';
import Nav from "../components/Nav";
import "./style.css";

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
        navValue: ""
    };


    componentDidMount() {
        this.getProfileInfo();
        console.log("this is a new day: " + new Date);
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
                        recipient: "",
                        timeStamp: ""
                    };

                    newMessage.message += message.message;
                    newMessage.sender += message.User.username;
                    newMessage.recipient += message.recipient.username;
                    newMessage.timeStampe += message.createdAt;
                    messagesArr.push(newMessage);
                })
                this.setState({ allMessages: messagesArr });
                console.log("state: " + JSON.stringify(this.state.allMessages))
            })
            .catch(err => console.log(err));
    };

    handleUserSearch = event => {
        fetch("api/username?username=" + event.target.value)
            .then(res => res.json())
            .then((users) => {
                console.log(users);
                this.setState({ users: users })
            })
            .catch(err => console.log(err));

        console.log(event.target.value)
    };

    createRoom = (x, y) => {
        if (x > y) {
            return x + "+" + y
        }
        else {
            return y + "+" + x
        }
    }

    handleInputChange = event => {
        if (event.type === "click") {
            //sends request to server to join a room based on click event
            const username = this.state.user.username;
            const recipientUsername = event.target.dataset.recipient;
            const recipientId = event.target.dataset.friendid;
            const room = this.createRoom(event.target.dataset.friendid, this.state.user.userid);
            const socket = io();

            // updates all unread messages to read for clicked user
            fetch("/api/messages/read/" + recipientId, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                }
            }).then(res => {
                console.log(res);
            })
                .catch(err => console.log(err));

            this.setState({ sendTo: { id: recipientId, username: recipientUsername }, room: room, showMessages: this.state.allMessages.filter(data => data.recipient === recipientUsername || data.sender === recipientUsername) });

            //sends server username and name of room
            socket.emit("joinRoom", { username, room });

            //listens for new messages being emitted by the socket server
            socket.on("output", data => {
                console.log(data);
                let socketMessage = {
                    message: data.message,
                    sender: data.user,
                    recipient: data.recipient
                };

                let showMessages = this.state.showMessages;
                showMessages.push(socketMessage);

                this.setState({ showMessages: showMessages })

                return () => {
                    socket.disconnect()
                };
            });
            this.setState({ userSearch: "", users: [] })
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
                room: this.state.room,
                recipient: this.state.sendTo.username
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
                <Nav />
                <div className="messenger-page">
                    <div className="container messenger-content-top">
                        <h2 className="messenger-page-header-text">Messenger</h2>
                        <div className="row messenger-page-search-bar">
                            <div className="input-group-prepend col-sm-3">
                                <span className="input-group-text">Send to: </span>
                            </div>
                            <ul className="list-group messages-list p-5 col-sm-5">
                                <input type="text" className="form-control" placeholder="Username" aria-label="Username" aria-describedby="basic-addon1" onChange={this.handleUserSearch}></input>
                                {this.state.users.map(user => (
                                    <li className="list-group-item list-group-item-action" name="room" onClick={this.handleInputChange} data-friendid={user.id} data-recipient={user.username}>
                                        {user.firstname ? `${user.username} (${user.firstname} ${user.lastname})` : user.username}
                                    </li>
                                ))}
                            </ul>
                            <div className="send-to-name align-self-center col-sm-4">
                                <p className="send-to-name-text">{this.state.sendTo.username}</p>
                            </div>

                        </div>


                        {/* <ul className="list-group messages-list p-5">
                        {this.state.showMessages.map(data => (
                            <li className="list-group-item">
                                {data.sender}: {data.message}
                            </li>
                        ))}
                    </ul> */}
                        <ul className="list-group messages-list p-5">
                            {this.state.showMessages.map(data => {
                                if (data.sender === this.state.user.username) {
                                    return (
                                        <li className="list-group-item sent-message message-from-me">
                                            {/* {data.sender}: {data.message} */}
                                            You: {data.message}
                                        </li>
                                    )
                                }

                                else if (data.sender === this.state.sendTo.username) {
                                    return (
                                        <li className="list-group-item sent-message message-from-other">
                                            {data.sender}: {data.message}
                                        </li>
                                    )
                                }
                            })}
                        </ul>



                    </div>

                    <footer className="send-message-footer">
                        <div className="input-group pr-5">
                            <div className="input-group-prepend">
                                <span className="input-group-text">Message</span>
                            </div>
                            <textarea className="form-control" aria-label="With textarea" placeholder="Send message..." name="sendMessage" onChange={this.handleInputChange} onKeyDown={this.pushSendMessage} value={this.state.sendMessage}></textarea>
                        </div>
                    </footer>
                </div>


            </div>
        )
    }
}

export default Messenger;
import React, { Component } from "react";
import io from 'socket.io-client';
import Nav from "../components/Nav";
import "./style.css";
import { TextField, Icon, Button, List, ListItem, ListItemText, Divider, Grid } from '@material-ui/core';

class Messenger extends Component {
    state = {
        sendMessage: "",
        allMessages: [],
        showMessages: [],
        conversations: [],
        user: {},
        sendTo: {},
        room: "",
        users: [],
        userSearch: "",
        navValue: "",
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
                let newArr = [];
                let existing = [];
                messages.forEach(message => {
                    if (!(existing.includes(message.senderId) && existing.includes(message.recipientId))) {
                        newArr.push(message);
                        existing.push(message.senderId, message.recipientId)
                    };
                });
                this.setState({ allMessages: messages, conversations: newArr });
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
            const username = this.state.user.userid;
            const recipientUsername = event.target.parentElement.dataset.username;
            const recipientId = event.target.parentElement.dataset.id;
            const room = this.createRoom(event.target.dataset.friendid, this.state.user.userid);
            const socket = io();
            console.log("checking messages: " + this.state.allMessages.filter(message => message.read === false))

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

            this.setState({ sendTo: { id: recipientId, username: recipientUsername, active: false }, room: room, showMessages: this.state.allMessages.filter(data => data.recipientId === recipientId || data.senderId === recipientId) });

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
            //listens for active user
            socket.on("active", data => {
                const sendToUpdate = this.state.sendTo;

                if (data === 2) {
                    // sets recipient to active if both users are connected to room
                    sendToUpdate.active = true;

                    this.setState({ sendTo: sendToUpdate })
                }
                else {
                    // sets recipient to inactive if other user is not connected
                    sendToUpdate.active = false;

                    this.setState({ sendTo: sendToUpdate })
                }

            });
            this.setState({ userSearch: "", users: [] })
        }
        else {
            this.setState({ sendMessage: event.target.value });
        }
    };

    // sends message to socket server
    pushSendMessage = event => {
        // if (event.key === "Enter") {
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
                    secondUser: this.state.sendTo.id,
                    read: this.state.sendTo.active
                })
            })
                .then(res => {
                    console.log("Your message was sent!");
                    console.log(res);
                })
                .catch(err => console.log(err));

            this.setState({ sendMessage: "" });
        // }
    };

    listClick = (event, newEvent) => {
        console.log(event.target.parentElement.dataset.id)
    }

    render() {
        return (
            <div>
                <Nav update={this.state.newNotification} />
                <Grid xs={3}>
                    <List>
                        {this.state.conversations.map(conversation => (
                            <div>
                                <ListItem
                                onClick={this.handleInputChange}
                                button>
                                <ListItemText
                                    primary={conversation.User.username === this.state.user.username ? conversation.recipient.username : conversation.User.username}
                                    secondary={conversation.message}                                                                    
                                    data-id={conversation.senderId === this.state.user.userid ? conversation.recipientId : conversation.senderId}
                                    data-username={conversation.User.username === this.state.user.username ? conversation.recipient.username : conversation.User.username} 
                                />
                                </ListItem>
                                <Divider component="li" />
                            </div>
                        ))}
                    </List>
                </Grid>
                <div className="messenger-page">
                    <div className="container messenger-content">
                        <h2 className="messenger-page-header-text">Messenger</h2>
                        <div className="row messenger-page-search-bar">
                            <div className="input-group-prepend col-sm-3">
                                <span className="input-group-text">Send to: </span>
                            </div>
                            <ul className="list-group p-5 col-sm-5">
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
                </div>

                <footer className="send-message-footer">
                    <TextField
                        id="standard-basic"
                        placeholder="Send message..."
                        multiline
                        className="message-field"
                        onChange={this.handleInputChange}
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        endIcon={<Icon>send</Icon>}
                        onClick={this.pushSendMessage}
                    >
                        Send
                        </Button>
                </footer>



            </div>
        )
    }
}

export default Messenger;
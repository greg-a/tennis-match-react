import React, { Component } from "react";
import io from 'socket.io-client';
import Nav from "../components/Nav";
import "./style.css";
import { TextField, Icon, Button, List, ListItem, ListItemText, Divider, Grid, Paper } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';

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
        userId: ""
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

    handleInputChange = (event, newValue) => {
        if (event.type === "click") {
            //sends request to server to join a room based on click event
            const userId = this.state.user.userid;
            const username = this.state.user.username;
            const recipientUsername = event.target.parentElement.dataset.username;
            const recipientId = event.target.parentElement.dataset.id;
            const room = this.createRoom(recipientId, userId);
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

            this.setState({ sendTo: { id: recipientId, username: recipientUsername, active: false }, room: room, showMessages: this.state.allMessages.filter(message => message.recipientId == recipientId || message.senderId == recipientId) });

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

    handleUsernameChange = (event, newValue) => {        
        this.setState({
            userSearch: newValue
        }, () => {
            let searchURL = "/api/username?username=" + this.state.userSearch;
            fetch(searchURL)
                .then(res => res.json())
                .then(res => {
                    console.log(res)
                    this.setState({
                        users: res
                    }, () => {
                        for (let i = 0; i < (this.state.users).length; i++) {
                            let currentUserResults = this.state.users;
                            if (this.state.eventValue === currentUserResults[i].username) {
                                let currentUserId = currentUserResults[i].id;
                                this.setState({
                                    userId: currentUserId
                                })
                            }
                        }
                    });
                })
                .catch(err => console.log(err));
        });
    };

    handleNewChange = (event, newValue) => {
        console.log("THIS IS THE EVENT: " + JSON.stringify(newValue));
        this.setState({
            sendTo: newValue
        })
    }

    render() {
        return (
            <div>
                <Nav update={this.state.newNotification} />
                {this.state.showMessages.length === 0 ?
                    <h2 className="messenger-page-header-text">Messenger</h2>
                    :
                    <h2 className="messenger-page-header-text">{this.state.sendTo.username}</h2>
                }
                <Grid container justify="space-evenly">
                    <Grid xs={2} item={true}>
                        <List>
                            {this.state.conversations.map(conversation => (
                                <Paper>
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
                                </Paper>
                            ))}
                        </List>
                    </Grid>
                    <Grid xs={6} item={true}>
                        <List>
                            {this.state.showMessages.map(message => (
                                <Paper>
                                    <ListItem
                                        button>
                                        {message.senderId == this.state.user.userid ?
                                            <ListItemText
                                                primary={`Me: ${message.message}`}
                                            /> :
                                            <ListItemText
                                                primary={`${message.User.username}: ${message.message}`}
                                            />
                                        }
                                    </ListItem>
                                    <Divider component="li" />
                                </Paper>
                            ))}
                        </List>
                    </Grid>
                    <Grid xs={2} item={true}>
                        <Autocomplete
                            id="userSearch"
                            freesolo
                            autoSelect
                            name="userSearch"
                            value={this.state.sendTo}
                            onChange={this.handleNewChange}
                            inputValue={this.state.userSearch}
                            onInputChange={this.handleUsernameChange}
                            options={this.state.users}
                            getOptionLabel={(option) => option.username}
                            renderOption={(option) => <span>{option.username} ({option.firstname} {option.lastname})</span>}
                            renderInput={(params) => (
                                <TextField {...params}
                                    label="Username"
                                    margin="normal"
                                    variant="outlined"
                                ></TextField>
                            )}
                        />
                    </Grid>
                </Grid>
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
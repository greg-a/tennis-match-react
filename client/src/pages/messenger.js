import React, { Component } from "react";
import io from 'socket.io-client';
import Nav from "../components/Nav";
import "./style.css";
import { Autocomplete } from '@material-ui/lab';
import { TextField, Icon, Button, List, ListItem, ListItemText, Divider, Grid, Paper, Box, withStyles } from '@material-ui/core';
import moment from "moment";
import BottomNav from "../components/BottomNav";
const socket = io();

const useStyles = {
    listItemThem: {
        backgroundColor: "#d5f7ad"
    },
    underline: {
        '&:before': {
          borderBottomColor: "white",
        },
        '&:after': {
          borderBottomColor: "white",
        },
        '&:hover:before': {
          borderBottomColor: ["white", '!important'],
        },
      }
};

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
        rooms: [],
        userSearch: "",
        navValue: "",
        userId: "",
        subsectionShow: "inbox",
        bottomNavValue: "inbox-tab"
    };


    componentDidMount() {

        this.connectToSocket();
        this.getProfileInfo();
    };

    connectToSocket = () => {
        socket.on("output", data => {
            data.createdAt = new Date();

            let allMessages = this.state.allMessages;
            allMessages.unshift(data);

            let newArr = [];
            let existing = [];

            allMessages.forEach(message => {
                if (!(existing.includes(message.senderId) && existing.includes(message.recipientId))) {
                    newArr.push(message);
                    existing.push(message.senderId, message.recipientId)
                };
            });

            this.setState({ allMessages: allMessages, showMessages: allMessages.filter(message => message.recipientId == this.state.sendTo.id || message.senderId == this.state.sendTo.id), conversations: newArr });


            return () => {
                socket.disconnect()
            };

        });

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
            return () => {
                socket.disconnect()
            };
        });
    };

    getProfileInfo = () => {
        fetch("/api/profile")
            .then(res => res.json())
            .then((profileInfo) => {
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
                this.setState({ users: users })
            })
            .catch(err => console.log(err));
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
            this.setChatPage();

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

            const allRooms = this.state.rooms
            //checks current room connections and joins room
            if (!this.state.rooms.includes(room)) {
                socket.emit("joinRoom", { username, room, userId });
                allRooms.push(room);
            };
            
            this.setState({ sendTo: { id: parseInt(recipientId), username: recipientUsername, active: false }, room: room, showMessages: this.state.allMessages.filter(message => message.recipientId == recipientId || message.senderId == recipientId) });


            this.setState({ userSearch: "", users: [] })
        }
        else {
            this.setState({ sendMessage: event.target.value });
        }
    };

    // sends message to socket server
    pushSendMessage = event => {
        if ((event.keyCode == 13 && !event.shiftKey) || event.type === "click") {
            event.preventDefault();

            socket.emit("input", {
                User: {
                    username: this.state.user.username
                },
                message: this.state.sendMessage,
                room: this.state.room,
                senderId: this.state.user.userid,
                recipientId: this.state.sendTo.id,
                recipient: this.state.sendTo
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
                })
                .catch(err => console.log(err));

            this.setState({ sendMessage: "" });
        }
    };

    handleUsernameChange = (event, newValue) => {
        this.setState({
            userSearch: newValue
        }, () => {
            let searchURL = "/api/username?username=" + this.state.userSearch;
            fetch(searchURL)
                .then(res => res.json())
                .then(res => {
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
        if (newValue.id !== this.state.sendTo.id) {
            const room = this.createRoom(newValue.id, this.state.user.userid);
            const username = this.state.user.username;
            this.setChatPage();

            fetch("/api/messages/read/" + newValue.id, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                }
            }).then(res => {
                console.log(res);
            })
                .catch(err => console.log(err));

            this.setState({ sendTo: { firstname: newValue.firstname, lastname: newValue.lastname, username: newValue.username, id: newValue.id, active: false }, room: room, showMessages: this.state.allMessages.filter(message => message.recipientId == newValue.id || message.senderId == newValue.id) });

            //sends server username and name of room
            socket.emit("joinRoom", { username, room });

            this.setState({ userSearch: "", users: [] })
        }
    }

    setInboxPage = () => {
        this.setState({ subsectionShow: "inbox", bottomNavValue: "inbox-tab" });
        this.subsectionRender();
    }

    setChatPage = () => {
        this.setState({ subsectionShow: "chat", bottomNavValue: "chat-tab" });
        this.subsectionRender();
    }

    subsectionRender = () => {
        if (this.state.subsectionShow === "inbox") {
            const { classes } = this.props;
            return (
                <div>
                    <Box paddingBottom="30px">
                        <Grid container justify="center">
                            <Grid xs={12} sm={4}>
                                <Box display="flex" justifyContent="center">
                                    <h2>Inbox</h2>
                                </Box>

                            </Grid>
                            <Grid xs={12} sm={4}>
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
                                    renderOption={(option)=> (option.firstname ? <span>{option.username} ({option.firstname} {option.lastname})</span> : <span>{option.username}</span>)}
                                    renderInput={(params) => (
                                        <TextField {...params}
                                            label="User Search"
                                            margin="normal"
                                            variant="outlined"
                                        ></TextField>
                                    )}
                                />
                            </Grid>
                            <Grid xs={0} sm={4}></Grid>
                        </Grid>
                        <Grid container justify="space-evenly">
                            <Grid xs={11} sm={9} item={true}>
                                <List>
                                    {/* <Box overflow="auto"> */}
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
                                    {/* </Box> */}
                                </List>
                            </Grid>
                        </Grid>
                    </Box>
                </div>
            )
        } else if (this.state.subsectionShow === "chat") {
            const { classes } = this.props;
            return (
                <div>
                    <Box>
                        <Grid container justify="center">
                            <Grid container className="chat-banner" alignItems="center">
                                <Grid item xs={12} sm={4} style={{ textAlign: "center", color: "white" }}>
                                    <h2>{this.state.sendTo.username}</h2>
                                </Grid>
                                <Grid item xs={12} sm={8}>
                                    <div className="send-message-wrapper">
                                        <div className="send-message">
                                            <TextField
                                                InputProps={{classes: {underline: classes.underline}}}
                                                id="standard-basic"
                                                placeholder="Send message..."
                                                multiline
                                                className="message-field"
                                                onChange={this.handleInputChange}
                                                value={this.state.sendMessage}
                                                onKeyDown={this.pushSendMessage}
                                            />
                                            <Button
                                                // variant="contained"
                                                endIcon={<Icon>send</Icon>}
                                                onClick={this.pushSendMessage}
                                            >
                                            </Button>
                                        </div>
                                    </div>
                                </Grid>
                            </Grid>

                            <Grid container>
                                <Grid item sm={1}></Grid>
                                <Grid item xs={12} sm={10} item={true}>
                                    <List>
                                        {this.state.showMessages.map(message => (
                                            <Paper>
                                                {message.senderId == this.state.user.userid ?
                                                    <ListItem
                                                        button>
                                                        <ListItemText
                                                            primary={`Me: ${message.message}`}
                                                            secondary={moment(message.createdAt).format("MMDDYYYY") === moment(new Date()).format("MMDDYYYY") ? `Today ${moment(message.createdAt).format("h:mm A")}` : moment(message.createdAt).format("M/DD/YY")}
                                                        />
                                                    </ListItem> :
                                                    <ListItem
                                                        className={classes.listItemThem}
                                                        button>
                                                        <ListItemText
                                                            primary={`${message.User.username}: ${message.message}`}
                                                            secondary={moment(message.createdAt).format("MMDDYYYY") === moment(new Date()).format("MMDDYYYY") ? `Today ${moment(message.createdAt).format("h:mm A")}` : moment(message.createdAt).format("M/DD/YY")}
                                                        />
                                                    </ListItem>
                                                }

                                                <Divider component="li" />
                                            </Paper>
                                        ))}
                                    </List>
                                </Grid>
                            </Grid>
                        </Grid >
                    </Box>
                </div >
            )
        }
    }

    render() {
        const { classes } = this.props;

        return (
            <div>
                <Nav update={this.state.newNotification} />
                {this.subsectionRender()}
                <BottomNav
                    value={this.state.bottomNavValue}
                    setInboxPage={this.setInboxPage}
                    setChatPage={this.setChatPage}
                    sendTo={this.state.sendTo.username}
                />
            </div>
        )
    }
}

export default withStyles(useStyles)(Messenger);
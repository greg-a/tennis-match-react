import React, { Component } from "react";
import io from 'socket.io-client';
import Nav from "../components/Nav";

class Messenger extends Component {
    state = {
        sendMessage: "",
        viewMessages: [],
        username: "",
        room: "",
        users: [],
        userSearch: ""
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
    };

    componentDidMount() {
        this.getProfileInfo();
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
            this.setState({ room: event.target.dataset.friendid });
            const username = this.state.username;
            const room = event.target.dataset.friendid;
            const socket = io();

            //sends server username and name of room
            socket.emit("joinRoom", { username, room });

            //listens for new messages being emitted by the socket server
            socket.on("output", data => {
                console.log(data);
                this.setState(state => {
                    const viewMessages = state.viewMessages.concat(data);
                    return { viewMessages };
                });

                return () => {
                    socket.disconnect()
                };
            });

            fetch("api/room", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    recipient: room
                })
            }).then(res => {
                console.log("Chat was started!");
                console.log(res);
            })
                .catch(err => console.log(err));

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

            fetch("/api/message", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    message: this.state.sendMessage,
                    RoomId: this.state.room
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
                        <input type="text" class="form-control" placeholder="Username" aria-label="Username" aria-describedby="basic-addon1" onChange={this.handleUserSearch}></input>
                        {this.state.users.map(user => (
                            <li className="list-group-item list-group-item-action" name="room" onClick={this.handleInputChange} data-friendid={user.id}>
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
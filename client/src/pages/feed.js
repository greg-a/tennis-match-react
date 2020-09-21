import React from "react";
import Nav from "../components/Nav";
import { FeedList, FeedListItem, FeedListItemDeny } from "../components/FeedList";
import { Grid, Container } from '@material-ui/core';
import moment from "moment";

class Feed extends React.Component {
    state = {
        navValue: "tab-one",
        matches: [],
        updatedMatches: [],
        messageNotifications: 0,
        matchNotifications: 0,
        noNotifications: true
    }

    componentDidMount() {
        this.getDates();
        this.getNotifications();
        localStorage.removeItem("selectedDate")
    }

    getDates = () => {
        fetch("/api/confirmed")
            .then(res => res.json())
            .then((dates) => {
                console.log(dates);
                this.setState({ matches: dates })
            })
            .catch(err => console.log(err));

        fetch("/api/updates")
            .then(res => res.json())
            .then((dates) => {
                console.log(dates);
                this.setState({ updatedMatches: dates })
            })
            .catch(err => console.log(err));
    };

    getNotifications = () => {
        fetch("/api/notifications").then(res => res.json())
            .then((notifications) => {
                console.log(notifications)
                if (notifications.messages > 0 || notifications.matches > 0) {
                    this.setState({ messageNotifications: notifications.messages, matchNotifications: notifications.matches, noNotifications: false });
                }
            });
    };

    handleDeny = event => {
        fetch("api/event/delete/" + event.currentTarget.dataset.id, {
            method: "DELETE"
        }).then(res => {
            console.log(res)
        }).catch(err => {
            console.log(err)
        })

        this.getDates();
    }

    render() {
        return (
            <div>
                <Nav
                    value={this.state.navValue}
                />
                <Container fixed>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        {!this.state.matches.length && !this.state.updatedMatches.length ? (
                            <Grid item xs={12} style={{ textAlign: "center" }}>
                                <h4 className="text-center">No scheduled matches</h4>
                            </Grid>
                        ) : (
                                <FeedList>
                                    {this.state.updatedMatches.map(match => {
                                        return (
                                            <FeedListItemDeny
                                                title={match.title}
                                                month={match.start.substring(5, 7)}
                                                day={match.start.substring(8, 10)}
                                                hour={moment(match.start).format("h:mm a")}
                                                okayDeny={this.handleDeny}
                                                eventID={match.id}
                                                confirmer={match.secondUser.username}
                                            />
                                        );
                                    })}
                                    {this.state.matches.map(match => {
                                        return (
                                            <FeedListItem
                                                organizer={match.User.username}
                                                confirmer={match.secondUser.username}
                                                month={match.start.substring(5, 7)}
                                                day={match.start.substring(8, 10)}
                                                hour={moment(match.start).format("h:mm a")}
                                            />
                                        );
                                    })}
                                </FeedList>
                            )}
                    </Grid>
                </Grid>
                </Container>
            </div>

        );
    }
}

export default Feed;
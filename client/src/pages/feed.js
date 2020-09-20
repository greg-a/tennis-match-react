import React from "react";
import Nav from "../components/Nav";
import { FeedList, FeedListItem, FeedListItemDeny } from "../components/FeedList";
// import { Container, Row, Col} from "../components/Grid";
import { makeStyles, TextField, Button, Grid, Box } from '@material-ui/core';

class Feed extends React.Component {
    state = {
        navValue: "tab-one",
        matches: [],
        updatedMatches: [],
        messageNotifications: 0,
        matchNotifications: 0,
        generalNotification: false
    }

    componentDidMount() {
        this.getDates();
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
                    this.setState({ messageNotifications: notifications.messages, matchNotifications: notifications.matches, generalNotification: true });
                }
            });
    };

    handleDeny = event => {
        fetch("api/event/delete/" + event.target.dataset.id, {
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
                {/* <FeedListItem /> */}
                {/* <Row> */}
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
                                                hour={match.start.substring(11, 13)}
                                                minute={match.start.substring(14, 16)}
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
                                                hour={match.start.substring(11, 13)}
                                                minute={match.start.substring(14, 16)}
                                            />
                                        );
                                    })}
                                </FeedList>
                            )}
                    </Grid>
                </Grid>
                {/* </Row> */}
                {/* </Container> */}

            </div>

        );
    }
}

export default Feed;
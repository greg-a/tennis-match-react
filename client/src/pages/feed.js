import React from "react";
import Nav from "../components/Nav";
import { FeedList, FeedListItem, FeedListItemDeny } from "../components/FeedList";
import { Container, Row, Col } from "../components/Grid";

class Feed extends React.Component {
    state = {
        navValue: "tab-one",
        matches: [],
        updatedMatches: []
    }

    componentDidMount() {
        this.getDates();
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
    }

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
                <Container>
                    {/* <FeedListItem /> */}
                    <Row>
                        <Col size="12">
                            {!this.state.matches.length && !this.state.updatedMatches.length ? (
                                <h4 className="text-center">No scheduled matches</h4>
                            ) : (
                                    <FeedList>
                                        {this.state.updatedMatches.map(match => {
                                            return (
                                                <FeedListItemDeny
                                                    title={match.title}
                                                    month={match.start.substring(5, 7)}
                                                    day={match.start.substring(8,10)}
                                                    hour={match.start.substring(11,13)}
                                                    minute={match.start.substring(14,16)}
                                                    okayDeny={this.handleDeny}
                                                    eventID={match.id}
                                                />
                                            );
                                        })}
                                        {this.state.matches.map(match => {
                                            return (
                                                <FeedListItem
                                                    organizer={match.User.username}
                                                    confirmer={match.secondUser.username}
                                                    month={match.start.substring(5, 7)}
                                                    day={match.start.substring(8,10)}
                                                    hour={match.start.substring(11,13)}
                                                    minute={match.start.substring(14,16)}
                                                />
                                            );
                                        })}
                                    </FeedList>
                                )}
                        </Col>
                    </Row>
                </Container>

            </div>

        );
    }
}

export default Feed;
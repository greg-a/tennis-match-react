import React from "react";
import Nav from "../components/Nav";
import { FeedList, FeedListItem } from "../components/FeedList";
import { Container, Row, Col } from "../components/Grid";

class Feed extends React.Component {
    state = {
        navValue: "tab-one",
        matches: []
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
                        <Col size="xs-12">
                            {!this.state.matches.length ? (
                                <h4 className="text-center">No scheduled matches</h4>
                            ) : (
                                    <FeedList>
                                        {this.state.matches.map(match => {
                                            return (
                                                <FeedListItem
                                                    organizer={match.userID}
                                                    date={match.newDate}
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
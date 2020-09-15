import React from "react";
import Thumbnail from "../Thumbnail";
// import { Container, Row, Col } from "../Grid";
import { makeStyles, TextField, Button, Grid, Box } from '@material-ui/core';

// For entire feed of FeedItem components
export function FeedList({ children }) {
    return <ul className="list-group">{children}</ul>
}

// For each event just scheduled or just completed
export function FeedListItem({
    //later replace with hybrid image of both participating players
    thumbnail = "https://placehold.it/300x300",
    organizer,
    confirmer,
    month,
    day,
    hour,
    minute
}) {
    return (
        <div className="list-group-item">
            <Grid container spacing={3}>
                <Grid item xs={4} sm={2}>
                    <Thumbnail src={thumbnail} />
                </Grid>
                <Grid item xs={8} sm={10}>
                    <p>{organizer} scheduled a match with {confirmer} on {month}/{day} at {hour}:{minute}.</p>                    
                </Grid>
            </Grid>
            {/* <Container>
                <Row>
                    <Col size="4 sm-2">
                        <Thumbnail src={thumbnail} />
                    </Col>
                    <Col size="8 sm-9">
                        <p>{organizer} scheduled a match with {confirmer} on {month}/{day} at {hour}:{minute}.</p>
                    </Col>
                </Row>
            </Container> */}
        </div>
    );
}

export function FeedListItemDeny({
    //later replace with hybrid image of both participating players
    thumbnail = "https://placehold.it/300x300",
    title,
    month,
    day,
    hour,
    minute,
    okayDeny,
    eventID
}) {
    return (
        <div className="list-group-item">
            <Grid container spacing={3}>
                <Grid item xs={4} sm={2}>
                    <Thumbnail src={thumbnail} />
                </Grid>
                <Grid item xs={8} sm={10}>
                <p>{title}. Proposed for {month}/{day} at {hour}:{minute}.</p>
                        <button className="btn" onClick={okayDeny} data-id={eventID}>Ok</button>
                </Grid>
            </Grid>
            {/* <Container>
                <Row>
                    <Col size="4 sm-2">
                        <Thumbnail src={thumbnail} />
                    </Col>
                    <Col size="8 sm-9">
                        <p>{title}. Proposed for {month}/{day} at {hour}:{minute}.</p>
                        <button className="btn btn-primary" onClick={okayDeny} data-id={eventID}>Ok</button>
                    </Col>
                </Row>
            </Container> */}
        </div>
    );
}
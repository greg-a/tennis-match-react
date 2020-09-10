import React from "react";
import Thumbnail from "../Thumbnail";
import { Container, Row, Col } from "../Grid";

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
        <li className="list-group-item">
            <Container>
                <Row>
                    <Col size="xs-4 sm-2">
                        <Thumbnail src={thumbnail} />
                    </Col>
                    <Col size="xs-8 sm-9">
                        <p>{organizer} scheduled a match with {confirmer} on {month}/{day} at {hour}:{minute}.</p>
                    </Col>
                </Row>
            </Container>
        </li>
    );
}
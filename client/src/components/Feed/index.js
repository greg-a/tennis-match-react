import React from "react";
import { Container, Row, Col } from "../Grid";

export function Feed({ children }) {
    return <ul className="list-group">{children}</ul>
}
export function FeedItem({
    thumbnail = "https://placehold.it/300x300",
    message
}) {
    return (
        <li className="list-group-item">
            <Container>
                <Row>
                    <Col size="xs-4 sm-2">
                        <Thumbnail src={thumbnail} />
                    </Col>
                    <Col size="xs-8 sm-9">
                        <p>{message}</p>
                    </Col>
                </Row>
            </Container>
        </li>
    );
}
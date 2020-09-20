import React from "react";
import { Button, Paper, ListItem, ListItemText, List, ListItemAvatar, Avatar, Divider, Container } from '@material-ui/core';

// For entire feed of FeedItem components
export function FeedList({ children }) {
    return (
        <Container fixed>
            <List>{children}</List>
        </Container>
    )
}

// For each event just scheduled or just completed
export function FeedListItem({
    //later replace with hybrid image of both participating players
    thumbnail = "https://www.iconfinder.com/data/icons/tennis-player-1/265/tennis-player-005-512.png",
    organizer,
    confirmer,
    month,
    day,
    hour,
    minute
}) {
    return (
        <Paper>
            <ListItem alignItems="flex-start">
                <ListItemAvatar>
                    <Avatar alt={organizer} src={thumbnail} />
                </ListItemAvatar>
                <ListItemText
                    primary={`${organizer} scheduled a match with ${confirmer} on ${month}/${day} at ${hour}:${minute}`}
                />
                <ListItemAvatar>
                    <Avatar alt={organizer} src={thumbnail} />
                </ListItemAvatar>
            </ListItem>
            <Divider component="li" />
        </Paper>
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
    eventID,
    confirmer
}) {
    return (
        <Paper>
            <ListItem alignItems="flex-start">
                <ListItemAvatar>
                    <Avatar alt={confirmer} src={thumbnail} />
                </ListItemAvatar>
                <ListItemText
                    primary={`${title}. Proposed for ${month}/${day} at ${hour}:${minute}`}
                />
                <Button onClick={okayDeny} data-id={eventID}>Ok</Button>
            </ListItem>
            <Divider variant="inset" component="li" />
        </Paper>
    );
}
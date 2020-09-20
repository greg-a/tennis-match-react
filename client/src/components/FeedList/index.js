import React from "react";
import Thumbnail from "../Thumbnail";
// import { Container, Row, Col } from "../Grid";
import { makeStyles, TextField, Button, Grid, Box, Paper, ListItem, ListItemText, List, ListItemAvatar, Avatar, Divider, Container } from '@material-ui/core';

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
            {/* <Grid container spacing={3}>
                <Grid item xs={4} sm={2}>
                    <Thumbnail src={thumbnail} />
                </Grid>
                <Grid item xs={8} sm={10}>
                    <p>{organizer} scheduled a match with {confirmer} on {month}/{day} at {hour}:{minute}.</p>
                </Grid>
            </Grid> */}


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
        // <div className="list-group-item">
        //     <Grid container spacing={3}>
        //         <Grid item xs={4} sm={2}>
        //             <Thumbnail src={thumbnail} />
        //         </Grid>
        //         <Grid item xs={8} sm={10}>
        //             <p>{title}. Proposed for {month}/{day} at {hour}:{minute}.</p>
        //             <button className="btn" onClick={okayDeny} data-id={eventID}>Ok</button>
        //         </Grid>
        //     </Grid>
        // </div>
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
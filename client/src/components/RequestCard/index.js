import React from "react";
import { makeStyles, Card, CardActions, CardContent, Button, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        [theme.breakpoints.down('sm')]: {
            width: 300
        },
        [theme.breakpoints.up('md')]: {
            width: 400
        }
    },
    title: {
        fontSize: 14
    },
    pos: {
        marginBottom: 12
    }
}));

function RequestCard(props) {
    const classes = useStyles();

    return (
        <Card className={classes.root} variant="outlined">
            <CardContent>
                <Typography variant="h5" gutterBottom>
                    {props.title}
                </Typography>
                <Typography >
                    {props.proposeUserFirstname ? `Request by: ${props.proposeUsername} (${props.proposeUserFirstname} ${props.proposeUserLastname})` : `Request by: ${props.proposeUsername}`}
                </Typography>
                <Typography color="textSecondary" gutterBottom>
                    Skill level: {props.proposeUserSkill ? `${props.proposeUserSkill}` : `n/a`}
                </Typography>
                <Typography variant="body2" component="p">
                    Court Location: {props.eventLocation}
                    <br />
                    Date: {props.date}
                    <br />
                    Start Time: {props.starttime}
                    <br />
                    End Time: {props.endtime}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small" color="primary" data-eventid={props.eventId} data-eventtitle={props.title} data-start={props.fullStarttime} data-end={props.fullEndtime} onClick={props.handleConfirm}>Confirm</Button>
                <Button size="small" color="secondary" data-eventid={props.eventId} onClick={props.handleDeny}>Deny</Button>
            </CardActions>
        </Card>
    );
}

export default RequestCard;
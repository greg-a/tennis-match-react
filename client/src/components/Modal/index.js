import React from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, useMediaQuery, useTheme } from "@material-ui/core";


export function SchedulerModal(props) {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));

    return (
        <Dialog
            fullScreen={fullScreen}
            open={props.show}
            onClose={props.onHide}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">{props.thisDate}</DialogTitle>
            <DialogContent>
                <Button onClick={props.onHide} color="primary" href="/availability">
                    Create Match
                </Button>
                <Button onClick={props.onHide} color="primary" href="/proposematch">
                    Find Match
                </Button>
            </DialogContent>
            <DialogActions>
                <Button onClick={props.onHide} color="primary">
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export function EventDetailsModal(props) {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));
    
    return (
        <Dialog
            fullScreen={fullScreen}
            open={props.show}
            onClose={props.onHide}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            maxWidth="xs"
            fullWidth={true}
        >
            <DialogTitle id="alert-dialog-title">{props.eventName}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    <b>Date:</b> {props.date}
                </DialogContentText>
                <DialogContentText id="alert-dialog-description">
                    <b>Location:</b> {props.location}
                </DialogContentText>
                <DialogContentText id="alert-dialog-description">
                    <b>Players:</b> {props.playerOneUsername} vs. {props.playerTwoUsername}
                </DialogContentText>
                <DialogContentText id="alert-dialog-description">
                    <b>Start:</b> {props.startTime}
                </DialogContentText>
                <DialogContentText id="alert-dialog-description">
                    <b>End:</b> {props.endTime}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={props.handleDelete} color="secondary">
                    Delete Match
                </Button>
                <Button onClick={props.onHide} color="primary">
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    );
}


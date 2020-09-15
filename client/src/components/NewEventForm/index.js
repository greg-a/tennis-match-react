import React from "react";
// import { makeStyles } from '@material-ui/core/styles';
// import TextField from '@material-ui/core/TextField';
// import { Container, Row, Col } from "../Grid";
import { makeStyles, TextField, Button, Grid, Box, MenuItem, FormHelperText, FormControl, Select, InputLabel } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 200,
        marginTop: "10px",
        marginBottom: "10px"
    },
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '25ch',
        }
    },
    formControlAvailabilty: {
        margin: theme.spacing(1),
        minWidth: 180,
    },
    formControlLocation: {
        margin: theme.spacing(1),
        minWidth: 300,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },

}));

function NewEventForm(props) {
    const classes = useStyles();

    return (
        <div>
            <Box marginTop="10px" textAlign="center">
                <Grid container spacing={3}>

                    <Grid item xs={12}>
                        <h2>Availability</h2>
                        <div><p>{props.instructions}</p></div>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Box display="flex" justifyContent="center" alignItems="center">

                            <FormControl className={classes.formControlAvailabilty}>
                                <InputLabel id="availability-type">Availability Type</InputLabel>
                                <Select
                                    id="eventTitle"
                                    select
                                    value={props.eventTitle}
                                    name="eventTitle"
                                    onChange={props.handleInputChange}
                                >
                                    <MenuItem key="Casual" value="Casual">
                                        Casual
                                    </MenuItem>
                                    <MenuItem key="Casual" value="Competitive">
                                        Competitive
                                    </MenuItem>
                                </Select>
                                {/* <FormHelperText>Availability Type</FormHelperText> */}
                            </FormControl>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={8}>
                        <Box display="flex" justifyContent="center" alignItems="center">

                            <FormControl className={classes.formControlLocation}>
                                <InputLabel id="event-location">Event Location</InputLabel>
                                <Select
                                    id="eventLocation"
                                    select
                                    value={props.eventLocation}
                                    name="eventLocation"
                                    onChange={props.handleInputChange}
                                >
                                    {props.courtList.map((event, i) => (
                                    <MenuItem key={i} value={event}>
                                        {event}
                                    </MenuItem>
                                ))}
                                </Select>
                                {/* <FormHelperText>Event Location</FormHelperText> */}
                            </FormControl>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Box display="flex" justifyContent="center" alignItems="center">
                            <form className={classes.container} noValidate>
                                <TextField
                                    id="newDate"
                                    name="newDate"
                                    label="Date"
                                    type="date"
                                    // defaultValue="2017-05-24"
                                    value={props.newDate}
                                    onChange={props.handleInputChange}
                                    className={classes.textField}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                            </form>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Box display="flex" justifyContent="center" alignItems="center">
                            <form className={classes.container} noValidate>
                                <TextField
                                    id="startTime"
                                    name="startTime"
                                    label="Start Time"
                                    type="time"
                                    // defaultValue="17:00"
                                    value={props.startTime}
                                    onChange={props.handleInputChange}
                                    className={classes.textField}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    inputProps={{
                                        step: 300, // 5 min
                                    }}
                                />
                            </form>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Box display="flex" justifyContent="center" alignItems="center">
                            <form className={classes.container} noValidate>
                                <TextField
                                    id="endTime"
                                    name="endTime"
                                    label="End Time"
                                    type="time"
                                    // defaultValue="18:30"
                                    value={props.endTime}
                                    onChange={props.handleInputChange}
                                    className={classes.textField}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    inputProps={{
                                        step: 300, // 5 min
                                    }}
                                />
                            </form>
                        </Box>
                    </Grid>
                    <Grid item xs={12}>
                        <Button variant="contained" id="login-button" onClick={props.handleFormSubmit}>Submit</Button>
                    </Grid>
                </Grid>

            </Box>
        </div>










    )
}

export default NewEventForm;

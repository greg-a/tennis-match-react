import React from "react";
// import { makeStyles } from '@material-ui/core/styles';
// import TextField from '@material-ui/core/TextField';
// import { Container, Row, Col } from "../Grid";
import { makeStyles, TextField, Button, Grid, Box } from '@material-ui/core';

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
    // availabilityForm: {
    //     marginTop: "10px"
    // },
    // availabilityHeader: {
    //     textAlign: "center",
    //     // fontFamily: "coolvetica"
    // },
    availabilityInstr: {
        textAlign: "center",
        fontWeight: "bold"
    }
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
                    <Grid item xs={12} sm={3}>
                        <div className="form-group">
                            <label for="eventTitle">Availability Type</label>
                            <select className="form-control" name="eventTitle" id="eventTitle" onChange={props.handleInputChange} value={props.eventTitle}>
                                <option value="Casual">Casual</option>
                                <option value="Competitive">Competitive</option>
                            </select>
                        </div>
                    </Grid>
                    <Grid item xs={12} sm={9}>
                        <div className="form-group">
                            <label for="eventLocation">Court Location</label>
                            <select className="form-control" name="eventLocation" id="eventLocation" onChange={props.handleInputChange} value={props.eventLocation}>
                                {props.courtList.map((event, i) => (
                                    <option value={event} key={i}>{event}</option>
                                ))}
                            </select>
                        </div>
                    </Grid>
                    <Grid item xs={12} sm={6}>
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
                    </Grid>
                    <Grid item xs={12} sm={3}>
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
                    </Grid>
                    <Grid item xs={12} sm={3}>
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
                    </Grid>
                    <Grid item xs={12}>
                    <button type="button" className="btn"
            onClick={props.handleFormSubmit}
            id="login-button">Submit</button>
                    </Grid>
                </Grid>

            </Box>
        </div>








        

    )
}

export default NewEventForm;

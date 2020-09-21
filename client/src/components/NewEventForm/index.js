import React from "react";
import { TextField, Button, Grid, MenuItem, Snackbar } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';


function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export function NewEventForm(props) {

    return (
            <Grid item xs={12}>
                <Grid item xs={12} style={{textAlign: "center"}}>
                    <h2>Availability</h2>
                    <div><p>{props.instructions}</p></div>
                </Grid>
                <form>
                <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                    <TextField
                    select
                    label="Play Type"
                    id="eventTitle"
                    name="eventTitle"
                    value={props.eventTitle}
                    onChange={props.handleInputChange}
                    margin="normal"
                    variant="outlined"
                    placeholder="Play Type"
                    fullWidth
                    >
                        <MenuItem value="Casual">Casual</MenuItem>
                        <MenuItem value="Competitive">Competitive</MenuItem>
                    </TextField>
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField
                    select
                    label="Court Location"
                    id="eventLocation"
                    name="eventLocation"
                    value={props.eventLocation}
                    onChange={props.handleInputChange}
                    margin="normal"
                    variant="outlined"
                    placeholder="Court Location"
                    fullWidth
                    >
                        {props.courtList.map((event, i) => (
                            <MenuItem key={i} value={event}>
                                {event}
                            </MenuItem>
                        ))}
                    </TextField>
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField
                        label="Date"
                        id="newDate"
                        name="newDate"
                        type="date"
                        value={props.newDate}
                        onChange={props.handleInputChange}
                        margin="normal"
                        variant="outlined"
                        InputLabelProps={{shrink: true}}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <TextField
                        id="startTime"
                        name="startTime"
                        label="Start Time"
                        type="time"
                        // defaultValue="17:00"
                        value={props.startTime}
                        onChange={props.handleInputChange}
                        margin="normal"
                        variant="outlined"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        inputProps={{
                            step: 300, // 5 min
                        }}
                        fullWidth
                    />
                </Grid> 
                <Grid item xs={12} sm={6} md={3}>
                    <TextField
                        id="endTime"
                        name="endTime"
                        label="End Time"
                        type="time"
                        // defaultValue="17:00"
                        value={props.endTime}
                        onChange={props.handleInputChange}
                        margin="normal"
                        variant="outlined"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        inputProps={{
                            step: 300, // 5 min
                        }}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12}>   
                    <Button variant="contained" color="primary" onClick={props.handleFormSubmit}>
                        Submit
                    </Button>
                </Grid>
                </Grid>
                </form>
            </Grid>
                
            
                

    )
}

export function NewEventSnackbar(props) {
    return (
        <Snackbar open={props.openSnackbar} autoHideDuration={6000} onClose={props.handleSnackbarClose}>
            <Alert onClose={props.handleSnackbarClose} severity={props.severity}>
                {props.instructions}
            </Alert>
        </Snackbar>
    )
}

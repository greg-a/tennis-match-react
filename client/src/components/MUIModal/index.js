import React from "react";
import {
    Button,
    TextField,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    MenuItem,
    Grid
} from "@material-ui/core";

function ProposeMuiModal(props) {
    return (
        <Dialog open={props.show} onClose={props.onHide}>
            <DialogTitle>{props.title}</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    {props.userFirstname ? `Username: ${props.username} (${props.userFirstname} ${props.userLastname})` : `Username: ${props.username}`}
                    <br />
                    {props.eventLocationTwo!=="any" && `Location: ${props.eventLocationTwo}`}
                </DialogContentText>
                <Grid container spacing={1}>
                    {props.eventLocationTwo==="any" && 
                        <Grid item xs={12}>
                            <TextField
                                select
                                label="Court Location"
                                id="eventLocation"
                                name="eventLocation"
                                value={props.eventLocation==="any" ? props.defaultEventLocation : props.eventLocation}
                                onChange={props.handleInputChange}
                                margin="normal"
                                variant="outlined"
                                placeholder={props.defaultEventLocation}
                                fullWidth
                            >
                                {props.courtList.map((court) => (
                                    <MenuItem key={court} value={court}>
                                        {court}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                    }
                    <Grid item xs={12} sm={6}>
                        <TextField
                            select
                            label="Start Hour"
                            id="startTimeHour"
                            name="startTimeHour"
                            value={props.startTimeHour}
                            onChange={props.handleInputChange}
                            margin="normal"
                            variant="outlined"
                            placeholder={props.startTimeHour}
                            fullWidth
                        >
                            {props.startIntArr.map((hour) => (
                                <MenuItem key={hour.value} value={hour.value}>
                                    {hour.display}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            select
                            label="Start Minute"
                            id="startTimeMinute"
                            name="startTimeMinute"
                            value={props.startTimeMinute}
                            onChange={props.handleInputChange}
                            margin="normal"
                            variant="outlined"
                            placeholder={props.startTimeMinute}
                            fullWidth
                        >
                            <MenuItem value="00">:00</MenuItem>
                            <MenuItem value="15">:15</MenuItem>
                            <MenuItem value="30">:30</MenuItem>
                            <MenuItem value="45">:45</MenuItem>      
                        </TextField>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            select
                            label="End Hour"
                            id="endTimeHour"
                            name="endTimeHour"
                            value={props.endTimeHour}
                            onChange={props.handleInputChange}
                            margin="normal"
                            variant="outlined"
                            placeholder={props.endTimeHour}
                            fullWidth
                        >
                            {props.endIntArr.map((hour) => (
                                <MenuItem key={hour.value} value={hour.value}>
                                    {hour.display}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            select
                            label="End Minute"
                            id="endTimeMinute"
                            name="endTimeMinute"
                            value={props.endTimeMinute}
                            onChange={props.handleInputChange}
                            margin="normal"
                            variant="outlined"
                            placeholder={props.endTimeMinute}
                            fullWidth
                        >
                            <MenuItem value="00">:00</MenuItem>
                            <MenuItem value="15">:15</MenuItem>
                            <MenuItem value="30">:30</MenuItem>
                            <MenuItem value="45">:45</MenuItem>      
                        </TextField>
                    </Grid> 
                </Grid>   
            </DialogContent>
            <DialogActions>
                <Button data-userid={props.userid} onClick={props.handleProposeSubmit} color="primary">
                    Propose Match
                </Button>
                <Button onClick={props.onHide} color="secondary">
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default ProposeMuiModal;
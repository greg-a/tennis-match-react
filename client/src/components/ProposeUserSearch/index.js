import React from "react";
import { TextField, MenuItem, Button, Grid } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';

const testUsernames = [
    {username: "nacho", firstname: "Nacho", lastname: "Kat"},
    {username: "perry", firstname: "", lastname: ""},
    {username: "hartke10", firstname: "Connor", lastname: "Dougherty"}
]

function ProposeUserSearch(props) {
    return (
        <div>
            <Grid item xs={12} style={{textAlign: "center"}}>
                <h3>Propose Match to a Player</h3>
                <p>{props.instructions}</p>
            </Grid>
            <form>
                <Grid container spacing={3}>
                    {/* <Grid item xs={12}>
                        <Autocomplete
                            id="userSearch"
                            freesolo
                            options={testUsernames}
                            getOptionLabel={(option) => option.username}
                            renderOption={(option)=> <span>{option.username} ({option.firstname} {option.lastname})</span>}
                            renderInput={(params)=>(
                                <TextField {...params}
                                    label="Username"
                                    margin="normal"
                                    variant="outlined"
                                    
                                ></TextField>
                            )}
                        />
                    </Grid> */}
                    <Grid item xs={12}>
                    <div className="form-group">
                        <label for="userSearch">Username</label>
                        <input type="text" autoComplete="off" className="form-control" id="userSearch" name="userSearch" list="users"
                            onChange={props.handleUsernameChange}
                            value={props.userSearch}
                        />
                        <datalist id="users">
                            {props.userResults.map((event, i) => (
                                <option value={event.username} key={i}>{event.username} ({event.firstname} {event.lastname})</option>
                            ))}
                        </datalist>
                    </div>
                    </Grid>
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
                            <MenuItem value="Casual">
                                    Casual
                            </MenuItem>
                            <MenuItem value="Competitive">
                                    Competitive
                            </MenuItem>
                        </TextField>
                        {/* <label for="eventTitle">Play Type</label>
                        <select className="form-control" name="eventTitle" id="eventTitle" onChange={props.handleInputChange} value={props.eventTitle}>
                            <option value="Choose...">Choose...</option>
                            <option value="Casual">Casual</option>
                            <option value="Competitive">Competitive</option>
                        </select> */}
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
                            {props.courtList.map((option) => (
                                <MenuItem key={option} value={option}>
                                    {option}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>
                    {/* <div className="form-group" >
                        <label for="eventLocation" >Court Location</label>
                        <select className="form-control" name="eventLocation" id="eventLocation"
                            onChange={props.handleInputChange}
                            value={props.eventLocation} >
                            {props.courtList.map((event, j) => (
                                <option value={event} key={j}>{event}</option>
                            ))}
                        </select>
                    </div> */}
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
                    {/* <div className="form-group">
                        <label for="newDate">Date</label>
                        <input type="date" className="form-control" id="newDate" name="newDate"
                            onChange={props.handleInputChange}
                            value={props.newDate}
                        />
                    </div> */}
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
                    {/* <div className="form-row">
                    <div className="form-group col">
                        <label for="startTimeHour">Start Hour</label>
                        <select className="form-control" name="startTimeHour" id="startTimeHour" onChange={props.handleInputChange}
                            value={props.startTimeHour}>
                            <option value="Choose...">Choose...</option>    
                            <option value="00">12 AM</option>
                            <option value="01">1 AM</option>
                            <option value="02">2 AM</option>
                            <option value="03">3 AM</option>
                            <option value="04">4 AM</option>
                            <option value="05">5 AM</option>
                            <option value="06">6 AM</option>
                            <option value="07">7 AM</option>
                            <option value="08">8 AM</option>
                            <option value="09">9 AM</option>
                            <option value="10">10 AM</option>
                            <option value="11">11 AM</option>
                            <option value="12">12 PM</option>
                            <option value="13">1 PM</option>
                            <option value="14">2 PM</option>
                            <option value="15">3 PM</option>
                            <option value="16">4 PM</option>
                            <option value="17">5 PM</option>
                            <option value="18">6 PM</option>
                            <option value="19">7 PM</option>
                            <option value="20">8 PM</option>
                            <option value="21">9 PM</option>
                            <option value="22">10 PM</option>
                            <option value="23">11 PM</option>
                        </select>
                    </div>
                    <div className="form-group col">
                        <label for="startTimeMinute">Start Minute</label>
                        <select className="form-control" name="startTimeMinute" id="startTimeMinute" onChange={props.handleInputChange}
                            value={props.startTimeMinute}>
                            <option value="Choose...">Choose...</option> 
                            <option value="00">:00</option>
                            <option value="15">:15</option>
                            <option value="30">:30</option>
                            <option value="45">:45</option>
                        </select>
                    </div>
                    </div> */}
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
                    {/* <div className="form-row">
                    <div className="form-group col">
                        <label for="endTimeHour">End Hour</label>
                        <select className="form-control" name="endTimeHour" id="endTimeHour" onChange={props.handleInputChange}
                            value={props.endTimeHour}>
                            <option value="Choose...">Choose...</option>
                            <option value="00">12 AM</option>
                            <option value="01">1 AM</option>
                            <option value="02">2 AM</option>
                            <option value="03">3 AM</option>
                            <option value="04">4 AM</option>
                            <option value="05">5 AM</option>
                            <option value="06">6 AM</option>
                            <option value="07">7 AM</option>
                            <option value="08">8 AM</option>
                            <option value="09">9 AM</option>
                            <option value="10">10 AM</option>
                            <option value="11">11 AM</option>
                            <option value="12">12 PM</option>
                            <option value="13">1 PM</option>
                            <option value="14">2 PM</option>
                            <option value="15">3 PM</option>
                            <option value="16">4 PM</option>
                            <option value="17">5 PM</option>
                            <option value="18">6 PM</option>
                            <option value="19">7 PM</option>
                            <option value="20">8 PM</option>
                            <option value="21">9 PM</option>
                            <option value="22">10 PM</option>
                            <option value="23">11 PM</option>
                        </select>
                    </div>
                    <div className="form-group col">
                        <label for="endTimeMinute">End Minute</label>
                        <select className="form-control" name="endTimeMinute" id="endTimeMinute" onChange={props.handleInputChange}
                            value={props.endTimeMinute}>
                            <option value="Choose...">Choose...</option>
                            <option value="00">:00</option>
                            <option value="15">:15</option>
                            <option value="30">:30</option>
                            <option value="45">:45</option>
                        </select>
                    </div>
                    </div> */}
                    <Grid item xs={12}>   
                        <Button variant="contained" color="primary" onClick={props.handleProposeSubmit}>
                            Propose Match
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </div>
    )
}

export default ProposeUserSearch;
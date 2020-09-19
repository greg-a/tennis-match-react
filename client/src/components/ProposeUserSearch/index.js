import React from "react";
import { TextField, MenuItem, Button, Grid } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';

function ProposeUserSearch(props) {
    return (
        <Grid item xs={12}>
            <Grid item xs={12} style={{textAlign: "center"}}>
                <h3>Propose Match to a Player</h3>
                <p>{props.instructions}</p>
            </Grid>
            <form>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Autocomplete
                            id="userSearch"
                            freesolo
                            autoSelect
                            name="userSearch"
                            value={props.userSearch}
                            onChange={props.handleNewChange}
                            inputValue={props.eventValue}
                            onInputChange={props.handleUsernameChange}
                            options={props.userResults}
                            getOptionLabel={(option) => option.username}
                            renderOption={(option)=> (option.firstname ? <span>{option.username} ({option.firstname} {option.lastname})</span> : <span>{option.username}</span>)}
                            renderInput={(params)=>(
                                <TextField {...params}
                                    label="Username"
                                    margin="normal"
                                    variant="outlined"
                                    
                                ></TextField>
                            )}
                        />
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
                        <Button variant="contained" color="primary" onClick={props.handleProposeSubmit}>
                            Propose Match
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Grid>
    )
}

export default ProposeUserSearch;
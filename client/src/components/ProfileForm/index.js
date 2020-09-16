import React from "react";
import { TextField, Select, InputLabel, MenuItem, FormControl, Button, Grid } from '@material-ui/core';

const states = [
    {
        value: "AL",
        label: "AL"
    },
    {
        value: "AK",
        label: "AK"
    },
    {
        value: "AZ",
        label: "AZ"
    },
    {
        value: "AR",
        label: "AR"
    },
    {
        value: "CA",
        label: "CA"
    },
    {
        value: "CO",
        label: "CO"
    },
    {
        value: "CT",
        label: "CT"
    },
    {
        value: "DE",
        label: "DE"
    },
    {
        value: "DC",
        label: "DC"
    },
    {
        value: "FL",
        label: "FL"
    },
    {
        value: "GA",
        label: "GA"
    },
    {
        value: "HI",
        label: "HI"
    },
    {
        value: "ID",
        label: "ID"
    },
    {
        value: "IL",
        label: "IL"
    },
    {
        value: "IN",
        label: "IN"
    },
    {
        value: "IA",
        label: "IA"
    },
    {
        value: "KS",
        label: "KS"
    },
    {
        value: "KY",
        label: "KY"
    },
    {
        value: "LA",
        label: "LA"
    },
    {
        value: "ME",
        label: "ME"
    },
    {
        value: "MD",
        label: "MD"
    },
    {
        value: "MA",
        label: "MA"
    },
    {
        value: "MI",
        label: "MI"
    },
    {
        value: "MN",
        label: "MN"
    },
    {
        value: "MS",
        label: "MS"
    },
    {
        value: "MO",
        label: "MO"
    },
    {
        value: "MT",
        label: "MT"
    },
    {
        value: "NE",
        label: "NE"
    },
    {
        value: "NV",
        label: "NV"
    },
    {
        value: "NH",
        label: "NH"
    },
    {
        value: "NJ",
        label: "NJ"
    },
    {
        value: "NM",
        label: "NM"
    },
    {
        value: "NY",
        label: "NY"
    },
    {
        value: "NC",
        label: "NC"
    },
    {
        value: "ND",
        label: "ND"
    },
    {
        value: "OH",
        label: "OH"
    },
    {
        value: "OK",
        label: "OK"
    },
    {
        value: "OR",
        label: "OR"
    },
    {
        value: "PA",
        label: "PA"
    },
    {
        value: "RI",
        label: "RI"
    },
    {
        value: "SC",
        label: "SC"
    },
    {
        value: "SD",
        label: "SD"
    },
    {
        value: "TN",
        label: "TN"
    },
    {
        value: "TX",
        label: "TX"
    },
    {
        value: "UT",
        label: "UT"
    },
    {
        value: "VT",
        label: "VT"
    },
    {
        value: "VA",
        label: "VA"
    },
    {
        value: "WA",
        label: "WA"
    },
    {
        value: "WV",
        label: "WV"
    },
    {
        value: "WI",
        label: "WI"
    },
    {
        value: "WY",
        label: "WY"
    }
];

const skills = [
    {
        value: "1",
        label: "1.0-1.5 - New Player"
    },
    {
        value: "2",
        label: "2.0 - Beginner"
    },
    {
        value: "3",
        label: "2.5 - Beginner +"
    },
    {
        value: "4",
        label: "3.0 - Beginner-Intermediate"
    },
    {
        value: "5",
        label: "3.5 - Intermediate"
    },
    {
        value: "6",
        label: "4.0 - Intermediate-Advanced"
    },
    {
        value: "7",
        label: "4.5 - Advanced"
    }
]

function ProfileForm(props) {
    return (
        <div> 
            <form>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                        <TextField
                            label="Username"
                            value={props.username}
                            margin="normal"
                            variant="outlined"
                            disabled={true}
                            fullWidth={true}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            label="Email"
                            value={props.email}
                            margin="normal"
                            variant="outlined"
                            disabled={true}
                            fullWidth={true}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>  
                        <TextField
                            disabled={!props.editToggle}
                            label="First Name"
                            id="updateFirstname"
                            name="updateFirstname"
                            value={props.updateFirstname === null ? props.defaultFirst : props.updateFirstname}
                            onChange={props.handleInputChange}
                            placeholder={props.defaultFirst}
                            margin="normal"
                            variant="outlined"
                            fullWidth={true}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}> 
                        <TextField
                            disabled={!props.editToggle}
                            label="Last Name"
                            id="updateLastname"
                            name="updateLastname"
                            value={props.updateLastname === null ? props.defaultLast : props.updateLastname}
                            onChange={props.handleInputChange}
                            margin="normal"
                            variant="outlined"
                            placeholder={props.defaultLast}
                            fullWidth={true}
                        />
                    </Grid>
                    <Grid item xs={12} sm={8} md={6}>   
                        <TextField
                            disabled={!props.editToggle}
                            label="City"
                            id="updateCity"
                            name="updateCity"
                            value={props.updateCity === null ? props.defaultCity : props.updateCity}
                            onChange={props.handleInputChange}
                            margin="normal"
                            variant="outlined"
                            placeholder={props.defaultCity}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} sm={4} md={3}>  
                        <TextField
                            disabled={!props.editToggle}
                            select
                            label="State"
                            id="updateState"
                            name="updateState"
                            value={props.updateState === null ? props.defaultState : props.updateState}
                            onChange={props.handleInputChange}
                            margin="normal"
                            variant="outlined"
                            placeholder={props.defaultState}
                            fullWidth
                        >
                            {states.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>
                    <Grid item xs={12} sm={12} md={3}>  
                        <TextField
                            disabled={!props.editToggle}
                            label="Zip"
                            id="updateZipcode"
                            name="updateZipcode"
                            value={props.updateZipcode === null ? props.defaultZip : props.updateZipcode}
                            onChange={props.handleInputChange}
                            margin="normal"
                            variant="outlined"
                            placeholder={props.defaultZip}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            disabled={!props.editToggle}
                            select
                            label="Skill Level"
                            id="updateSkilllevel"
                            name="updateSkilllevel"
                            value={props.updateSkilllevel === null ? props.defaultSkill : props.updateSkilllevel}
                            onChange={props.handleInputChange}
                            margin="normal"
                            variant="outlined"
                            placeholder={props.defaultSkill}
                            fullWidth
                        >
                            {skills.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>
                    <Grid item xs={12}>   
                        <Button variant="contained" color="primary" disabled={!props.editToggle} onClick={props.handleFormSubmit}>
                            Update
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </div>
    )
}

export default ProfileForm;

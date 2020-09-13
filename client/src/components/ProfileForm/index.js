import React from "react";
import { TextField, Select, InputLabel, MenuItem, FormControl, Button } from '@material-ui/core';

function ProfileForm(props) {
    return (
        <div>
            <form>
                <div className="form-row">
                    <div className="form-group col-md-6">
                        <TextField
                            label="Username"
                            value={props.username}
                            margin="normal"
                            variant="outlined"
                            disabled={true}
                        />
                        <TextField
                            label="Email"
                            value={props.email}
                            margin="normal"
                            variant="outlined"
                            disabled={true}
                        />
                    </div>

                </div>
                <div className="form-row">
                    <div className="form-group col-md-6">
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
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-group col-md-6">
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
                        />
                        <FormControl variant="outlined" margin="normal" disabled={!props.editToggle}>
                            <InputLabel
                                for="updateState"
                                id="state-select-label">
                                State
                                </InputLabel>
                            <Select
                                id="updateState"
                                labelId="state-select-label"
                                name="updateState"
                                onChange={props.handleInputChange}
                                value={props.updateState === null ? props.defaultState : props.updateState} >
                                <MenuItem value="">Choose...</MenuItem>
                                <MenuItem value="AL">Alabama</MenuItem>
                                <MenuItem value="AK">Alaska</MenuItem>
                                <MenuItem value="AZ">Arizona</MenuItem>
                                <MenuItem value="AR">Arkansas</MenuItem>
                                <MenuItem value="CA">California</MenuItem>
                                <MenuItem value="CO">Colorado</MenuItem>
                                <MenuItem value="CT">Connecticut</MenuItem>
                                <MenuItem value="DE">Delaware</MenuItem>
                                <MenuItem value="DC">District Of Columbia</MenuItem>
                                <MenuItem value="FL">Florida</MenuItem>
                                <MenuItem value="GA">Georgia</MenuItem>
                                <MenuItem value="HI">Hawaii</MenuItem>
                                <MenuItem value="ID">Idaho</MenuItem>
                                <MenuItem value="IL">Illinois</MenuItem>
                                <MenuItem value="IN">Indiana</MenuItem>
                                <MenuItem value="IA">Iowa</MenuItem>
                                <MenuItem value="KS">Kansas</MenuItem>
                                <MenuItem value="KY">Kentucky</MenuItem>
                                <MenuItem value="LA">Louisiana</MenuItem>
                                <MenuItem value="ME">Maine</MenuItem>
                                <MenuItem value="MD">Maryland</MenuItem>
                                <MenuItem value="MA">Massachusetts</MenuItem>
                                <MenuItem value="MI">Michigan</MenuItem>
                                <MenuItem value="MN">Minnesota</MenuItem>
                                <MenuItem value="MS">Mississippi</MenuItem>
                                <MenuItem value="MO">Missouri</MenuItem>
                                <MenuItem value="MT">Montana</MenuItem>
                                <MenuItem value="NE">Nebraska</MenuItem>
                                <MenuItem value="NV">Nevada</MenuItem>
                                <MenuItem value="NH">New Hampshire</MenuItem>
                                <MenuItem value="NJ">New Jersey</MenuItem>
                                <MenuItem value="NM">New Mexico</MenuItem>
                                <MenuItem value="NY">New York</MenuItem>
                                <MenuItem value="NC">North Carolina</MenuItem>
                                <MenuItem value="ND">North Dakota</MenuItem>
                                <MenuItem value="OH">Ohio</MenuItem>
                                <MenuItem value="OK">Oklahoma</MenuItem>
                                <MenuItem value="OR">Oregon</MenuItem>
                                <MenuItem value="PA">Pennsylvania</MenuItem>
                                <MenuItem value="RI">Rhode Island</MenuItem>
                                <MenuItem value="SC">South Carolina</MenuItem>
                                <MenuItem value="SD">South Dakota</MenuItem>
                                <MenuItem value="TN">Tennessee</MenuItem>
                                <MenuItem value="TX">Texas</MenuItem>
                                <MenuItem value="UT">Utah</MenuItem>
                                <MenuItem value="VT">Vermont</MenuItem>
                                <MenuItem value="VA">Virginia</MenuItem>
                                <MenuItem value="WA">Washington</MenuItem>
                                <MenuItem value="WV">West Virginia</MenuItem>
                                <MenuItem value="WI">Wisconsin</MenuItem>
                                <MenuItem value="WY">Wyoming</MenuItem>
                            </Select>
                        </FormControl>
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
                        />
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-group col-md-6">
                        <FormControl variant="outlined" margin="normal" disabled={!props.editToggle} fullWidth={true}>
                            <InputLabel
                                for="updateSkill"
                                id="skill-select-label">
                                Skill Level
                                </InputLabel>
                            <Select
                                id="updateSkill"
                                labelId="skill-select-label"
                                name="updateSkilllevel"
                                onChange={props.handleInputChange}
                                value={props.updateSkilllevel === null ? props.defaultSkill : props.updateSkilllevel} >
                                <MenuItem value="1">1.0-1.5 - New Player</MenuItem>
                                <MenuItem value="2">2.0 - Beginner</MenuItem>
                                <MenuItem value="3">2.5 - Beginner +</MenuItem>
                                <MenuItem value="4">3.0 - Beginner-Intermediate</MenuItem>
                                <MenuItem value="5">3.5 - Intermediate</MenuItem>
                                <MenuItem value="6">4.0 - Intermediate-Advanced</MenuItem>
                                <MenuItem value="7">4.5 - Advanced</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                </div>
                {/* <h3>Skills</h3>
        <div className="form-row">
            <div className="input-group mb-3 col-md-6">
                <div className="input-group-prepend">
                    <label className="input-group-text" for="skill-level">Skill Level</label>
                </div>
                <select className="custom-select" id="skill-level">
                    <MenuItem selected>Choose...</MenuItem>
                    <MenuItem value="1">1.0-1.5 - New Player</MenuItem>
                    <MenuItem value="2">2.0 - Beginner</MenuItem>
                    <MenuItem value="3">2.5 - Beginner +</MenuItem>
                    <MenuItem value="4">3.0 - Beginner-Intermediate</MenuItem>
                    <MenuItem value="5">3.5 - Intermediate</MenuItem>
                    <MenuItem value="6">4.0 - Intermediate-Advanced</MenuItem>
                    <MenuItem value="7">4.5 - Advanced</MenuItem>
                </select>
            </div>
            <div className="input-group mb-3 col-md-6">
                <div className="input-group-prepend">
                    <label className="input-group-text" for="skill-level-opponent">Opponent Skill</label>
                </div>
                <select className="custom-select" id="skill-level-opponent">
                    <MenuItem selected>Choose...</MenuItem>
                    <MenuItem value="1">1.0-1.5 - New Player</MenuItem>
                    <MenuItem value="2">2.0 - Beginner</MenuItem>
                    <MenuItem value="3">2.5 - Beginner +</MenuItem>
                    <MenuItem value="4">3.0 - Beginner-Intermediate</MenuItem>
                    <MenuItem value="5">3.5 - Intermediate</MenuItem>
                    <MenuItem value="6">4.0 - Intermediate-Advanced</MenuItem>
                    <MenuItem value="7">4.5 - Advanced</MenuItem>
                </select>
            </div>
        </div>
        <h3>Courts</h3>
        <div className="form-group">
            <input type="search" className="form-control" id="court-search" placeholder="Search" />
        </div> */}
                <Button variant="contained" color="primary" disabled={!props.editToggle} onClick={props.handleFormSubmit}>
                    Update
                </Button>
            </form>
        </div>
    )
}

export default ProfileForm;

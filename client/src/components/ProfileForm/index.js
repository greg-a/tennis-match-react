import React from "react";

function ProfileForm(props) {
    return (
        <div>
            <form>
                <div className="form-row">
                    <div className="form-group col-md-6">
                        <label for="updateFirstname">First Name</label>
                        <input type="name" className="form-control" id="updateFirstname" name="updateFirstname" placeholder="First Name" onChange={props.handleInputChange}
                        value={props.updateFirstname} />
                    </div>
                    <div className="form-group col-md-6">
                        <label for="updateLastname">Last Name (Optional)</label>
                        <input type="name" className="form-control" id="updateLastname" name="updateLastname" placeholder="Last Name" 
                        onChange={props.handleInputChange}
                        value={props.updateLastname} />
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-group col-md-6">
                        <label for="updateCity">City</label>
                        <input type="text" className="form-control" id="updateCity" name="updateCity" placeholder="City" 
                        onChange={props.handleInputChange}
                        value={props.updateCity} />
                    </div>
                    <div className="form-group col-md-4">
                        <label for="updateState">State</label>
                        <select id="updateState" name="updateState" className="form-control"
                        onChange={props.handleInputChange}
                        value={props.updateState} >
                            <option value="">Choose...</option>
                            <option value="AL">Alabama</option>
                            <option value="AK">Alaska</option>
                            <option value="AZ">Arizona</option>
                            <option value="AR">Arkansas</option>
                            <option value="CA">California</option>
                            <option value="CO">Colorado</option>
                            <option value="CT">Connecticut</option>
                            <option value="DE">Delaware</option>
                            <option value="DC">District Of Columbia</option>
                            <option value="FL">Florida</option>
                            <option value="GA">Georgia</option>
                            <option value="HI">Hawaii</option>
                            <option value="ID">Idaho</option>
                            <option value="IL">Illinois</option>
                            <option value="IN">Indiana</option>
                            <option value="IA">Iowa</option>
                            <option value="KS">Kansas</option>
                            <option value="KY">Kentucky</option>
                            <option value="LA">Louisiana</option>
                            <option value="ME">Maine</option>
                            <option value="MD">Maryland</option>
                            <option value="MA">Massachusetts</option>
                            <option value="MI">Michigan</option>
                            <option value="MN">Minnesota</option>
                            <option value="MS">Mississippi</option>
                            <option value="MO">Missouri</option>
                            <option value="MT">Montana</option>
                            <option value="NE">Nebraska</option>
                            <option value="NV">Nevada</option>
                            <option value="NH">New Hampshire</option>
                            <option value="NJ">New Jersey</option>
                            <option value="NM">New Mexico</option>
                            <option value="NY">New York</option>
                            <option value="NC">North Carolina</option>
                            <option value="ND">North Dakota</option>
                            <option value="OH">Ohio</option>
                            <option value="OK">Oklahoma</option>
                            <option value="OR">Oregon</option>
                            <option value="PA">Pennsylvania</option>
                            <option value="RI">Rhode Island</option>
                            <option value="SC">South Carolina</option>
                            <option value="SD">South Dakota</option>
                            <option value="TN">Tennessee</option>
                            <option value="TX">Texas</option>
                            <option value="UT">Utah</option>
                            <option value="VT">Vermont</option>
                            <option value="VA">Virginia</option>
                            <option value="WA">Washington</option>
                            <option value="WV">West Virginia</option>
                            <option value="WI">Wisconsin</option>
                            <option value="WY">Wyoming</option>
                        </select>
                    </div>
                    <div className="form-group col-md-2">
                        <label for="updateZipcode">Zip</label>
                        <input type="text" className="form-control" id="updateZipcode" name="updateZipcode" 
                        onChange={props.handleInputChange}
                        value={props.updateZipcode} />
                    </div>
                </div>
                {/* <h3>Skills</h3>
        <div className="form-row">
            <div className="input-group mb-3 col-md-6">
                <div className="input-group-prepend">
                    <label className="input-group-text" for="skill-level">Skill Level</label>
                </div>
                <select className="custom-select" id="skill-level">
                    <option selected>Choose...</option>
                    <option value="1">1.0-1.5 - New Player</option>
                    <option value="2">2.0 - Beginner</option>
                    <option value="3">2.5 - Beginner +</option>
                    <option value="4">3.0 - Beginner-Intermediate</option>
                    <option value="5">3.5 - Intermediate</option>
                    <option value="6">4.0 - Intermediate-Advanced</option>
                    <option value="7">4.5 - Advanced</option>
                </select>
            </div>
            <div className="input-group mb-3 col-md-6">
                <div className="input-group-prepend">
                    <label className="input-group-text" for="skill-level-opponent">Opponent Skill</label>
                </div>
                <select className="custom-select" id="skill-level-opponent">
                    <option selected>Choose...</option>
                    <option value="1">1.0-1.5 - New Player</option>
                    <option value="2">2.0 - Beginner</option>
                    <option value="3">2.5 - Beginner +</option>
                    <option value="4">3.0 - Beginner-Intermediate</option>
                    <option value="5">3.5 - Intermediate</option>
                    <option value="6">4.0 - Intermediate-Advanced</option>
                    <option value="7">4.5 - Advanced</option>
                </select>
            </div>
        </div>
        <h3>Courts</h3>
        <div className="form-group">
            <input type="search" className="form-control" id="court-search" placeholder="Search" />
        </div> */}
                <button type="submit" className="btn btn-primary" id="update-btn" onClick={props.handleFormSubmit}>Update</button>
            </form>
        </div>
    )
}

export default ProfileForm;

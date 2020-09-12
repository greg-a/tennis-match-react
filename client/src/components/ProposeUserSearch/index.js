import React from "react";

function ProposeUserSearch(props) {
    return (
        <div>
            <h2>Propose Match to a Player</h2>
            <p>{props.instructions}</p>
            <form>
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
                <div className="form-group">
                    <label for="newDate">Date</label>
                    <input type="date" className="form-control" id="newDate" name="newDate"
                        onChange={props.handleInputChange}
                        value={props.newDate}
                    />
                </div>
                <div className="form-row">
                <div className="form-group col">
                    <label for="startTimeHour">Start Hour</label>
                    <select className="form-control" name="startTimeHour" id="startTimeHour" onChange={props.handleInputChange}
                        value={props.startTimeHour}>
                        <option value="choose">Choose...</option>
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
                        <option value="choose">Choose...</option>
                        <option value="00">:00</option>
                        <option value="15">:15</option>
                        <option value="30">:30</option>
                        <option value="45">:45</option>
                    </select>
                </div>
                </div>
                <div className="form-row">
                <div className="form-group col">
                    <label for="endTimeHour">End Hour</label>
                    <select className="form-control" name="endTimeHour" id="endTimeHour" onChange={props.handleInputChange}
                        value={props.endTimeHour}>
                        <option value="choose">Choose...</option>
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
                        <option value="choose">Choose...</option>
                        <option value="00">:00</option>
                        <option value="15">:15</option>
                        <option value="30">:30</option>
                        <option value="45">:45</option>
                    </select>
                </div>
                </div>
                <button type="button" className="btn" onClick={props.handleProposeSubmit} >Propose Match</button>
            </form>
        </div>
    )
}

export default ProposeUserSearch;
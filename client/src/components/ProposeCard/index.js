import React from "react";

function ProposeCard(props) {

    return (
        <div >
            <div className="card my-2" >
                    <div className="card-body" >
                        <h5 className="card-title" >{props.title}</h5>
                        <h6 className="card-subtitle mb-2 text-muted" >Username: {props.userid}</h6>
                        <p className="card-text" >Start Time: {props.starttime}</p>
                        <p className="card-text" >End Time: {props.endtime}</p>

                        <form >
                            <div className="form-row">
                                <div className="form-group mr-1" >
                                    <label for="startTimeHour" >Start Hour</label>
                                    <select className="form-control" name="startTimeHour" id="startTimeHour" 
                                    onChange={props.handleInputChange}
                                    value={props.startTimeHour} >
                                        <option value="choose">Choose...</option>
                                        {props.startIntArr.map((event, j) => (
                                            <option value={event} key={j}>{event}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="form-group" >
                                    <label for="startTimeMinute" >Start Minute</label>
                                    <select className="form-control" name="startTimeMinute" id="startTimeMinute" 
                                    onChange={props.handleInputChange}
                                    value={props.startTimeMinute} >
                                        <option value="choose">Choose...</option>
                                        <option value="00">:00</option>
                                        <option value="15">:15</option>
                                        <option value="30">:30</option>
                                        <option value="45">:45</option>
                                    </select>
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="form-group mr-1" >
                                    <label for="endTimeHour" >End Hour</label>
                                    <select className="form-control" name="endTimeHour" id="endTimeHour" 
                                    onChange={props.handleInputChange}
                                    value={props.endTimeHour} >
                                        <option value="choose">Choose...</option>
                                        {props.endIntArr.map((event, j) => (
                                            <option value={event} key={j}>{event}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="form-group" >
                                    <label for="endTimeMinute" >End Minute</label>
                                    <select className="form-control" name="endTimeMinute" id="endTimeMinute" 
                                    onChange={props.handleInputChange}
                                    value={props.endTimeMinute} >
                                        <option value="choose">Choose...</option>
                                        <option value="00">:00</option>
                                        <option value="15">:15</option>
                                        <option value="30">:30</option>
                                        <option value="45">:45</option>
                                    </select>
                                </div>
                            </div>
                            <button type="button" className="btn btn-primary" data-userid={props.userid} onClick={props.handleProposeSubmit}>Propose Match</button>
                        </form>
                    </div>
                </div>
        </div>
    );
}

export default ProposeCard;
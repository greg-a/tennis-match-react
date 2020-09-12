import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

export function SchedulerModal(props) {
    return (
        <Modal
            {...props}
            size="sm"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    {props.thisDate}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Button className="mr-3" href="/newevent">Create Event</Button>
                <Button className="mr-3" href="#">Find Events</Button>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
}

export function ProposeModal(props) {
    return (
        <Modal
            {...props}
            size="sm"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    {props.title}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>Username: {props.userid}</p>
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
                </form>
            </Modal.Body>
            <Modal.Footer>
                <Button data-userid={props.userid} onClick={props.handleProposeSubmit}>Propose Match</Button>
                <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
}

export function EventDetailsModal(props) {
    return (
        <Modal
            {...props}
            size="sm"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    {props.eventName}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>Date: {props.date}</p>
                <p>Location: {props.location}</p>
                <p>Player One: {props.playerOneUsername} ({props.playerOneFirst} {props.playerOneLast})</p>
                <p>Player Two: {props.playerTwoUsername} ({props.playerTwoFirst} {props.playerTwoLast})</p>
                <p>Start Time: {props.startTime}</p>
                <p>End Time: {props.endTime}</p>
                <Button href="#" onClick={props.onClick}>Delete</Button>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
}


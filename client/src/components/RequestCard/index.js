import React from "react";

function RequestCard(props) {

    return (
        <div >
            <div className="card my-2" >
                    <div className="card-body" >
                        <h5 className="card-title" >{props.title}</h5>
                        <h6 className="card-subtitle mb-2 text-muted" >{props.proposeUserFirstname ? `Request by: ${props.proposeUsername} (${props.proposeUserFirstname} ${props.proposeUserLastname})` : `Request by: ${props.proposeUsername}`}</h6>
                        <p className="card-text">Court Location: {props.eventLocation}</p>
                        <p className="card-text" >Date: {props.date}</p>
                        <p className="card-text" >Start Time: {props.starttime}</p>
                        <p className="card-text" >End Time: {props.endtime}</p>

                        
                        <button type="button" className="btn btn-primary mr-2" data-eventid={props.eventId} data-eventtitle={props.title} data-start={props.fullStarttime} data-end={props.fullEndtime} onClick={props.handleConfirm}>Confirm</button>
                        <button type="button" className="btn btn-danger" data-eventid={props.eventId} onClick={props.handleDeny}>Deny</button>
                    </div>
                </div>
        </div>
    );
}

export default RequestCard;
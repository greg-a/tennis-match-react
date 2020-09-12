import React from "react";

function RequestCard(props) {

    return (
        <div >
            <div className="card my-2" >
                    <div className="card-body" >
                        <h5 className="card-title" >{props.title}</h5>
                        <h6 className="card-subtitle mb-2 text-muted" >Username: {props.proposeUserid}</h6>
                        <p className="card-text" >Date: {props.date}</p>
                        <p className="card-text" >Start Time: {props.starttime}</p>
                        <p className="card-text" >End Time: {props.endtime}</p>

                        
                        <button type="button" className="btn" data-eventid={props.eventId} onClick={props.handleConfirm}>Confirm</button>
                    </div>
                </div>
        </div>
    );
}

export default RequestCard;
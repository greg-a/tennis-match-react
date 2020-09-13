import React from "react";

function ProposeCard(props) {

    return (
        <div >
            <div className="card my-2" >
                    <div className="card-body" >
                        <h5 className="card-title" >Type: {props.title}</h5>
                        <h6 className="card-subtitle mb-2 text-muted" >{props.userFirstname ? `Username: ${props.username} (${props.userFirstname} ${props.userLastname})` : `Username: ${props.username}`}</h6>
                        <p className="card-text">Skill level: {props.userSkill ? `${props.userSkill}` : `n/a`}</p>
                        <p className="card-text">Court Location: {props.eventLocation}</p>
                        <p className="card-text" >Start Time: {props.starttime}</p>
                        <p className="card-text" >End Time: {props.endtime}</p>

                        <button type="button" className="btn btn-primary" data-userid={props.userid} data-location={props.eventLocation} onClick={props.handleEventClick} data-index={props.eventIndex}>Propose Match</button>
                    </div>
                </div>
        </div>
    );
}

export default ProposeCard;
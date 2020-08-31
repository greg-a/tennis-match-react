import React from "react";

function ProfileDisplay(props) {
    return (
    <div>
    <h2>Profile</h2>
    <p>Username: {props.username}</p>
    <p>Email: {props.email}</p>
    <p>Name: {props.firstname} {props.lastname}</p>
    <p>Address: {props.city}, {props.state} {props.zipcode}</p>
    
    </div>
    )
}

export default ProfileDisplay;

import React from "react";

function Chatbox(props) {
    return (
            <div className="input-group">
                <div className="input-group-prepend">
                    <span className="input-group-text">Message</span>
                </div>
                <textarea className="form-control" aria-label="With textarea" onChange={props.handleInputChange}>{props.message}</textarea>
            </div>
    )
}

export default Chatbox;
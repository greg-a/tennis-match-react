import React from "react";

function Chatbox(props) {
    return (
        <div className="container">
            <ul class="list-group messages-list p-5">
                <li class="list-group-item">Cras justo odio</li>
                <li class="list-group-item">Dapibus ac facilisis in</li>
                <li class="list-group-item">Morbi leo risus</li>
                <li class="list-group-item">Porta ac consectetur ac</li>
                <li class="list-group-item">Vestibulum at eros</li>
            </ul>
            <div className="input-group pr-5">
                <div className="input-group-prepend">
                    <span className="input-group-text">Message</span>
                </div>
                <textarea className="form-control" aria-label="With textarea" onChange={props.handleInputChange} onKeyDown={props.pushSendMessage}>{props.message}</textarea>
            </div>
        </div>
    )
}

export default Chatbox;
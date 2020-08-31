import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function CenteredModal(props) {
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

export default CenteredModal;

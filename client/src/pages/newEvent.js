import React, { Component } from 'react';
import NewEventForm from '../components/NewEventForm';

class NewEvent extends Component {

    state = {
        newDate: "",
        startTimeHour: "",
        startTimeMinute: "",
        endTimeHour: "",
        endTimeMinute: ""
    }

    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    };


    render() {
        return (
            <div className="container">
                <NewEventForm
                    handleInputChange = {this.handleInputChange}
                    newDate = {this.state.newDate}
                    startTimeHour = {this.state.startTimeHour}
                    startTimeMinute = {this.state.startTimeMinute}
                    endTimeHour = {this.state.endTimeHour}
                    endTimeMinute = {this.state.endTimeMinute}
                />
            </div>

        )
    }

}

export default NewEvent;
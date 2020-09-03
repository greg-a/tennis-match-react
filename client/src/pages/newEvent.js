import React, { Component } from 'react';
import NewEventForm from '../components/NewEventForm';
import Nav from "../components/Nav";

class NewEvent extends Component {

    state = {
        newDate: "",
        startTimeHour: "00",
        startTimeMinute: "00",
        endTimeHour: "00",
        endTimeMinute: "00",
        eventTitle: "",
        navValue: "tab-two"
    }

    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    };

    handleFormSubmit = event => {
        event.preventDefault();
        let currentYear = this.state.newDate.substring(0, 4);
        console.log(currentYear);
        let currentMonth = this.state.newDate.substring(5, 7);
        let currentMonthAdj = parseInt(currentMonth) - 1;
        console.log(currentMonth);
        console.log(currentMonthAdj);

        let currentDay = this.state.newDate.substring(8, 10);
        console.log(currentDay);

        let currentStartDate = new Date(parseInt(currentYear), currentMonthAdj, parseInt(currentDay), parseInt(this.state.startTimeHour), parseInt(this.state.startTimeMinute));
        console.log("start: " + currentStartDate);
        let currentEndDate = new Date(parseInt(currentYear), currentMonthAdj, parseInt(currentDay), parseInt(this.state.endTimeHour), parseInt(this.state.endTimeMinute));
        console.log("end: " + currentEndDate);

        fetch("/api/calendar", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                title: this.state.eventTitle,
                start: currentStartDate,
                end: currentEndDate
            })
        })
            .then(res => res.json())
            .then(res => {
                console.log(res.statusString);
            })
            .catch(err => console.log(err));
    }


    render() {
        return (
            <div>
                <Nav
                    value={this.state.navValue}
                />
                <div className="container">
                    <NewEventForm
                        handleInputChange={this.handleInputChange}
                        eventTitle={this.state.eventTitle}
                        newDate={this.state.newDate}
                        startTimeHour={this.state.startTimeHour}
                        startTimeMinute={this.state.startTimeMinute}
                        endTimeHour={this.state.endTimeHour}
                        endTimeMinute={this.state.endTimeMinute}
                        handleFormSubmit={this.handleFormSubmit}
                    />
                </div>
            </div>
        )
    }

}

export default NewEvent;
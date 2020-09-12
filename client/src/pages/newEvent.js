import React, { Component } from 'react';
import NewEventForm from '../components/NewEventForm';
import Nav from "../components/Nav";

class NewEvent extends Component {

    state = {
        newDate: "",
        // startTimeHour: "00",
        // startTimeMinute: "00",
        // endTimeHour: "00",
        // endTimeMinute: "00",
        startTime: "17:00",
        endTime: "18:00",
        eventTitle: "Casual",
        eventLocation: "any",
        navValue: "tab-two",
        instructions: "Please enter the following information to set your availabilty",
        courtList: ["any","Fairmount Park","Temple","FDR Park","Chaminoux","Allens Lane Park","Seger Park"]
    }

    handleInputChange = event => {
        const { name, value } = event.target;
        console.log("name: " + name);
        console.log("value: " + value);
        this.setState({
            [name]: value
        });
    };

    handleFormSubmit = event => {
        event.preventDefault();
        let currentYear = this.state.newDate.substring(0, 4);
        
        let currentMonth = this.state.newDate.substring(5, 7);
        let currentMonthAdj = parseInt(currentMonth) - 1;

        let currentDay = this.state.newDate.substring(8, 10);

        // let currentStartDate = new Date(parseInt(currentYear), currentMonthAdj, parseInt(currentDay), parseInt(this.state.startTimeHour), parseInt(this.state.startTimeMinute));
        // let currentEndDate = new Date(parseInt(currentYear), currentMonthAdj, parseInt(currentDay), parseInt(this.state.endTimeHour), parseInt(this.state.endTimeMinute));
        let currentStartDate = new Date(parseInt(currentYear), currentMonthAdj, parseInt(currentDay), parseInt(this.state.startTime));
        let currentEndDate = new Date(parseInt(currentYear), currentMonthAdj, parseInt(currentDay), parseInt(this.state.endTime));
        console.log("start date: " + currentStartDate)
        fetch("/api/calendar", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                title: this.state.eventTitle,
                start: currentStartDate,
                end: currentEndDate,
                eventStatus: "available",
                location: this.state.eventLocation
            })
        })
            .then(res => res.json())
            .then(res => {
                console.log(res.statusString);
                if (res.statusString === "eventCreated") {
                    this.setState({
                        newDate: "",
                        // startTimeHour: "00",
                        // startTimeMinute: "00",
                        // endTimeHour: "00",
                        // endTimeMinute: "00",
                        startTime: this.state.startTime,
                        endTime: this.state.endTime,
                        eventTitle: "Casual",
                        eventLocation: "any",
                        instructions: "Your availability has been successfully updated!"
                    });
                } else {
                    this.setState({
                        newDate: "",
                        // startTimeHour: "00",
                        // startTimeMinute: "00",
                        // endTimeHour: "00",
                        // endTimeMinute: "00",
                        startTime: "17:00",
                        endTime: "18:00",
                        eventTitle: "Casual",
                        eventLocation: "any",
                        instructions: "Oops! Something went wrong. Please try again."
                    });
                }
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
                        eventLocation={this.state.eventLocation}
                        newDate={this.state.newDate}
                        // startTimeHour={this.state.startTimeHour}
                        // startTimeMinute={this.state.startTimeMinute}
                        // endTimeHour={this.state.endTimeHour}
                        // endTimeMinute={this.state.endTimeMinute}
                        startTime={this.state.startTime}
                        endTime={this.state.endTime}
                        handleFormSubmit={this.handleFormSubmit}
                        courtList={this.state.courtList}
                        instructions={this.state.instructions}
                    />
                </div>
            </div>
        )
    }

}

export default NewEvent;
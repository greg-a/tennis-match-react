import React, { Component } from 'react';
import ProposeMatchForm from '../components/ProposeMatchForm';
// import ProposeCard2 from '../components/ProposeCard2';
import ProposeCard from '../components/ProposeCard';
import moment from 'moment';
import { ProposeModal } from "../components/Modal";

class ProposeMatch extends Component {

    state = {
        newDate: "",
        startTimeHour: "",
        startTimeMinute: "",
        endTimeHour: "",
        endTimeMinute: "",
        searchResult: [],
        clickedResult: [],
        instructions: "Pick a date to search for other players' availability.",
        modalShow: false
    };

    setModalShow = bVal => {
        this.setState({ modalShow: bVal });
    };

    handleEventClick = (arg) => {
        const eventIndex = arg.target.dataset.index;
        const eventIndexArr = [];

        eventIndexArr.push(this.state.searchResult[eventIndex]);

        this.setState({ modalShow: true, clickedResult: eventIndexArr });
    };

    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    };

    handleFormSubmit = event => {
        event.preventDefault();
        let searchURL = "/api/calendar/propose?date=" + this.state.newDate;
        console.log(searchURL);
        fetch(searchURL)
            .then(res => res.json())
            .then(res => {
                console.log(res);
                // this.setState({searchResult: res});
                this.addInputTimes(res);
            })
            .catch(err => console.log(err));
    }

    handleProposeSubmit = event => {
        event.preventDefault();
        let currentYear = this.state.newDate.substring(0, 4);

        let currentMonth = this.state.newDate.substring(5, 7);
        let currentMonthAdj = parseInt(currentMonth) - 1;

        let currentDay = this.state.newDate.substring(8, 10);

        let currentStartDate = new Date(parseInt(currentYear), currentMonthAdj, parseInt(currentDay), parseInt(this.state.startTimeHour), parseInt(this.state.startTimeMinute));
        let currentEndDate = new Date(parseInt(currentYear), currentMonthAdj, parseInt(currentDay), parseInt(this.state.endTimeHour), parseInt(this.state.endTimeMinute));

        let currentProposeToUsedId = event.target.dataset.userid;

        fetch("/api/calendar", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                title: "proposed match",
                start: currentStartDate,
                end: currentEndDate,
                confirmedByUser: currentProposeToUsedId,
                eventStatus: "propose"
            })
        })
            .then(res => res.json())
            .then(res => {
                console.log(res.statusString);
                if (res.statusString === "eventCreated") {
                    this.setState(
                        {
                            newDate: "",
                            startTimeHour: "",
                            startTimeMinute: "",
                            endTimeHour: "",
                            endTimeMinute: "",
                            searchResult: [],
                            instructions: "Your request for a match has been sent!",
                            modalShow: false
                        }
                    )
                } else {
                    console.log(res);
                    this.setState(
                        {
                            newDate: "",
                            startTimeHour: "",
                            startTimeMinute: "",
                            endTimeHour: "",
                            endTimeMinute: "",
                            searchResult: [],
                            instructions: "Oops! Something went wrong. Please try again.",
                            modalShow: false
                        }
                    )
                }
            })
            .catch(err => console.log(err));

    }

    addInputTimes = (res) => {
        let searchArr = res;
        for (let i = 0; i < searchArr.length; i++) {
            let startIntArr = [];
            let endIntArr = [];

            for (let j = 0;
                j <= (parseInt(moment(searchArr[i].end).format("HH"))
                    - parseInt(moment(searchArr[i].start).format("HH"))); j++
            ) {
                startIntArr.push(j + parseInt(moment(searchArr[i].start).format("HH")));
                endIntArr.push(parseInt(moment(searchArr[i].end).format("HH")) - j);

            }
            searchArr[i].startIntArr = startIntArr;
            searchArr[i].endIntArr = endIntArr;
        }

        this.setState({ searchResult: searchArr });
    }




    render() {
        return (
            <div className="container">
                <ProposeMatchForm
                    handleInputChange={this.handleInputChange}
                    newDate={this.state.newDate}
                    instructions={this.state.instructions}
                    handleFormSubmit={this.handleFormSubmit}
                />
                {this.state.searchResult.map((event, i) => (
                    <ProposeCard
                        key={i}
                        title={event.title}
                        userid={event.UserId}
                        starttime={moment(event.start).format("hh:mm a")}
                        endtime={moment(event.end).format("hh:mm a")}
                        startIntArr={event.startIntArr}
                        endIntArr={event.endIntArr}
                        startTimeHour={this.state.startTimeHour}
                        startTimeMinute={this.state.startTimeMinute}
                        handleInputChange={this.handleInputChange}
                        handleEventClick={this.handleEventClick}
                        eventIndex={i}
                    />
                ))
                }
                {this.state.clickedResult.map(event => (
                <ProposeModal
                show={this.state.modalShow}
                onHide={() => this.setModalShow(false)} 
                title={event.title}
                userid={event.UserId}
                starttime={moment(event.start).format("hh:mm a")}
                endtime={moment(event.end).format("hh:mm a")}
                startIntArr={event.startIntArr}
                endIntArr={event.endIntArr}
                startTimeHour={this.state.startTimeHour}
                startTimeMinute={this.state.startTimeMinute}
                handleInputChange={this.handleInputChange}
                handleProposeSubmit={this.handleProposeSubmit}
                />
                ))}
            </div>

        )
    }

}

export default ProposeMatch;
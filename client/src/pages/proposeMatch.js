import React, { Component } from 'react';
import ProposeMatchForm from '../components/ProposeMatchForm';
import ProposeUserSearch from '../components/ProposeUserSearch'
import ProposeCard from '../components/ProposeCard';
import moment from 'moment';
import { ProposeModal } from "../components/Modal";
import Nav from "../components/Nav";

class ProposeMatch extends Component {

    state = {
        newDate: "",
        startTimeHour: "",
        startTimeMinute: "",
        endTimeHour: "",
        endTimeMinute: "",
        searchResult: [],
        clickedResult: [],
        instructions: "",
        userSearch: "",
        userResults: [],
        userId: "",
        eventLocation: "",
        eventTitle: "",
        modalShow: false,
        subsectionShow: "",
        courtList: ["Choose...","Fairmount Park","Temple","FDR Park","Chaminoux","Allens Lane Park","Seger Park"]
    };

    setModalShow = bVal => {
        this.setState({ 
            modalShow: bVal,
            startTimeHour: "",
            startTimeMinute: "",
            endTimeHour: "",
            endTimeMinute: ""
        });
    };

    handleEventClick = (arg) => {
        const eventIndex = arg.target.dataset.index;
        const eventIndexArr = [];

        eventIndexArr.push(this.state.searchResult[eventIndex]);

        console.log("TITLE: " + eventIndexArr[0].title)
        this.setState({ modalShow: true, clickedResult: eventIndexArr, eventLocation: arg.target.dataset.location, eventTitle: eventIndexArr[0].title });
    };

    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    };

    handleUsernameChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        }, () => {
            let searchURL = "/api/username?username=" + this.state.userSearch;
            fetch(searchURL)
                .then(res => res.json())
                .then(res => {
                    console.log(res)
                    this.setState({
                        userResults: res
                    }, () => {
                        for (let i = 0; i < (this.state.userResults).length; i++) {
                            let currentUserResults = this.state.userResults;
                            if (this.state.userSearch === currentUserResults[i].username) {
                                let currentUserId = currentUserResults[i].id;
                                this.setState({
                                    userId: currentUserId
                                })
                            }
                        }
                    });
                })
                .catch(err => console.log(err));
        });
    };

    handleFormSubmit = event => {
        event.preventDefault();
        this.setState({
            instructions: "Pick an availability and propose a time."
        })
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
        let currentProposeToUserId;
        if (event.target.dataset.userid) {
            currentProposeToUserId = event.target.dataset.userid;
        } else {
            currentProposeToUserId = this.state.userId
        }


        console.log("CURRENT PROPOSE USER: " + currentProposeToUserId);

        if(this.state.startTimeHour==="Choose..." || this.state.startTimeMinute==="Choose..." || this.state.endTimeHour==="Choose..." || this.state.endTimeMinute==="Choose..." || this.state.eventLocation==="Choose..." || this.state.eventLocation==="any" || this.state.eventLocation==="" || this.state.confirmedByUser==="" || this.state.eventTitle==="Choose..." || this.state.eventTitle==="") {
            this.setState(
                {
                    newDate: "",
                    startTimeHour: "",
                    startTimeMinute: "",
                    endTimeHour: "",
                    endTimeMinute: "",
                    searchResult: [],
                    instructions: "Oops! Something went wrong. Please try again.",
                    modalShow: false,
                    userSearch: "",
                    userResults: [],
                    userId: "",
                    eventLocation: "",
                    eventTitle: ""
                }
            )
        } else {

        fetch("/api/calendar", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                title: "Proposed - " + this.state.eventTitle,
                start: currentStartDate,
                end: currentEndDate,
                confirmedByUser: currentProposeToUserId,
                location: this.state.eventLocation,
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
                            modalShow: false,
                            userSearch: "",
                            userResults: [],
                            userId: "",
                            eventLocation: "",
                            eventTitle: ""
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
                            modalShow: false,
                            userSearch: "",
                            userResults: [],
                            userId: "",
                            eventLocation: ""
                        }
                    )
                }
            })
            .catch(err => console.log(err));
        }

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

    subsectionRender = () => {
        if (this.state.subsectionShow === "player") {
            return (
                <ProposeUserSearch 
                userSearch={this.state.userSearch}
                handleUsernameChange={this.handleUsernameChange}
                handleInputChange={this.handleInputChange}
                handleProposeSubmit={this.handleProposeSubmit}
                userResults={this.state.userResults}
                newDate={this.state.newDate}
                startTimeHour={this.state.startTimeHour}
                startTimeMinute={this.state.startTimeMinute}
                endTimeHour={this.state.endTimeHour}
                endTimeMinute={this.state.endTimeMinute}
                instructions={this.state.instructions}
                eventLocation={this.state.eventLocation}
                courtList={this.state.courtList}
                eventTitle={this.state.eventTitle}
                />
            )
        } else if (this.state.subsectionShow === "date") {
            return (
                <ProposeMatchForm
                    handleInputChange={this.handleInputChange}
                    newDate={this.state.newDate}
                    instructions={this.state.instructions}
                    handleFormSubmit={this.handleFormSubmit}
                />
            )
        }
    }

    setSubShow = (event) => {
        console.log(event.target.value);
        this.setState({
            newDate: "",
            startTimeHour: "",
            startTimeMinute: "",
            endTimeHour: "",
            endTimeMinute: "",
            searchResult: [],
            clickedResult: [],
            eventLocation: "",
            eventTitle: "",
            userSearch: "",
            userResults: [],
            userId: "",
            modalShow: false,
            subsectionShow: event.target.value
        }, () => {
            if (this.state.subsectionShow === "player") {
                this.setState({
                    instructions: "Type in a player's name and fill out the form below."
                })
            } else if (this.state.subsectionShow === "date") {
                this.setState({
                    instructions: "Pick a date to search for other players' availability."
                })
            }
        })
    }




    render() {
        return (
            <div>
                <Nav />
                <div className="container propose-container">
                    <div className="row">
                        <div className="col-0 col-sm-3"></div>
                        <div className="col-sm-3">
                            <button type="button" className="btn mr-2 propose-button" onClick={this.setSubShow} value="date">Search By Date</button>
                        </div>
                        <div className="col-sm-3">
                            <button type="button" className="btn propose-button" onClick={this.setSubShow} value="player">Propose Match to a Player</button>
                        </div>
                    </div>


                    {this.subsectionRender()}
                    {/* <ProposeMatchForm
                    handleInputChange={this.handleInputChange}
                    newDate={this.state.newDate}
                    instructions={this.state.instructions}
                    handleFormSubmit={this.handleFormSubmit}
                    /> */}
                    {this.state.searchResult.map((event, i) => (
                        <ProposeCard
                            key={i}
                            title={event.title}
                            userid={event.UserId}
                            username={event.User.username}
                            userFirstname={event.User.firstname}
                            userLastname={event.User.lastname}
                            eventLocation={event.location}
                            starttime={moment(event.start).format("hh:mm a")}
                            endtime={moment(event.end).format("hh:mm a")}
                            eventIndex={i}
                            handleEventClick={this.handleEventClick}       
                        />
                    ))}

                    {/* <ProposeUserSearch 
                    userSearch={this.state.userSearch}
                    handleUsernameChange={this.handleUsernameChange}
                    handleInputChange={this.handleInputChange}
                    handleProposeSubmit={this.handleProposeSubmit}
                    userResults={this.state.userResults}
                    newDate={this.state.newDate}
                    startTimeHour={this.state.startTimeHour}
                    startTimeMinute={this.state.startTimeMinute}
                    endTimeHour={this.state.endTimeHour}
                    endTimeMinute={this.state.endTimeMinute}
                    /> */}

                    {this.state.clickedResult.map(event => (
                        <ProposeModal
                        show={this.state.modalShow}
                        onHide={() => this.setModalShow(false)} 
                        title={event.title}
                        userid={event.UserId}
                        eventLocation={this.state.eventLocation}
                        eventLocationTwo={event.location}
                        starttime={moment(event.start).format("hh:mm a")}
                        endtime={moment(event.end).format("hh:mm a")}
                        startIntArr={event.startIntArr}
                        endIntArr={event.endIntArr}
                        startTimeHour={this.state.startTimeHour}
                        startTimeMinute={this.state.startTimeMinute}
                        endTimeHour={this.state.endTimeHour}
                        endTimeMinute={this.state.endTimeMinute}
                        handleInputChange={this.handleInputChange}
                        handleProposeSubmit={this.handleProposeSubmit}
                        courtList={this.state.courtList}
                        />
                    ))}
                </div>
            </div>
        )
    }
}

export default ProposeMatch;
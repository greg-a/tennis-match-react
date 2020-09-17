import React, { Component } from 'react';
import ProposeMatchForm from '../components/ProposeMatchForm';
import ProposeUserSearch from '../components/ProposeUserSearch'
import ProposeCard from '../components/ProposeCard';
import ProposeMuiModal from '../components/MUIModal';
import moment from 'moment';
import { ProposeModal } from "../components/Modal";
import Nav from "../components/Nav";
import { Button, Container, Grid } from '@material-ui/core';


class ProposeMatch extends Component {

    state = {
        eventValue: "",
        newDate: "",
        startTime: "",
        endTime: "",
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
        courtList: ["Fairmount Park","Temple","FDR Park","Chaminoux","Allens Lane Park","Seger Park"]
    };

    getDate = () => {
        const currentDate = moment(new Date).format("YYYY-MM-DD");
        const selectedDate = localStorage.getItem("selectedDate");

        if (selectedDate > currentDate) {
            this.setState({ newDate: selectedDate })
        }
        else {
            this.setState({ newDate: currentDate })
        }
        localStorage.removeItem("selectedDate");
    };

    setModalShow = bVal => {
        this.setState({ 
            modalShow: bVal,
            startTimeHour: "",
            startTimeMinute: "",
            endTimeHour: "",
            endTimeMinute: "",
            startTime: "",
            endTime: "",
            eventValue: ""
        });
    };

    handleEventClick = (arg) => {
        const eventIndex = arg.currentTarget.dataset.index;
        const eventIndexArr = [];

        eventIndexArr.push(this.state.searchResult[eventIndex]);

        console.log("TITLE: " + eventIndexArr[0].title)
        this.setState({ modalShow: true, clickedResult: eventIndexArr, eventLocation: arg.currentTarget.dataset.location, eventTitle: eventIndexArr[0].title });
    };

    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    };

    handleNewChange = (event, newValue) => {
        console.log("THIS IS THE EVENT: " + newValue);
        this.setState({
            userSearch: newValue
        })
    }

    handleUsernameChange = (event, newValue) => {
        
        
        this.setState({
            eventValue: newValue
        }, () => {
            let searchURL = "/api/username?username=" + this.state.eventValue;
            fetch(searchURL)
                .then(res => res.json())
                .then(res => {
                    console.log(res)
                    this.setState({
                        userResults: res
                    }, () => {
                        for (let i = 0; i < (this.state.userResults).length; i++) {
                            let currentUserResults = this.state.userResults;
                            if (this.state.eventValue === currentUserResults[i].username) {
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

        let currentStartDate;
        let currentEndDate;

        if (this.state.startTime) {
            let currentStartHour = this.state.startTime.substring(0,2);
            let currentStartMinute = this.state.startTime.substring(3,5);
            let currentEndHour = this.state.endTime.substring(0,2);
            let currentEndMinute = this.state.endTime.substring(3,5);
            currentStartDate = new Date(parseInt(currentYear), currentMonthAdj, parseInt(currentDay), parseInt(currentStartHour), parseInt(currentStartMinute));
            currentEndDate = new Date(parseInt(currentYear), currentMonthAdj, parseInt(currentDay), parseInt(currentEndHour), parseInt(currentEndMinute));
        } else {
            currentStartDate = new Date(parseInt(currentYear), currentMonthAdj, parseInt(currentDay), parseInt(this.state.startTimeHour), parseInt(this.state.startTimeMinute));
            currentEndDate = new Date(parseInt(currentYear), currentMonthAdj, parseInt(currentDay), parseInt(this.state.endTimeHour), parseInt(this.state.endTimeMinute));

        }

        
        let currentProposeToUserId;
        if (event.currentTarget.dataset.userid) {
            currentProposeToUserId = event.currentTarget.dataset.userid;
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
                    eventTitle: "",
                    startTime: "",
                    endTime: "",
                    eventValue: ""
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
                            eventTitle: "",
                            startTime: "",
                            endTime: "",
                            eventValue: ""
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
                            eventLocation: "",
                            startTime: "",
                            endTime: "",
                            eventValue: ""
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
            
            if (searchArr[i].User.skilllevel===1) {
                searchArr[i].User.skilllevel = "1.0-1.5 - New Player";
            } else if (searchArr[i].User.skilllevel===2) {
                searchArr[i].User.skilllevel= "2.0 - Beginner";
            } else if (searchArr[i].User.skilllevel===3) {
                searchArr[i].User.skilllevel= "2.5 - Beginner +";
            } else if (searchArr[i].User.skilllevel===4) {
                searchArr[i].User.skilllevel= "3.0 - Beginner-Intermediate";
            } else if (searchArr[i].User.skilllevel===5) {
                searchArr[i].User.skilllevel= "3.5 - Intermediate";
            } else if (searchArr[i].User.skilllevel===6) {
                searchArr[i].User.skilllevel= "4.0 - Intermediate-Advanced";
            } else if (searchArr[i].User.skilllevel===7) {
                searchArr[i].User.skilllevel= "4.5 - Advanced";
            }
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
        if (searchArr.length===0) {
            this.setState({ searchResult: searchArr, instructions: "No availibility on this date." });
        } else {
            this.setState({ searchResult: searchArr, instructions: "Pick an availability and propose a time." });
        }
    }

    subsectionRender = () => {
        if (this.state.subsectionShow === "player") {
            return (
                <ProposeUserSearch 
                userSearch={this.state.userSearch}
                handleNewChange={this.handleNewChange}
                handleInputChange={this.handleInputChange}
                handleProposeSubmit={this.handleProposeSubmit}
                handleUsernameChange={this.handleUsernameChange}
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
                startTime={this.state.startTime}
                endTime={this.state.endTime}
                handleNewInput={this.handleNewInput}
                eventValue={this.state.eventValue}
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
        console.log(event.currentTarget.value);
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
            subsectionShow: event.currentTarget.value,
            startTime: "",
            endTime: "",
            eventValue: ""
        }, () => {
            if (this.state.subsectionShow === "player") {
                this.setState({
                    instructions: "Type in a player's name and fill out the form below."
                })
            } else if (this.state.subsectionShow === "date") {
                this.setState({
                    instructions: "Pick a date to search for other players' availability."
                });
                this.getDate();
            }
        })
    }




    render() {
        return (
            <div>
                <Nav />
                <Container fixed>
                    <Grid container spacing={3}>
                        <Grid item xs={12} style={{textAlign: "center"}}>
                            <h2>Propose Match</h2>
                        </Grid>
                        <Grid item xs={12} sm={6} style={{textAlign: "center"}}>
                            <Button variant="contained" color="primary" value="date" onClick={this.setSubShow}>
                                Search By Date
                            </Button>
                        </Grid>
                        <Grid item xs={12} sm={6} style={{textAlign: "center"}}>
                            <Button variant="contained" color="primary" value="player" onClick={this.setSubShow}>
                                Propose Match to Player
                            </Button>
                        </Grid>
                        
                        {/* <button type="button" className="btn mr-2 propose-button" onClick={this.setSubShow} value="date">Search By Date</button>
                        
                        <button type="button" className="btn propose-button" onClick={this.setSubShow} value="player">Propose Match to a Player</button> */}
                        


                    {this.subsectionRender()}
                    
                    <Grid container spacing={3} direction="column" alignItems="center" >
                    {this.state.searchResult.map((event, i) => (
                        <Grid item xs={12}>
                            <ProposeCard
                                key={i}
                                title={event.title}
                                userid={event.UserId}
                                username={event.User.username}
                                userFirstname={event.User.firstname}
                                userLastname={event.User.lastname}
                                userSkill={event.User.skilllevel}
                                eventLocation={event.location}
                                starttime={moment(event.start).format("hh:mm a")}
                                endtime={moment(event.end).format("hh:mm a")}
                                eventIndex={i}
                                handleEventClick={this.handleEventClick}       
                            />
                        </Grid>
                    ))}
                    </Grid>

                    <ProposeMuiModal
                    show={this.state.modalShow}
                    onHide={()=> this.setModalShow(false)}
                    />

                    {/* {this.state.clickedResult.map(event => (
                        <ProposeModal
                        show={this.state.modalShow}
                        onHide={() => this.setModalShow(false)} 
                        title={event.title}
                        userid={event.UserId}
                        username={event.User.username}
                        userFirstname={event.User.firstname}
                        userLastname={event.User.lastname}
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
                    ))} */}
                    </Grid>
                </Container>
            </div>
        )
    }
}

export default ProposeMatch;
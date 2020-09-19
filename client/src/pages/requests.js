import React, { Component } from 'react';
import RequestDisplay from '../components/RequestDisplay';
import RequestCard from '../components/RequestCard';
import moment from 'moment';
import Nav from "../components/Nav";
import { Grid, Container } from '@material-ui/core';

class Requests extends Component {

    state = {
        searchResult: []
    }

    componentDidMount() {
        this.getRequests();
    }

    getRequests = () => {
        fetch("/api/calendar/requests")
            .then(res => res.json())
            .then(res => {
                console.log(res);
                // this.setState({ searchResult: res });
                this.convertSkillLevel(res);
            })
            .catch(err => console.log(err));
    }

    convertSkillLevel = (res) => {
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
        }

        this.setState({searchResult: searchArr});
    }

    handleInputChange = event => {
        const { name, value } = event.currentTarget;
        this.setState({
            [name]: value
        });
    };

    handleConfirm = event => {
        event.preventDefault();
        let nestedID = event.currentTarget.dataset.eventid;
        let nestedStart = event.currentTarget.dataset.start;
        let nestedEnd = event.currentTarget.dataset.end;

        let eventTitle = event.currentTarget.dataset.eventtitle;
        console.log("EVENT TITLE: " + eventTitle);
        let titleArr = (eventTitle).split("-");
        let updateObj = {
            id: event.currentTarget.dataset.eventid,
            title: "Confirmed -" + titleArr[1]
        }
        fetch("/api/calendar/requests", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(updateObj)
        })
            .then(res => {
                console.log(res);
                console.log("NESTED FETCH ID: " + nestedID);
                let confirmedEventInfo = {
                    id: nestedID,
                    start: nestedStart,
                    end: nestedEnd
                }
                fetch("/api/overlap/destroy", {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(confirmedEventInfo)
                })
                .then(response=> {
                    console.log(response);
                    this.getRequests();
                })
                .catch(err=>console.log(err))
                // this.getRequests();
            })
            .catch(err => console.log(err));

    }

    handleDeny = event => {
        event.preventDefault();

        let updateObj = {
            id: event.currentTarget.dataset.eventid
        }

        fetch("/api/event/deny", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(updateObj)
        })
            .then(res => {
                console.log(res);
                this.getRequests();
            })
            .catch(err => console.log(err));

    }


    render() {
        return (
            <div>
                <Nav />
                <Container>
                <Grid container spacing={3} direction="column" alignItems="center" >
                    <Grid item xs={12} >
                        <RequestDisplay />
                    </Grid>
                    {this.state.searchResult.length !== 0 ?
                        this.state.searchResult.map((event, i) => (
                            <Grid item xs={12}>
                            <RequestCard
                                key={i}
                                title={event.title}
                                proposeUserid={event.UserId}
                                proposeUsername={event.User.username}
                                proposeUserFirstname={event.User.firstname}
                                proposeUserLastname={event.User.lastname}
                                proposeUserSkill={event.User.skilllevel}
                                eventLocation={event.location}
                                fullStarttime={event.start}
                                fullEndtime={event.end}
                                starttime={moment(event.start).format("hh:mm a")}
                                endtime={moment(event.end).format("hh:mm a")}
                                date={moment(event.start).format("L")}
                                eventId={event.id}
                                handleInputChange={this.handleInputChange}
                                handleConfirm={this.handleConfirm}
                                handleDeny={this.handleDeny}
                            />
                            </Grid>
                        ))
                        : <Grid item xs={12}><p>You currently have no requests.</p></Grid>
                    }
                </Grid>
                </Container>
            </div>
        )
    }
}

export default Requests;
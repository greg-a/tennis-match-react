import React, { Component } from 'react';
import RequestDisplay from '../components/RequestDisplay';
import RequestCard from '../components/RequestCard';
import moment from 'moment';

class Requests extends Component {

    state = {
        searchResult: []
    }

    componentDidMount() {
        this.getRequests();
    }

    getRequests = () => {
        fetch("/api/calendar/requests")
            .then(res=>res.json())
            .then(res => {
                console.log(res);
                this.setState({searchResult: res});
            })
            .catch(err => console.log(err));
    } 

    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    };

    handleConfirm = event => {
        event.preventDefault();
        let updateID = {
            id: event.target.dataset.eventid
        }
        fetch("/api/calendar/requests", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(updateID)
        })
            .then(res => {
                console.log(res);
                this.getRequests();
            })
            .catch(err => console.log(err));
        
    }


    render() {
        return (
            <div className="container">
                <RequestDisplay />
                {this.state.searchResult.map((event, i) => (
                    <RequestCard 
                    key={i}
                    title={event.title}
                    proposeUserid={event.UserId}
                    starttime={moment(event.start).format("hh:mm a")}
                    endtime={moment(event.end).format("hh:mm a")}
                    date={moment(event.start).format("L")}
                    eventId={event.id}
                    handleInputChange = {this.handleInputChange}
                    handleConfirm={this.handleConfirm}
                    />
                ))
                }
            </div>

        )
    }

}

export default Requests;
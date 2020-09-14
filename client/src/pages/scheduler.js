import React, { Component } from 'react';
import FullCalendar, { formatDate } from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import { SchedulerModal, EventDetailsModal } from "../components/Modal";
import Nav from "../components/Nav";
import moment from "moment";

class Scheduler extends Component {

  state = {
    savedDates: [],
    selectedEvent: {},
    selectedFirstUser: {},
    selectedSecondUser: {},
    dateModalShow: false,
    eventModalShow: false,
    thisDate: "",
    navValue: "tab-three"
  }

  componentDidMount() {
    this.getDates();
  }

  getDates = () => {
    fetch("/api/calendar")
      .then(res => res.json())
      .then((dates) => {
        console.log(dates);
        this.setState({ savedDates: dates })
      })
      .catch(err => console.log(err));
  }

  setModalShow = (mName, bVal) => {
    this.setState({ [mName]: bVal });
  };

  handleDateClick = arg => {
    this.setState({ dateModalShow: true, thisDate: arg.dateStr });

    const selectedDate = moment(arg.dateStr).format("YYYY-MM-DD");
    localStorage.setItem('selectedDate', selectedDate);
  };

  handleEventClick = arg => {
    this.setState({ eventModalShow: true, thisDate: arg.dateStr });
    let selectedEventArr = {};

    this.state.savedDates.forEach(date => {
      if ((date.id == arg.event._def.publicId) && date.secondUser) {
        selectedEventArr = ({ selectedEvent: date, selectedFirstUser: date.User, selectedSecondUser: date.secondUser })
      }
      else if (date.id == arg.event._def.publicId){
        selectedEventArr = ({ selectedEvent: date, selectedFirstUser: date.User, selectedSecondUser: {username: 'none', firstname: "", lastname: "" }})
      }
    });

    this.setState(  selectedEventArr )
  };

  deleteEvent = () => {
    fetch("api/event/delete/" + this.state.selectedEvent.id, {
      method: "DELETE"
    }).then(res => {
      console.log(res)
    }).catch(err => {
      console.log(err)
    })
    this.setState({ eventModalShow: false });
    this.getDates();
    
  }

  render() {
    return (
      <div>
        <Nav
          value={this.state.navValue}
        />
        <div className="container">
          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            dateClick={this.handleDateClick}
            initialView="dayGridMonth"
            events={this.state.savedDates}
            headerToolbar={{
              left: 'prev,next today',
              center: 'title',
              right: 'dayGridMonth,timeGridWeek,timeGridDay'
            }}
            eventClick={this.handleEventClick}
          />
          <SchedulerModal
            show={this.state.dateModalShow}
            onHide={() => this.setModalShow("dateModalShow", false)}
            thisDate={moment(this.state.thisDate).format("MMM DD YYYY")}
          />
          <EventDetailsModal
            show={this.state.eventModalShow}
            onHide={() => this.setModalShow("eventModalShow", false)}
            eventName={this.state.selectedEvent.title}
            playerOneUsername={this.state.selectedFirstUser.username}
            playerOneFirst={this.state.selectedFirstUser.firstname}
            playerOneLast={this.state.selectedFirstUser.lastname}
            playerTwoUsername={this.state.selectedSecondUser.username}
            playerTwoFirst={this.state.selectedSecondUser.firstname}
            playerTwoLast={this.state.selectedSecondUser.lastname}
            startTime={moment(this.state.selectedEvent.start).format("hh:mm a")}
            endTime={moment(this.state.selectedEvent.end).format("hh:mm a")}
            location={this.state.selectedEvent.location}
            date={moment(this.state.selectedEvent.start).format("MM/DD/YYYY")}
            handleDelete={this.deleteEvent}
          />
        </div>
      </div>

    )
  }



}

export default Scheduler;
import React, { Component } from 'react';
import FullCalendar, { formatDate } from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import { SchedulerModal, EventDetailsModal } from "../components/Modal";
import Nav from "../components/Nav";

class Scheduler extends Component {

  state = {
    savedDates: [],
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
  };

  handleEventClick = arg => {
    this.setState({ eventModalShow: true, thisDate: arg.dateStr });
  };

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
            thisDate={this.state.thisDate}
          />
          <EventDetailsModal
            show={this.state.eventModalShow}
            onHide={() => this.setModalShow("eventModalShow", false)}
            eventName="Singles"
          />
        </div>
      </div>

    )
  }



}

export default Scheduler;
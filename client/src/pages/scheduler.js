import React, { Component } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from "@fullcalendar/interaction";

class Scheduler extends Component {

  state = {
    savedDates: []
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

  render() {
    return (
      <FullCalendar
        plugins={[ dayGridPlugin, interactionPlugin ]}
        dateClick={this.handleDateClick}
        initialView="dayGridMonth"
        events={this.state.savedDates}
      />
    )
  }

  handleDateClick = (arg) => {
      //replace this with modal to create event?
    alert(arg.dateStr)
  }

}

export default Scheduler;
import React, { Component } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from "@fullcalendar/interaction";

class Scheduler extends Component {

  render() {
    return (
      <FullCalendar
        plugins={[ dayGridPlugin, interactionPlugin ]}
        dateClick={this.handleDateClick}
        initialView="dayGridMonth"
      />
    )
  }

  handleDateClick = (arg) => {
      //replace this with modal to create event?
    alert(arg.dateStr)
  }

}

export default Scheduler;
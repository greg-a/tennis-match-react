import React, { Component } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from "@fullcalendar/interaction";
import CenteredModal from "../components/Modal";

class Scheduler extends Component {

  state = {
    savedDates: [],
    modalShow: false,
    thisDate: ""
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

  setModalShow = bVal => {
    this.setState({ modalShow: bVal });
  };

  handleDateClick = (arg) => {
    this.setState({ modalShow: true, thisDate: arg.dateStr });
    console.log(this.state.savedDates);
  };

  render() {
    return (
      <div className="container">
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          dateClick={this.handleDateClick}
          initialView="dayGridMonth"
          events={this.state.savedDates}
        />
        <CenteredModal
          show={this.state.modalShow}
          onHide={() => this.setModalShow(false)}
          thisDate={this.state.thisDate}
        />
      </div>
    )
  }



}

export default Scheduler;
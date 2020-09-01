import React from "react";
import "./style.css";

function Nav(props) {
    return (
      <div className="nav-container">
        <div className="nav-logo">
          Logo
        </div>
        <ul className="nav nav-tabs">
          <li className="nav-item">
            <a
              href="/feed"
              onClick={() => props.handlePageChange("Feed")}
              className={props.currentPage === "Home" ? "nav-link active" : "nav-link"}
            >
              Feed
            </a>
          </li>
          <li className="nav-item">
            <a
              href="/newevent"
              onClick={() => props.handlePageChange("Scheduler")}
              className={props.currentPage === "Scheduler" ? "nav-link active" : "nav-link"}
            >
              Scheduler
            </a>
          </li>
          <li className="nav-item">
            <a
              href="/schedule"
              onClick={() => props.handlePageChange("Schedule")}
              className={props.currentPage === "Schedule" ? "nav-link active" : "nav-link"}
            >
              Schedule
            </a>
          </li>
        </ul>
      </div>
      );
}

export default Nav;
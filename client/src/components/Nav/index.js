import React from "react";
import "./style.css";

function Nav(props) {
  return (
    <div className="nav-container">

      <ul class="nav nav-tabs">
        <li class="nav-item">
          <a class="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">Logo</a>
        </li>
        <li class="nav-item">
          <a
            href="/feed"
            onClick={() => props.handlePageChange("Feed")}
            className={props.currentPage === "Home" ? "nav-link active" : "nav-link"}
          >
            Feed
            </a>
        </li>
        <li class="nav-item">
          <a
            href="/newevent"
            onClick={() => props.handlePageChange("Scheduler")}
            className={props.currentPage === "Scheduler" ? "nav-link active" : "nav-link"}
          >
            Scheduler
            </a>
        </li>
        <li>
          <a
            href="/schedule"
            onClick={() => props.handlePageChange("Schedule")}
            className={props.currentPage === "Schedule" ? "nav-link active" : "nav-link"}
          >
            Schedule
            </a>
        </li>
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">Dropdown</a>
          <div class="dropdown-menu">
            <a class="dropdown-item" href="/profile">Profile</a>
            <div class="dropdown-divider"></div>
            <a class="dropdown-item" href="#">Sign Out</a>
          </div>
        </li>
      </ul>


    </div>
  );
}

export default Nav;
import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from "./pages/login";
import Signup from "./pages/signup";
import withAuth from "./withAuth";
import Scheduler from "./pages/scheduler";
import Availability from "./pages/newEvent";
import Profile from "./pages/profile";
import Messenger from "./pages/messenger";
import Feed from "./pages/feed";
import ProposeMatch from "./pages/proposeMatch"
import Requests from "./pages/requests"

function App() {

  return (
    
  <Router>
    {/* <Jumbotron /> */}
    {/* <Route exact path="/" component={withAuth(Messenger)} /> */}
    <Route path="/" component={Feed} />
    <Route path="/login" component={Login} />
    <Route path="/signup" component={withAuth(Signup)} /> 
    <Route path="/scheduler" component={withAuth(Scheduler)} />
    <Route path="/messenger" component={withAuth(Messenger)} />
    <Route path="/feed" component={withAuth(Feed)} />
    <Route path="/availability" component={withAuth(Availability)} />
    <Route path ="/profile" component={withAuth(Profile)} />
    <Route path="/proposematch" component={withAuth(ProposeMatch)} />
    <Route path="/requests" component={withAuth(Requests)} />
  </Router>
  )
}

export default App;

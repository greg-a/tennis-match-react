import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from "./pages/login";
import Signup from "./pages/signup";
import withAuth from "./withAuth";
import Scheduler from "./pages/scheduler";
import NewEvent from "./pages/newEvent";
import Profile from "./pages/profile";
import Messenger from "./pages/messenger";
import Feed from "./pages/feed";

function App() {

  return ( 
  <Router>
    {/* <Jumbotron /> */}
    <Route exact path="/" component={withAuth(Scheduler)} />
    <Route exact path="/login" component={Login} />
    <Route exact path="/signup" component={Signup} /> 
    <Route exact path="/scheduler" component={Scheduler} />
    <Route exact path="/messenger" component={Messenger} />
    <Route exact path="/feed" component={Feed} />
    <Route exact path="/newevent" component={withAuth(NewEvent)} />
    <Route exact path ="/profile" component={withAuth(Profile)} />
  </Router>
  )
}

export default App;

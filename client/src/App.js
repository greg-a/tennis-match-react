import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Jumbotron from "./components/Jumbotron";
import Login from "./pages/login";
import Signup from "./pages/signup";
import withAuth from "./withAuth";
import Scheduler from "./pages/scheduler";
import NewEvent from "./pages/newEvent";




function App() {

  return ( 
  <Router>
    {/* <Jumbotron /> */}
    <Route exact path="/" component={Login} />
    <Route exact path="/signup" component={Signup} />
    <Route exact path="/test" component={withAuth(Jumbotron)} />    
    <Route exact path="/scheduler" component={Scheduler} />
    <Route exact path="/newevent" component={NewEvent} />
  </Router>
  )
}

export default App;

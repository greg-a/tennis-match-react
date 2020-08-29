import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from "./pages/login";
import Signup from "./pages/signup";
import withAuth from "./withAuth";
import Scheduler from "./pages/scheduler"




function App() {

  return ( 
  <Router>
    {/* <Jumbotron /> */}
    <Route exact path="/" component={Login} />
    <Route exact path="/signup" component={Signup} />    
    <Route exact path="/scheduler" component={withAuth(Scheduler)} />
  </Router>
  )
}

export default App;

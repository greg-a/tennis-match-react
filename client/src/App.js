import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Jumbotron from "./components/Jumbotron";
import Login from "./pages/Login";
import withAuth from "./withAuth";
import Scheduler from "./pages/Scheduler"




function App() {

  return ( 
  <Router>
    <Jumbotron />
    <Route exact path="/" component={Login} />
    <Route exact path="/test" component={withAuth(Jumbotron)} />    
    <Route exact path="/scheduler" component={Scheduler} />
  </Router>
  )
}

export default App;

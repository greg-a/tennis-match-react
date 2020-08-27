import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Jumbotron from "./components/Jumbotron";
import Scheduler from "./pages/Scheduler"



function App() {

  return ( 
  <Router>
    <Jumbotron />
    <Route exact path="/test" component={Scheduler} />
  </Router>
  )
}

export default App;

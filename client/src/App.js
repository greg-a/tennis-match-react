import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import './App.css';
import Jumbotron from "./components/Jumbotron";



function App() {

  return ( 
  <Router>
    <Route exact path="/test" component={Jumbotron} />
  </Router>
  )
}

export default App;

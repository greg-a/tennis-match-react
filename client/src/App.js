import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import './App.css';
import Jumbotron from "./components/Jumbotron";
import Login from "./pages/Login";
import withAuth from "./withAuth";



function App() {

  return ( 
  <Router>
    <Route exact path="/" component={Login} />
    <Route exact path="/test" component={withAuth(Jumbotron)} />
  </Router>
  )
}

export default App;

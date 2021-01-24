import React from 'react';
import {HashRouter as Router, Route, Switch} from 'react-router-dom';
import './App.css';
import Login from "./page/login";
import Welcome from "./page/welcome";
import Register from "./page/register";
import Maintenance from "./page/maintenance";

function App() {
  return (
      <Router>
        <Switch>
            <Route path="/dormitory" component={Welcome}/>
            <Route path="/maintenance" component={Maintenance}/>
            <Route path="/register" component={Register}/>
            <Route path="/" component={Login}/>
        </Switch>
      </Router>
  );
}

export default App;

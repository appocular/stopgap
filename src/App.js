import React, { Component } from 'react';
import './App.css';
import SnapshotLoader from './components/SnapshotLoader';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/:snapshot_id" component={SnapshotLoader} />
          <Route path="/" exact component={Message} />
        </Switch>
      </Router>
    );
  }
}

function Message() {
  return "You shouldn't be here...";
}

export default App;

import React, { Component } from 'react';
import './App.css';
import { createOvermind } from 'overmind'
import { Provider } from 'overmind-react'
import SnapshotLoader from './components/SnapshotLoader';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { config } from './overmind'

const overmind = createOvermind(config)

class App extends Component {
  render() {
    return (
      <Provider value={overmind}>
        <Router>
          <Switch>
            <Route path="/:snapshot_id" component={SnapshotLoader} />
            <Route path="/" exact component={Message} />
          </Switch>
        </Router>
      </Provider>
    );
  }
}

function Message() {
  return "You shouldn't be here...";
}

export default App;

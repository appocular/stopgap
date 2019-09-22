import React, { Component } from 'react';
import './reset.css';
import './App.css';
import Snapshot from './components/Snapshot';
import Checkpoint from './components/Checkpoint';
import Spinner from './components/Spinner';

import { connect } from './overmind'

class App extends Component {
  render() {
    const state = this.props.overmind.state
    switch (state.currentPage) {
    case 'snapshot':
      return state.snapshotLoaded ? <Snapshot snapshot={state.snapshot}/> : <Spinner/>

    case 'checkpoint':
      return state.currentCheckpoint ? <Checkpoint checkpoint={state.getCurrentCheckpoint}/> : <Message/>

    case '':
      return <Spinner/>

    case 'error':
      return <p>{state.errorMessage}</p>

    default:
      return <Message/>
    }
  }
}

function Message() {
  return "You shouldn't be here...";
}

export default connect(App);

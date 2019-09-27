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
      return state.snapshot ? <Snapshot/> : <Spinner/>

    case 'checkpoint':
      return state.getCurrentCheckpoint ? <Checkpoint/> : <Spinner/>

    case '':
      return <Spinner/>

    case 'error':
      return <p>{state.errorMessage}</p>

    default:
      return <p>You shouldn't be here...</p>
    }
  }
}

export default connect(App);

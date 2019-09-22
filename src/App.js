import React, { Component } from 'react';
import './App.css';
import Snapshot from './components/Snapshot';
import Spinner from './components/Spinner';

import { connect } from './overmind'

class App extends Component {
  render() {
    const state = this.props.overmind.state
    switch (state.currentPage) {
    case 'snapshot':
      return state.snapshotLoaded ? <Snapshot snapshot={state.snapshot}/> : <Spinner/>

    case '':
      return <Spinner/>

    default:
      return <Message/>
    }
  }
}

function Message() {
  return "You shouldn't be here...";
}

export default connect(App);

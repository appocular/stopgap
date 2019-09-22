import React, { Component } from 'react';
import './App.css';
import SnapshotLoader from './components/SnapshotLoader';

import { connect } from './overmind'

class App extends Component {
  render() {
    const state = this.props.overmind.state
    return (
      <>
        { state.currentPage === 'message' ? <Message/> : null }
        { state.currentPage === 'snapshot' ? <SnapshotLoader/> : null }
      </>
    );
  }
}

function Message() {
  return "You shouldn't be here...";
}

export default connect(App);

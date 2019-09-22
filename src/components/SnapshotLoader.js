import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import Snapshot from './Snapshot';

import { connect } from '../overmind'

class SnapshotLoader extends Component {
  render() {
    const { snapshot, snapshotLoaded } = this.props.overmind.state

    if (snapshotLoaded && !snapshot) {
      return <Typography variant="headline" color="error">Error loading.</Typography>
    }
    if (!snapshotLoaded) {
      return <Typography variant="headline">Loading...</Typography>
    }
    return (
      <div>
        <Snapshot snapshot={snapshot}/>
      </div>
    );
  }
}

export default connect(SnapshotLoader);

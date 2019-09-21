import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import Snapshot from './Snapshot';

import { connect } from '../overmind'

class SnapshotLoader extends Component {
  constructor(props) {
    super(props)
  }

  async componentDidMount() {
    this.props.overmind.actions.loadSnapshot(this.props.match.params.snapshot_id)
  };

  render() {
    const { overmind } = this.props
    if (overmind.state.snapshotLoaded && !overmind.state.snapshot) {
      return <Typography variant="headline" color="error">Error loading.</Typography>
    }
    if (!overmind.state.snapshotLoaded) {
      return <Typography variant="headline">Loading...</Typography>
    }
    return (
      <div>
        <Snapshot snapshot={overmind.state.snapshot}/>
      </div>
    );
  }
}

export default connect(SnapshotLoader);

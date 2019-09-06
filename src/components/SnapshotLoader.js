import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import Snapshot from './Snapshot';

import { Appocular } from '../Appocular'

class SnapshotLoader extends Component {
  constructor(props) {
    super(props)
    this.state = {
      snapshot: null,
      loaded: false,
      error: false
    }
  }

  async componentDidMount() {
    const snapshot = await Appocular.getSnapshotById(this.props.match.params.snapshot_id)
    if (snapshot) {
      this.setState({snapshot: snapshot, loaded: true})
    }
    else {
      this.setState({error: true })
    }
    console.log(snapshot)
  };

  render() {
    if (this.state.error) {
      return <Typography variant="headline" color="error">Error loading.</Typography>
    }
    if (!this.state.loaded) {
      return <Typography variant="headline">Loading...</Typography>
    }
    return (
      <div>
        <Snapshot snapshot={this.state.snapshot}/>
      </div>
    );
  }
}

export default SnapshotLoader;

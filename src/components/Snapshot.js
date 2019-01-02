import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Checkpoint from './Checkpoint'

class Snapshot extends Component {
  render() {

    const checkpoints = this.props.snapshot.checkpoints.map((checkpoint, index) => <Checkpoint
                                                                                     key={index.toString()}
                                                                                     checkpoint={checkpoint}
                                                                                   />)

    return (
      <Grid >
        <Typography variant="headline">
          {this.props.snapshot.id}
        </Typography>
        {checkpoints}
      </Grid>
    );
  }
}

export default Snapshot;

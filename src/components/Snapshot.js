import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Checkpoint from './Checkpoint'

class Snapshot extends Component {
  render() {
    return (
      <Grid>
        <Typography variant="headline">
          {this.props.snapshot.id}
        </Typography>
        <Grid container>
          {this.props.snapshot.checkpoints.map((checkpoint, index) => (
            <Grid item key={index.toString()}>
              <Checkpoint
                checkpoint={checkpoint}
              />
            </Grid>
          ))}
        </Grid>
      </Grid>
    );
  }
}

export default Snapshot;

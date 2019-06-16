import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Checkpoint from './Checkpoint'
import Chip from '@material-ui/core/Chip';
import UnknownIcon from '@material-ui/icons/Help';
import PassedIcon from '@material-ui/icons/CheckCircle';
import FailedIcon from '@material-ui/icons/Block';

class Snapshot extends Component {
  render() {
    let status_icon;
    switch (this.props.snapshot.status) {
    case 'passed':
      status_icon = <PassedIcon/>;
      break;

    case 'failed':
      status_icon = <FailedIcon/>;
      break;

    default:
      status_icon = <UnknownIcon/>
    }

    return (
      <Grid>
        <Typography variant="headline">
          {this.props.snapshot.id}
          <Chip icon={status_icon} label={this.props.snapshot.status}/>
          <Chip label={this.props.snapshot.run_status}/>
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

import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';

class Checkpoint extends Component {
  render() {
    return (
        <Typography variant="headline">
          {this.props.name}
        </Typography>
    );
  }
}

export default Checkpoint;

import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Checkpoint from './Checkpoint'

class Snapshot extends Component {
  render() {

    const images = this.props.snapshot.images.map((image, index) => <Checkpoint key={index.toString()} name={image.name}/>)

    return (
      <Grid >
        <Typography variant="headline">
          {this.props.snapshot.sha}
        </Typography>
        {images}
      </Grid>
    );
  }
}

export default Snapshot;

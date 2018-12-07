import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Image from './Image'

class Snapshot extends Component {
  render() {

    const images = this.props.snapshot.images.map((image, index) => <Image key={index.toString()} name={image.name}/>)

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

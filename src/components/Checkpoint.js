import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';

class Checkpoint extends Component {
  render() {
    const img_src = 'http://assessor.appocular.docker/checkpoint/' + this.props.checkpoint.id + '/image'

    return (
      <Typography variant="headline">
        {this.props.checkpoint.name}
        <img src={img_src} width="300" />
      </Typography>
    );
  }
}

export default Checkpoint;

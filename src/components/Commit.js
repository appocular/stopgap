import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';

class Commit extends Component {
  render() {
    return (
      <Typography variant="h4">
        {this.props.commit.sha}
      </Typography>
    );
  }
}

export default Commit;

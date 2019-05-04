import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import Snapshot from './Snapshot';

class SnapshotLoader extends Component {
  constructor(props) {
    super(props)
    this.state = {
      snapshot: {
        'sha': 'none',
        'images': []
      },
      loaded: false,
      error: false
    }
  }

  // https://www.robinwieruch.de/react-fetching-data/
  async componentDidMount() {
    try {
      const response = await fetch( process.env.REACT_APP_APPOCULAR_URL + '/snapshot/' + this.props.match.params.snapshot_id, {
        crossDomain:true,
      })
      if (!response.ok) {
        throw new Error("Network error")
      }
      const data = await response.json();
      this.setState({snapshot: data, loaded: true })
    } catch (error) {
      this.setState({error: true })
    }
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

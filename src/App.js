import React, { Component } from 'react';
import './App.css';
import Commit from './components/Commit';
import Typography from '@material-ui/core/Typography';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      commit: {
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
      const response = await fetch('http://assessor.appocular.docker/commit/aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa', {
        crossDomain:true,
      })
      if (!response.ok) {
        throw new Error("Network error")
      }
      response.json().then(data => this.setState({commit: data, loaded: true }))
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
      <Commit commit={this.state.commit}/>
    );
  }
}

export default App;

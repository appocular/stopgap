import React, { Component } from 'react';
import './App.css';
import Commit from './components/Commit';

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
  componentDidMount() {
    fetch('http://assessor.appocular.docker/commit/aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa', {
      crossDomain:true,
    })
      .then(response => response.json())
      .then(data => this.setState({commit: data, loaded: true }))
    // @todo better error handling.
      .catch(error => this.setState({error: true }))
  }


  render() {
    if (this.state.error) {
      return <p>Error loading.</p>
    }
    if (!this.state.loaded) {
      return <p>Loading...</p>
    }
    return (
        <Commit commit={this.state.commit}/>
    );
  }
}

export default App;

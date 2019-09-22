import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import { createOvermind } from 'overmind'
import { Provider } from 'overmind-react'
import { config } from './overmind'

const overmind = createOvermind(config)

ReactDOM.render((
  <Provider value={overmind}>
    <App />
  </Provider>
), document.getElementById('root'));

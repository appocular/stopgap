import React from 'react';
import App from './App';
import { cleanup } from '@testing-library/react';
import { renderWithOvermind } from './utils/testing'
import { config } from './overmind'

afterEach(cleanup)

describe('App', () => {

  it('shows spinner per default', async () => {
    const { queryByText } = renderWithOvermind(<App />)

    expect(queryByText("Loading...")).toBeInTheDocument()
  });

  it('renders a go away message at the root', async () => {
    config.state.currentPage = 'message'
    const { queryByText } = renderWithOvermind(<App />)

    expect(queryByText("You shouldn't be here...")).toBeInTheDocument()
  });

  it('renders snapshot', () => {
    config.state.currentPage = 'snapshot'
    const { queryByText } = renderWithOvermind(<App />, (actions) => {
      actions.setSnapshot({
        id: 'snapshot id',
        checkpoints: []
      })
    })

    expect(queryByText("snapshot id")).toBeInTheDocument()
  })

  it('renders checkpoint', () => {
    config.state.currentPage = 'checkpoint'
    const { queryByText } = renderWithOvermind(<App />, (actions) => {
      actions.setSnapshot({
        id: 'snapshot id',
        checkpoints: [{
          id: 1,
          name: 'checkpoint id'
        }]
      })
      actions.setCurrentCheckpoint(1)
    })

    expect(queryByText("snapshot id / checkpoint id")).toBeInTheDocument()
  })

  it('renders error message', async () => {
    config.state.currentPage = 'error'
    config.state.errorMessage = 'this is the error message'
    const { queryByText } = renderWithOvermind(<App />)

    expect(queryByText("this is the error message")).toBeInTheDocument()
  });

});

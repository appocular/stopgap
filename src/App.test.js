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

});

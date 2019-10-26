import React from 'react';
import CheckpointMeta from './CheckpointMeta'
import { cleanup } from '@testing-library/react';
import { renderWithOvermind } from '../utils/testing'

afterEach(cleanup)

describe('CheckpointMeta', () => {
  it('shows metadata', () => {
    const { queryByText } = renderWithOvermind(<CheckpointMeta meta={{"browser_size": "800x600", "something": "else"}}/>)

    expect(queryByText('browser_size: 800x600, something: else')).toBeInTheDocument()
  })
})

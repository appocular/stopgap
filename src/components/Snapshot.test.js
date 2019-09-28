import React from 'react';
import Snapshot from './Snapshot';
import Checkpoint from './Checkpoint';
import { fireEvent, cleanup, waitForElement } from '@testing-library/react';
import { renderWithOvermind } from '../utils/testing'
import { config } from '../overmind'

afterEach(cleanup)

describe('Snapshot', () => {

  it('shows the snapshot id', () => {
    const { queryByText } = renderWithOvermind(<Snapshot/>, (actions) => {
      actions.setSnapshot({
        id: 'snapshot id',
        checkpoints: []
      })
    })

    expect(queryByText('snapshot id')).toBeInTheDocument()
  });

  it('lists checkpoints', () => {
    const { queryByText } = renderWithOvermind(<Snapshot/>, (actions) => {
      actions.setSnapshot({
        id: 'snapshot id',
        checkpoints: [
          {id: 1, self: 1, name: 'image 1', slug: 'image-1'},
          {id: 2, self: 2, name: 'image 2', slug: 'image-2'}
        ]
      })
    })

    // Test that we can see both checkpoints.
    expect(queryByText('image 1')).toBeInTheDocument()
    expect(queryByText('image 2')).toBeInTheDocument()
  });

  it('shows status and run status', () => {
    const { queryByText, debug } = renderWithOvermind(<Snapshot/>, (actions) => {
      actions.setSnapshot({
        id: 'snapshot id',
        status: 'passed',
        run_status: 'done',
        checkpoints: []
      })
    })

    expect(queryByText('Status: passed, done')).toBeInTheDocument()
  });

});

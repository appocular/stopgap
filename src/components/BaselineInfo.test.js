import React from 'react';
import BaselineInfo from './BaselineInfo';
import { cleanup } from '@testing-library/react';
import { renderWithOvermind } from '../utils/testing'

afterEach(cleanup)

describe('BaselineInfo', () => {
  it('shows id and status', () => {
    const { queryByText } = renderWithOvermind(<BaselineInfo baseline={{id: 'test', status: 'approved', run_status: 'done'}}/>)

    expect(queryByText('test')).toBeInTheDocument()
    expect(queryByText('Baseline: approved, done')).toBeInTheDocument()
  })
})

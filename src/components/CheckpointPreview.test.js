import React from 'react';
import CheckpointPreview from './CheckpointPreview';
import { cleanup } from '@testing-library/react';
import { renderWithOvermind } from '../utils/testing'

afterEach(cleanup)

describe('CheckpointPreview', () => {

  it('shows the checkpoint', () => {
    const data = {
      id: 1,
      name: 'Checkpoint name',
    }
    const { queryByText } = renderWithOvermind(<CheckpointPreview checkpoint={data}/>)

    expect(queryByText('Checkpoint name')).toBeInTheDocument()
  });

  it('shows the checkpoint image and diff in preview', () => {
    // If there's no diff, only the image should be shown.
    let data = {
      id: 1,
      name: 'Checkpoint name',
      image_url: 'the/image_url'
    }
    var { container, queryByText } = renderWithOvermind(<CheckpointPreview checkpoint={data}/>)

    let imgs = container.getElementsByTagName('img')
    expect(imgs).toHaveLength(1)
    expect(imgs[0].getAttribute('src')).toEqual('the/image_url')

    cleanup()

    // If there's a diff, it should be shown with the overlay class.
    data = {
      id: 1,
      name: 'Checkpoint name',
      image_url: 'the/image_url',
      diff_url: 'the/diff_url'
    }
    var { container, queryByText } = renderWithOvermind(<CheckpointPreview checkpoint={data}/>)

    imgs = container.getElementsByTagName('img')
    expect(imgs).toHaveLength(2)
    expect(imgs[0].getAttribute('src')).toEqual('the/image_url')
    expect(imgs[1].getAttribute('src')).toEqual('the/diff_url')
    expect(imgs[1]).toHaveClass('overlay')
  })

});

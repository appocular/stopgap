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
    const { queryByText } = renderWithOvermind(<CheckpointPreview checkpoint={data} running={false}/>)

    expect(queryByText('Checkpoint name')).toBeInTheDocument()
  })

  it('shows the checkpoint image and diff in preview', () => {
    // If there's no diff, only the image should be shown.
    let data = {
      id: 1,
      name: 'Checkpoint name',
      image_url: 'the/image_url'
    }
    var { container, queryByText } = renderWithOvermind(<CheckpointPreview checkpoint={data} running={false}/>)

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
    var { container, queryByText } = renderWithOvermind(<CheckpointPreview checkpoint={data} running={false}/>)

    imgs = container.getElementsByTagName('img')
    expect(imgs).toHaveLength(2)
    expect(imgs[0].getAttribute('src')).toEqual('the/image_url')
    expect(imgs[1].getAttribute('src')).toEqual('the/diff_url')
    expect(imgs[1]).toHaveClass('overlay')
  })

  it('marks new images when done', () => {
    const data = {
      id: 1,
      name: 'Checkpoint name',
      image_url: 'something',
      diff_status: 'different'
    }
    var { container, queryByText } = renderWithOvermind(<CheckpointPreview checkpoint={data} running={false}/>)

    expect(queryByText('Checkpoint name (new)')).toBeInTheDocument()

    let imgs = container.getElementsByTagName('img')
    expect(imgs).toHaveLength(1)
    // Check that the image is shown.
    expect(imgs[0].getAttribute('src')).toEqual('something')

    cleanup()

    var { queryByText }  = renderWithOvermind(<CheckpointPreview checkpoint={data} running={true}/>)

    expect(queryByText('Checkpoint name (new)')).not.toBeInTheDocument()
  })

  it('marks deleted images', () => {
    const data = {
      id: 1,
      name: 'Checkpoint name',
      baseline_url: 'something',
      diff_status: 'different'
    }
    var { container, queryByText } = renderWithOvermind(<CheckpointPreview checkpoint={data} running={false}/>)

    expect(queryByText('Checkpoint name (deleted)')).toBeInTheDocument()

    let imgs = container.getElementsByTagName('img')
    expect(imgs).toHaveLength(1)
    // Check that the baseline image is shown.
    expect(imgs[0].getAttribute('src')).toEqual('something')

    cleanup()

    var { queryByText }  = renderWithOvermind(<CheckpointPreview checkpoint={data} running={true}/>)

    expect(queryByText('Checkpoint name (deleted)')).not.toBeInTheDocument()
  })

  it("do not mark new/deleted images when there's no diff status", () => {
    let data = {
      id: 1,
      name: 'Checkpoint name',
      image_url: 'something',
    }
    var { queryByText } = renderWithOvermind(<CheckpointPreview checkpoint={data} running={false}/>)

    expect(queryByText('Checkpoint name')).toBeInTheDocument()

    data = {
      id: 1,
      name: 'Checkpoint name',
      baseline_url: 'something',
      diff_status: 'different'
    }
    var { container, queryByText } = renderWithOvermind(<CheckpointPreview checkpoint={data} running={false}/>)

    expect(queryByText('Checkpoint name (deleted)')).toBeInTheDocument()
  })

  it('shows metadata', () => {
    const data = {
      id: 1,
      name: 'Checkpoint name',
      meta: {"browser_size": "800x600", "something": "else"}
    }
    const { queryByText } = renderWithOvermind(<CheckpointPreview checkpoint={data} running={false}/>)

    expect(queryByText('browser_size: 800x600, something: else')).toBeInTheDocument()
  })
})

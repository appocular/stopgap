import React from 'react';
import Checkpoint from './Checkpoint';
import { cleanup } from '@testing-library/react';
import { renderWithOvermind } from '../utils/testing'

afterEach(cleanup)

describe('Checkpoint', () => {

  it('shows the checkpoint/snapshot name', () => {
    const { queryByText, overmind } = renderWithOvermind(<Checkpoint/>, (actions) => {
      actions.setSnapshot({
        id: 'Snapshot id',
        checkpoints: [
          {
            id: 1,
            slug: 'uno',
            name: 'Checkpoint name',
          }
        ]})
      actions.setCurrentCheckpoint('uno')
    })

    expect(queryByText('Snapshot id')).toBeInTheDocument()
    expect(queryByText('/ Checkpoint name')).toBeInTheDocument()
  });

  it('links to the snapshot', () => {
    const { queryByText, overmind } = renderWithOvermind(<Checkpoint/>, (actions) => {
      actions.setSnapshot({
        id: 'snapshot-id',
        checkpoints: [
          {
            id: 1,
            slug: 'uno',
            name: 'Checkpoint name',
            meta: {"browser_size": "800x600", "something": "else"}
          }
        ]})
      actions.setCurrentCheckpoint('uno')
    })

    expect(queryByText('snapshot-id').getAttribute('href')).toEqual('/snapshot-id')
  });

  it('shows the checkpoint image', () => {
    const { container, queryByText } = renderWithOvermind(<Checkpoint/>, (actions) => {
      actions.setSnapshot({
        id: 'Snapshot id',
        checkpoints: [
          {
            id: 1,
            slug: 'uno',
            name: 'Checkpoint name',
            image_url: 'the/image_url'
          }
        ]})
      actions.setCurrentCheckpoint('uno')
    })

    let imgs = container.getElementsByTagName('img')
    expect(imgs).toHaveLength(1)
    expect(imgs[0].getAttribute('src')).toEqual('the/image_url')
  })


  it('shows checkpoint image and baseline', () => {
    const { container, queryByText } = renderWithOvermind(<Checkpoint/>, (actions) => {
      actions.setSnapshot({
        id: 'Snapshot id',
        checkpoints: [
          {
            id: 1,
            slug: 'uno',
            name: 'Checkpoint name',
            image_url: 'the/image_url',
            baseline_url: 'the/baseline_url'
          }
        ]})
      actions.setCurrentCheckpoint('uno')
    })

    let imgs = container.getElementsByTagName('img')
    expect(imgs).toHaveLength(2)
    expect(imgs[0].getAttribute('src')).toEqual('the/image_url')
    expect(imgs[1].getAttribute('src')).toEqual('the/baseline_url')
  })

  it('shows checkpoint image, baseline and diff', () => {
    let data = {
      id: 1,
      name: 'Checkpoint name',
      image_url: 'the/image_url',
      baseline_url: 'the/baseline_url',
      diff_url: 'the/diff_url'
    }
    const { container, queryByText } = renderWithOvermind(<Checkpoint/>, (actions) => {
      actions.setSnapshot({
        id: 'Snapshot id',
        checkpoints: [
          {
            id: 1,
            slug: 'uno',
            name: 'Checkpoint name',
            image_url: 'the/image_url',
            baseline_url: 'the/baseline_url',
            diff_url: 'the/diff_url'
          }
        ]})
      actions.setCurrentCheckpoint('uno')
    })

    let imgs = container.getElementsByTagName('img')
    expect(imgs).toHaveLength(3)
    expect(imgs[0].getAttribute('src')).toEqual('the/image_url')
    expect(imgs[1].getAttribute('src')).toEqual('the/baseline_url')
    expect(imgs[2].getAttribute('src')).toEqual('the/diff_url')
  })

  it('shows the checkpoint status', () => {
    const { container, queryByText } = renderWithOvermind(<Checkpoint/>, (actions) => {
      actions.setSnapshot({
        id: 'Snapshot id',
        checkpoints: [
          {
            name: "Checkpoint name",
            id: 1,
            slug: 'uno',
            image_url: "the/image_url",
            baseline_url: "the/baseline_url",
            diff_url: "the/diff_url",
            status: "passed"
          }
        ]})
      actions.setCurrentCheckpoint('uno')
    })

    expect(queryByText('Status: passed')).toBeInTheDocument()
  })

  it('shows the checkpoint new/deleted status', () => {
    var { container, queryByText } = renderWithOvermind(<Checkpoint/>, (actions) => {
      actions.setSnapshot({
        id: 'Snapshot id',
        checkpoints: [
          {
            name: "Checkpoint name",
            id: 1,
            slug: 'uno',
            image_url: "the/image_url",
            baseline_url: "",
            diff_url: "the/diff_url",
            status: "passed",
            diff_status: 'different'
          }
        ]})
      actions.setCurrentCheckpoint('uno')
    })

    expect(queryByText('Status: passed, new')).toBeInTheDocument()

    var { container, queryByText } = renderWithOvermind(<Checkpoint/>, (actions) => {
      actions.setSnapshot({
        id: 'Snapshot id',
        checkpoints: [
          {
            name: "Checkpoint name",
            id: 1,
            slug: 'duo',
            image_url: "",
            baseline_url: "the/baseline_url",
            diff_url: "the/diff_url",
            status: "passed",
            diff_status: 'different'
          }

        ]})
      actions.setCurrentCheckpoint('duo')
    })

    expect(queryByText('Status: passed, deleted')).toBeInTheDocument()
  })

  it('shows the checkpoint meta data', () => {
    const { queryByText, overmind } = renderWithOvermind(<Checkpoint/>, (actions) => {
      actions.setSnapshot({
        id: 'Snapshot id',
        checkpoints: [
          {
            id: 1,
            slug: 'uno',
            name: 'Checkpoint name',
            meta: {"browser_size": "800x600", "something": "else"}
          }
        ]})
      actions.setCurrentCheckpoint('uno')
    })

    expect(queryByText('browser_size: 800x600, something: else')).toBeInTheDocument()
  });

});

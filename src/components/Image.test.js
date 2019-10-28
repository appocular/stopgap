import React from 'react';
import Image from './Image';
import { cleanup } from '@testing-library/react';
import { renderWithOvermind } from '../utils/testing'

afterEach(cleanup)

describe('Image', () => {
  it('shows the title and image', () => {
    const { queryByText, container } = renderWithOvermind(<Image title="Test" className="test" src="/banana"/>)

    expect(queryByText('Test:')).toBeInTheDocument()
    let imgs = container.getElementsByTagName('img')
    expect(imgs).toHaveLength(1)
    expect(imgs[0].getAttribute('src')).toEqual('/banana')
  })
})

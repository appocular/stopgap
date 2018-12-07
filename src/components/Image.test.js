import React from 'react';
import { shallow } from 'enzyme';
import Typography from '@material-ui/core/Typography';
import Image from './Image';

describe('Image', () => {

  it('renders without crashing', () => {
    shallow(<Image name="test"/>)
  });

  it('shows the image name', () => {
    const commit = shallow(<Image name="Image name"/>)

    expect(commit.find(Typography).props().children).toEqual('Image name')
  });

});

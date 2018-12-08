import React from 'react';
import { shallow } from 'enzyme';
import Typography from '@material-ui/core/Typography';
import Checkpoint from './Checkpoint';

describe('Checkpoint', () => {

  it('renders without crashing', () => {
    shallow(<Checkpoint name="test"/>)
  });

  it('shows the checkpoint name', () => {
    const commit = shallow(<Checkpoint name="Checkpoint name"/>)

    expect(commit.find(Typography).props().children).toEqual('Checkpoint name')
  });

});

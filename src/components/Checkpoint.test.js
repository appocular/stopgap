import React from 'react';
import { mount } from 'enzyme';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardHeader from '@material-ui/core/CardHeader';
import Checkpoint from './Checkpoint';

describe('Checkpoint', () => {

  it('renders without crashing', () => {
    mount(<Checkpoint checkpoint={{name: "test", id: 1}} />)
  });

  it('shows the checkpoint name', () => {
    const checkpoints = mount(<Checkpoint checkpoint={{name: "Checkpoint name", id: 1}} />)

    expect(checkpoints.find(Card).find(CardActionArea).find(CardHeader).props().title).toEqual('Checkpoint name')
  });

});

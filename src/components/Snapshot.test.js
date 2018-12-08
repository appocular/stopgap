import React from 'react';
import { shallow } from 'enzyme';
import Typography from '@material-ui/core/Typography';
import Snapshot from './Snapshot';
import Checkpoint from './Checkpoint';

describe('Snapshot', () => {

  it('renders without crashing', () => {
    const data = {
      id: "snapshot id",
      checkpoints: []
    }
    shallow(<Snapshot snapshot={data}/>)
  });

  it('shows the snapshot id', () => {
    const data = {
      id: "snapshot id",
      checkpoints: []
    }
    const snapshot = shallow(<Snapshot snapshot={data}/>)

    expect(snapshot.find(Typography).props().children).toEqual('snapshot id')
    expect(snapshot.find(Checkpoint).length).toEqual(0)
  });

  it('lists checkpoints', () => {
    const data = {
      id: "snapshot id",
      checkpoints: [
        {name: "image 1"},
        {name: "image 2"},
      ]
    }
    var snapshot = shallow(<Snapshot snapshot={data}/>)

    expect(snapshot.find(Checkpoint).length).toEqual(2)

    // Check the empty case.
    data.checkpoints = []
    snapshot = shallow(<Snapshot snapshot={data}/>)
    expect(snapshot.find(Checkpoint).length).toEqual(0)
  });
});

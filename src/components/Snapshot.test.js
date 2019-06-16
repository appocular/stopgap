import React from 'react';
import { shallow } from 'enzyme';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
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

    expect(snapshot.find(Typography).props().children[0]).toEqual('snapshot id')
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

  it('shows status', () => {
    const data = {
      id: "snapshot id",
      status: 'passed',
      checkpoints: []
    }
    const snapshot = shallow(<Snapshot snapshot={data}/>)

    expect(snapshot.find(Typography).find(Chip).first().prop('label')).toEqual('passed')
  });

  it('shows run status', () => {
    const data = {
      id: "snapshot id",
      run_status: 'running',
      checkpoints: []
    }
    const snapshot = shallow(<Snapshot snapshot={data}/>)

    expect(snapshot.find(Typography).find(Chip).last().prop('label')).toEqual('running')
  });
});

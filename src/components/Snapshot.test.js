import React from 'react';
import { shallow } from 'enzyme';
import Typography from '@material-ui/core/Typography';
import Snapshot from './Snapshot';
import Image from './Image';

describe('Snapshot', () => {

  it('renders without crashing', () => {
    const data = {
      sha: "snapshot id",
      images: []
    }
    shallow(<Snapshot snapshot={data}/>)
  });

  it('shows the snapshot id', () => {
    const data = {
      sha: "snapshot id",
      images: []
    }
    const snapshot = shallow(<Snapshot snapshot={data}/>)

    expect(snapshot.find(Typography).props().children).toEqual('snapshot id')
    expect(snapshot.find(Image).length).toEqual(0)
  });

  it('lists images', () => {
    const data = {
      sha: "snapshot id",
      images: [
        {name: "image 1"},
        {name: "image 2"},
      ]
    }
    var snapshot = shallow(<Snapshot snapshot={data}/>)

    expect(snapshot.find(Image).length).toEqual(2)

    // Check the empty case.
    data.images = []
    snapshot = shallow(<Snapshot snapshot={data}/>)
    expect(snapshot.find(Image).length).toEqual(0)
  });
});

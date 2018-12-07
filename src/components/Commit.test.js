import React from 'react';
import { shallow } from 'enzyme';
import Typography from '@material-ui/core/Typography';
import Commit from './Commit';
import Image from './Image';

describe('Commit', () => {

  it('renders without crashing', () => {
    const data = {
      sha: "commit id",
      images: []
    }
    shallow(<Commit commit={data}/>)
  });

  it('shows the commit id', () => {
    const data = {
      sha: "commit id",
      images: []
    }
    const commit = shallow(<Commit commit={data}/>)

    expect(commit.find(Typography).props().children).toEqual('commit id')
    expect(commit.find(Image).length).toEqual(0)
  });

  it('lists images', () => {
    const data = {
      sha: "commit id",
      images: [
        {name: "image 1"},
        {name: "image 2"},
      ]
    }
    var commit = shallow(<Commit commit={data}/>)

    expect(commit.find(Image).length).toEqual(2)

    // Check the empty case.
    data.images = []
    commit = shallow(<Commit commit={data}/>)
    expect(commit.find(Image).length).toEqual(0)
  });
});

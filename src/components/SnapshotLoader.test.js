import React from 'react';
import { shallow } from 'enzyme';
import SnapshotLoader from './SnapshotLoader';
import Typography from '@material-ui/core/Typography';

// Rather heavy-handed, but didn't have much success with other
// methods of mocking fetch.
global.fetch = jest.fn().mockImplementation(() => ({
  status: 200,
  ok: true,
  json: () => new Promise((resolve, reject) => {
    resolve({
      sha: 'some test id',
      images: []
    })
  })
}))

describe('SnapshotLoader', () => {

  it('renders without crashing', async () => {
    await shallow(<SnapshotLoader match={{params: {id: 123}}}/>)
  });

  it('fetches commit data from API', async () => {
    // Create component without triggering componentDidMount.
    const wrapper = await shallow(<SnapshotLoader match={{params: {id: 123}}}/>);
    expect(wrapper.state().snapshot.sha).toEqual('none')
    expect(wrapper.state().loaded).toEqual(false)

    // Trigger componentDidMount, and check that fetch was called.
    await Promise.resolve();

    expect(wrapper.state().error).toEqual(false)
    expect(wrapper.state().snapshot.sha).toEqual('some test id')
    expect(wrapper.state().loaded).toEqual(true)
  });

  it('renders an error on API error', async () => {
    // Make fetch return an error.
    window.fetch.mockResolvedValue({
      status: 500,
      ok: false,
    })

    const wrapper = await shallow(<SnapshotLoader match={{params: {id: 123}}}/>);
    await Promise.resolve()
    expect(wrapper.state().error).toEqual(true)
    expect(wrapper.find(Typography).props().children).toEqual('Error loading.')
  });
});

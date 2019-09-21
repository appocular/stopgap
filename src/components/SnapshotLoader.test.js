import React from 'react';
import { shallow } from 'enzyme';
import SnapshotLoader from './SnapshotLoader';
import Typography from '@material-ui/core/Typography';

// import Appocular  from '../Appocular'

// Rather heavy-handed, but didn't have much success with other
// methods of mocking fetch.
// global.fetch = jest.fn().mockImplementation(() => ({
//   status: 200,
//   ok: true,
//   json: () => new Promise((resolve, reject) => {
//     resolve({
//       id: 'some test id',
//       checkpoints: []
//     })
//   })
// }))

// jest.mock('../Appocular', () => () => ({
//   getSnapshotById: () => {
//     return {
//       id: 'some test id',
//       checkpoints: []
//     }
//   }
// }))
// jest.mock('../Appocular',)

describe('SnapshotLoader', () => {

  it('renders without crashing', async () => {
    await shallow(<SnapshotLoader match={{params: {id: 123}}}/>)
  });

  it('fetches commit data from API', async () => {
    // Create component without triggering componentDidMount.
    const wrapper = await shallow(<SnapshotLoader match={{params: {id: 123}}}/>);
    //const wrapper = shallow(<SnapshotLoader match={{params: {id: 123}}}/>);
    // expect(wrapper.state().snapshot).toEqual(null)
    // expect(wrapper.state().loaded).toEqual(false)

    Appocular.getSnapshotById.mockImplementation(() => {
      return {
        id: 'some test id',
        checkpoints: []
      }
    })

    // Trigger componentDidMount, and check that fetch was called.
    //await Promise.resolve();

    expect(wrapper.state().error).toEqual(false)
    expect(wrapper.state().snapshot.id).toEqual('some test id')
    expect(wrapper.state().loaded).toEqual(true)
  });

  it('renders an error on API error', async () => {
    // Make fetch return an error.
    // window.fetch.mockResolvedValue({
    //   status: 500,
    //   ok: false,
    // })

    const wrapper = await shallow(<SnapshotLoader match={{params: {id: 123}}}/>);
    await Promise.resolve()
    expect(wrapper.state().error).toEqual(true)
    expect(wrapper.find(Typography).props().children).toEqual('Error loading.')
  });
});

import React from 'react';
import { shallow } from 'enzyme';
import App from './App';
import Typography from '@material-ui/core/Typography';

// Rather heavy-handed, but didn't have much success with other
// methods of mocking fetch.
window.fetch = jest.fn().mockImplementation(() => ({
  status: 200,
  ok: true,
  json: () => new Promise((resolve, reject) => {
    resolve({
      sha: 'bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb',
      images: []
    })
  })
}))

describe('App', () => {

  it('renders without crashing', async () => {
    await shallow(<App />)
  });

  it('fetches commit data from API', async () => {
    const wrapper = await shallow(<App />);
    expect(wrapper.state().commit.sha).toEqual('none')
    expect(wrapper.state().loaded).toEqual(false)

    await wrapper.update()
    expect(wrapper.state().commit.sha).toEqual('bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb')
    expect(wrapper.state().loaded).toEqual(true)
  });

  it('renders an error on API error', async () => {
    window.fetch = jest.fn().mockImplementation(() => ({
      status: 500,
      ok: false,
    }))

    const wrapper = await shallow(<App />);
    await wrapper.update()
    expect(wrapper.state().error).toEqual(true)
    expect(wrapper.find(Typography).props().children).toEqual('Error loading.')
  });
});

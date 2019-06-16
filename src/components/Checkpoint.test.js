import React from 'react';
import { mount } from 'enzyme';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardHeader from '@material-ui/core/CardHeader';
import Checkpoint from './Checkpoint';
import DialogContent from '@material-ui/core/DialogContent';
import CardMedia from '@material-ui/core/CardMedia';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import Chip from '@material-ui/core/Chip';

describe('Checkpoint', () => {

  it('renders without crashing', () => {
    mount(<Checkpoint checkpoint={{name: "test", id: 1}} />)
  });

  it('shows the checkpoint name', () => {
    const checkpoint = mount(<Checkpoint checkpoint={{name: "Checkpoint name", id: 1}} />)

    expect(checkpoint.find(Card).find(CardActionArea).find(CardHeader).props().title).toEqual('Checkpoint name')
  });

  it('shows the checkpoint image', () => {
    const checkpoint = mount(<Checkpoint checkpoint={{name: "Checkpoint name", id: 1, image_sha: "image_sha"}} />)

    // Undefined as process.env.REACT_APP_APPOCULAR_URL will return undefined in test environment.
    expect(checkpoint.find(CardActionArea).find(CardMedia).prop('image')).toEqual('undefined/image/image_sha')
  })

  it('shows the checkpoint image in dialog', () => {
    const checkpoint = mount(<Checkpoint checkpoint={{name: "Checkpoint name", id: 1, image_sha: "image_sha"}} />)
    // Open the dialog.
    checkpoint.find(CardActionArea).simulate('click');

    expect(checkpoint.find(DialogContent).find(CardMedia).prop('image')).toEqual('undefined/image/image_sha')
  })

  it('shows the checkpoint baseline in dialog', () => {
    const props = {
      name: "Checkpoint name",
      id: 1,
      image_sha: "image_sha",
      baseline_sha: "baseline_sha"
    };
    const checkpoint = mount(<Checkpoint checkpoint={props} />)
    // Open the dialog.
    checkpoint.find(CardActionArea).simulate('click');

    expect(checkpoint.find(DialogContent).find(CardMedia).at(1).prop('image')).toEqual('undefined/image/baseline_sha')
  })

  it('shows the checkpoint diff in dialog', () => {
    const props = {
      name: "Checkpoint name",
      id: 1,
      image_sha: "image_sha",
      baseline_sha: "baseline_sha",
      diff_sha: "diff_sha"
    };
    const checkpoint = mount(<Checkpoint checkpoint={props} />)
    // Open the dialog.
    checkpoint.find(CardActionArea).simulate('click');

    expect(checkpoint.find(DialogContent).find(CardMedia).at(2).prop('image')).toEqual('undefined/image/diff_sha')
  })

  it('shows the checkpoint status in dialog', () => {
    const props = {
      name: "Checkpoint name",
      id: 1,
      image_sha: "image_sha",
      baseline_sha: "baseline_sha",
      diff_sha: "diff_sha",
      status: "passed"
    };
    const checkpoint = mount(<Checkpoint checkpoint={props} />)
    // Open the dialog.
    checkpoint.find(CardActionArea).simulate('click');

    expect(checkpoint.find(DialogTitle).find(Chip).prop('label')).toEqual('passed')
  })
});

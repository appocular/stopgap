import React from 'react';
import { useOvermind } from '../overmind';
import CheckpointMeta from './CheckpointMeta';
import Image from './Image';

const Checkpoint = () => {
  const { state, actions } = useOvermind()
  const checkpoint = state.getCurrentCheckpoint
  let suffix, classes = [
    'checkpoint',
    'status-' + checkpoint.status,
    'diff-status-' + checkpoint.diff_status
  ]

  if (checkpoint.diff_status ==  'different') {
    if (!checkpoint.image_url) {
      suffix = ', deleted'
      classes.push('deleted')
    }
    if (!checkpoint.baseline_url) {
      suffix = ', new'
      classes.push('new')
    }
  }

  const numImages = [checkpoint.image_url, checkpoint.baseline_url, checkpoint.diff_url].reduce((acc, url) => {
    if (url) acc++;
    return acc;
  }, 0)

  return (
    <div className={classes.join(' ')}>
      <div className="header">
    <h1>{state.snapshot.id} / {checkpoint.name}</h1>
    <div className="status">Status: {checkpoint.status}{suffix}</div>
    <CheckpointMeta meta={checkpoint.meta}/>
    <div className="actions">
    {checkpoint.actions && checkpoint.actions.approve ? <button className="approve" onClick={actions.approveCurrentCheckpoint}>Approve</button> : null}
    {checkpoint.actions && checkpoint.actions.reject ? <button className="reject" onClick={actions.rejectCurrentCheckpoint}>Reject</button> : null}
    {checkpoint.actions && checkpoint.actions.ignore ? <button className="ignore" onClick={actions.ignoreCurrentCheckpoint}>Ignore</button> : null}
    </div>
      </div>
      <div className={'images images-' + numImages}>
        {checkpoint.image_url ? <Image title="Checkpoint" className="new" src={checkpoint.image_url}/> : null}
        {checkpoint.baseline_url ? <Image title="Baseline" className="baseline" src={checkpoint.baseline_url}/> : null}
        {checkpoint.diff_url ? <Image title="Diff" className="diff" src={checkpoint.diff_url}/> : null}
      </div>
    </div>
  )
}

export default Checkpoint;

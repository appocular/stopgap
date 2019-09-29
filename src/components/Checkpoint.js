import React from 'react';
import { useOvermind } from '../overmind';

const Checkpoint = () => {
  const { state, actions } = useOvermind()
  const checkpoint = state.getCurrentCheckpoint
  let suffix, classes = [
    'checkpoint',
    checkpoint.status
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
      <h1>{state.snapshot.id} / {checkpoint.name}</h1>
      <div className="status">Status: {checkpoint.status}{suffix}</div>
      <div className="actions">
        {checkpoint.actions && checkpoint.actions.approve ? <button className="approve" onClick={actions.approveCurrentCheckpoint}>Approve</button> : null}
        {checkpoint.actions && checkpoint.actions.reject ? <button className="reject" onClick={actions.rejectCurrentCheckpoint}>Reject</button> : null}
        {checkpoint.actions && checkpoint.actions.ignore ? <button className="ignore" onClick={actions.ignoreCurrentCheckpoint}>Ignore</button> : null}
      </div>
      <div className={'images images-' + numImages}>
        {checkpoint.image_url ? <img className="new" alt="" src={checkpoint.image_url}/> : null}
        {checkpoint.baseline_url ? <img className="baseline" alt="" src={checkpoint.baseline_url}/> : null}
        {checkpoint.diff_url ? <img className="diff" alt="" src={checkpoint.diff_url}/> : null}
      </div>
    </div>
  )
}

export default Checkpoint;

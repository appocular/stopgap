import React from 'react';
import { useOvermind } from '../overmind';

const Checkpoint = () => {
  const { state, actions } = useOvermind()
  const checkpoint = state.getCurrentCheckpoint

  const numImages = [checkpoint.image_url, checkpoint.baseline_url, checkpoint.diff_url].reduce((acc, url) => {
    if (url) acc++;
    return acc;
  }, 0)

  return (
    <div className={"checkpoint " + checkpoint.status}>
      <h1>{state.snapshot.id} / {checkpoint.name}</h1>
      <div className="status">Status: {checkpoint.status}</div>
      <div className="actions">
        {checkpoint.actions && checkpoint.actions.approve ? <button className="approve" onClick={actions.approveCurrentCheckpoint}>Approve</button> : null}
        {checkpoint.actions && checkpoint.actions.reject ? <button className="reject" onClick={actions.rejectCurrentCheckpoint}>Reject</button> : null}
        {checkpoint.actions && checkpoint.actions.ignore ? <button className="ignore" onClick={actions.ignoreCurrentCheckpoint}>Ignore</button> : null}
      </div>
      <div className={'images images-' + numImages}>
        {checkpoint.image_url ? <img alt="" src={checkpoint.image_url}/> : null}
        {checkpoint.baseline_url ? <img alt="" src={checkpoint.baseline_url}/> : null}
        {checkpoint.diff_url ? <img alt="" src={checkpoint.diff_url}/> : null}
      </div>
    </div>
  )
}

export default Checkpoint;

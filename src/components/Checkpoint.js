import React from 'react';
import { useOvermind } from '../overmind';
import CheckpointMeta from './CheckpointMeta';
import Image from './Image';
import BugReportButton from './BugReportButton';

const Checkpoint = () => {
  const { state, actions } = useOvermind()
  const checkpoint = state.getCurrentCheckpoint
  const snapshot = state.snapshot

  let suffix, classes = [
    'checkpoint',
    'approval-status-' + checkpoint.approval_status,
    'diff-status-' + checkpoint.diff_status,
    'run-status-' + snapshot.run_status
  ]

  const running = snapshot.run_status !== 'done'

  if (!running && checkpoint.diff_status ===  'different') {
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

  let status = checkpoint.approval_status

  if (checkpoint.image_status !== 'available') {
    if (running) {
      status = checkpoint.image_status
    }
  }

  return (
    <div className={classes.join(' ')}>
      <div className="header">
        <h1><a href={'/' + state.snapshot.id}>{state.snapshot.id}</a> / {checkpoint.name}</h1>
        <BugReportButton/>
        <div className="status">Status: {status}{suffix}</div>
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

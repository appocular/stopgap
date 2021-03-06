import React from 'react';
import CheckpointPreview from './CheckpointPreview'
import BaselineInfo from './BaselineInfo'
import { useOvermind } from '../overmind'
import { statusString } from '../utils/misc.js'
import BugReportButton from './BugReportButton'

const Snapshot = () => {
  const { state } = useOvermind()
  const snapshot = state.snapshot

  return (
    <div className="snapshot">
      <div className="header">
        <h1>{snapshot.id}</h1>
        <BugReportButton/>
        <div className="status">Status: {statusString(snapshot)}</div>
        {state.baseline ? <BaselineInfo baseline={state.baseline}/> : null}
      </div>
      <ul>
        {Object.values(snapshot.checkpoints).map((checkpoint) => (
          <li key={checkpoint.self}>
            <a href={'/' + snapshot.id + "/" + checkpoint.slug}>
              <CheckpointPreview checkpoint={checkpoint} running={snapshot.run_status !== 'done'}/>
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Snapshot;

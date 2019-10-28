import React from 'react';
import CheckpointPreview from './CheckpointPreview'
import BaselineInfo from './BaselineInfo'
import { useOvermind } from '../overmind';

const Snapshot = () => {
  const { state } = useOvermind()
  const snapshot = state.snapshot
  return (
    <div className="snapshot">
      <div className="header">
        <h1>{snapshot.id}</h1>
        <div className="status">Status: {snapshot.status}, {snapshot.run_status}</div>
        {state.baseline ? <BaselineInfo baseline={state.baseline}/> : null}
      </div>
      <ul>
        {Object.values(snapshot.checkpoints).map((checkpoint) => (
          <li key={checkpoint.self}>
            <a href={'/' + snapshot.id + "/" + checkpoint.slug}>
              <CheckpointPreview checkpoint={checkpoint} preview={true}/>
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Snapshot;

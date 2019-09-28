import React from 'react';
import CheckpointPreview from './CheckpointPreview'
import { useOvermind } from '../overmind';

const Snapshot = () => {
  const { state } = useOvermind()
  const snapshot = state.snapshot
  return (
    <div className="snapshot">
      <h1>{snapshot.id}</h1>
      <div className="status">Status: {snapshot.status}, {snapshot.run_status}</div>
      <ul>
        {Object.values(snapshot.checkpoints).map((checkpoint) => (
          <li key={checkpoint.self}>
            <a href={snapshot.id + "/" + checkpoint.slug}>
              <CheckpointPreview checkpoint={checkpoint} preview={true}/>
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Snapshot;

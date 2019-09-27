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
          <li key={checkpoint.id}>
            <a href={snapshot.id + "/" + checkpoint.id}>
              <CheckpointPreview checkpoint={checkpoint} preview={true}/>
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Snapshot;

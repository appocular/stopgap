import React from 'react';
import Checkpoint from './Checkpoint'
import { useOvermind } from '../overmind'

const Snapshot = ({snapshot}) => {
  const { actions }  = useOvermind()
  const gotoCheckpoint = (checkpointId) => {
    actions.showCheckpoint(checkpointId)
  }

  return (
    <div className="snapshot">
      <div className="status">Status: {snapshot.status}, {snapshot.run_status}</div>
      <ul>
        {Object.values(snapshot.checkpoints).map((checkpoint) => (
          <li key={checkpoint.self} onClick={gotoCheckpoint}>
            <a href={snapshot.id + "/" + checkpoint.id}>
              <Checkpoint checkpoint={checkpoint} preview={true}/>
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Snapshot;

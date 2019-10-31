import React from 'react';

const CheckpointMeta = ({meta}) => {
  let metaList = []
  if (meta) {
    Object.keys(meta).map(name => {
      return metaList.push(name + ": " + meta[name])
    })
  }

  if (metaList.length > 0) {
    return <div className="meta">{metaList.join(', ')}</div>
  }
  return null
}

export default CheckpointMeta

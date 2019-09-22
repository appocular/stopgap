import React, { Component } from 'react';
import { useOvermind } from '../overmind';

const Checkpoint = ({checkpoint, preview}) => {
  const { actions } = useOvermind()
  let content
  if (preview) {
    content =
      <div className="image">
        {checkpoint.image_url ? <img src={checkpoint.image_url}/> : null}
        {checkpoint.diff_url ? <img className="overlay" src={checkpoint.diff_url}/> : null}
      </div>
  } else {
    const numImages = [checkpoint.image_url, checkpoint.baseline_url, checkpoint.diff_url].reduce((acc, url) => {
      if (url) acc++;
      return acc;
    }, 0)
    content =
      <>
        <div className="status">Status: {checkpoint.status}</div>
        <div className="actions">
          {checkpoint.actions.approve ? <button className="approve" onClick={actions.approveCurrentCheckpoint}>Approve</button> : null}
          {checkpoint.actions.reject ? <button className="reject" onClick={actions.rejectCurrentCheckpoint}>Reject</button> : null}
          {checkpoint.actions.ignore ? <button className="ignore" onClick={actions.ignoreCurrentCheckpoint}>Ignore</button> : null}
        </div>
        <div className={'images images-' + numImages}>
          {checkpoint.image_url ? <img src={checkpoint.image_url}/> : null}
          {checkpoint.baseline_url ? <img src={checkpoint.baseline_url}/> : null}
          {checkpoint.diff_url ? <img src={checkpoint.diff_url}/> : null}
        </div>
      </>
  }

  return (
    <div className={"checkpoint " + (preview ? "preview " : " ") + checkpoint.status}>
      <h2>{checkpoint.name}</h2>
      {content}
    </div>
  )
}

export default Checkpoint;

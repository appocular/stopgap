import React from 'react';

const CheckpointPreview = ({checkpoint, preview}) => {
  let suffix = '', image = checkpoint.image_url ? checkpoint.image_url : checkpoint.baseline_url
  if (checkpoint.diff_status ==  'different') {
    if (!checkpoint.image_url) {
      suffix = ' (deleted)'
    }
    if (!checkpoint.baseline_url) {
      suffix = ' (new)'
    }
  }
  return <div className={"checkpoint preview " + checkpoint.status}>
           <h2>{checkpoint.name}{suffix}</h2>
           <div className="image">
             {image ? <img alt="" src={image}/> : null}
             {checkpoint.diff_url ? <img className="overlay" alt="" src={checkpoint.diff_url}/> : null}
           </div>
         </div>
}

export default CheckpointPreview;

import React from 'react';
import CheckpointMeta from './CheckpointMeta';

const CheckpointPreview = ({checkpoint, preview}) => {
  let suffix = '',
      image = checkpoint.image_url ? checkpoint.image_url : checkpoint.baseline_url,
      classes = [
        'checkpoint',
        'preview',
        'status-' + checkpoint.status,
        'diff-status-' + checkpoint.diff_status
      ]
  if (checkpoint.diff_status ===  'different') {
    if (!checkpoint.image_url) {
      suffix = ' (deleted)'
      classes.push('deleted')
    }
    if (!checkpoint.baseline_url) {
      suffix = ' (new)'
      classes.push('new')
    }
  }

  return <div className={classes.join(' ')}>
           <h2>{checkpoint.name}{suffix}</h2>
           <CheckpointMeta meta={checkpoint.meta}/>
           <div className="image">
             {image ? <img alt="" src={image}/> : null}
             {checkpoint.diff_url ? <img className="overlay" alt="" src={checkpoint.diff_url}/> : null}
           </div>
         </div>
}

export default CheckpointPreview;

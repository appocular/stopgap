import React from 'react';

const CheckpointPreview = ({checkpoint, preview}) => {
  return <div className={"checkpoint preview " + checkpoint.status}>
           <h2>{checkpoint.name}</h2>
           <div className="image">
             {checkpoint.image_url ? <img alt="" src={checkpoint.image_url}/> : null}
             {checkpoint.diff_url ? <img className="overlay" alt="" src={checkpoint.diff_url}/> : null}
           </div>
         </div>
}

export default CheckpointPreview;

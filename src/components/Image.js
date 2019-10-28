import React from 'react';

const Image = ({title, className, src}) => {

  return <div className={"image " + className}>
           <div className="caption">{title}:</div>
           <img alt="" src={src}/>
         </div>
}

export default Image

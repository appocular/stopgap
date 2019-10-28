import React from 'react';

const BaselineInfo = ({baseline}) => {
  return <div className="baseline-info">Baseline: <a href={'/' + baseline.id}>{baseline.id}</a> {baseline.status}, {baseline.run_status}</div>
}

export default BaselineInfo

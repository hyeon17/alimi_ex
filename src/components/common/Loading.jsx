import React from 'react';
import '../../styles/Loading.scss';

function Loading() {
  return (
    <div id='loading-container'>
      <div className='loading-progress-wrapper'>
        <div className='loading-spin'></div>
      </div>
    </div>
  );
}

export default React.memo(Loading);

import React from 'react';

const N8NDashboard = () => {
  return (
    <div style={{width: '100%', height: 'calc(100vh - 60px)'}}>
      <iframe
        src="/n8ndashboard.html"
        title="Pro Widget Dashboard"
        style={{width: '100%', height: '100%', border: 'none'}}
      />
    </div>
  );
};

export default N8NDashboard; 
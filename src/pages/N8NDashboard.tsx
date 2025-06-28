import React, { useEffect } from 'react';

const N8NDashboard = () => {
  useEffect(() => {
    // Chuyển hướng sang đường dẫn tĩnh
    window.location.replace("/MiLo--Fi/n8ndashboard");
  }, []);

  return null; // Không render gì cả vì sẽ redirect ngay lập tức
};

export default N8NDashboard; 
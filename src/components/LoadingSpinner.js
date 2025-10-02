import React from 'react';

const LoadingSpinner = () => {
  return (
    <div className="loading-container">
      <div className="spinner"></div>
      <p className="loading-text">
        Calculating your Vedic birth chart...
      </p>
      <p style={{ fontSize: '0.9rem', color: '#888', marginTop: '0.5rem' }}>
        This may take a few moments as we perform precise astronomical calculations.
      </p>
    </div>
  );
};

export default LoadingSpinner;

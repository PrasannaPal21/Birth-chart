import React from 'react';

const ErrorMessage = ({ message, onRetry }) => {
  const getErrorType = (message) => {
    if (message.includes('date') || message.includes('1899') || message.includes('2053')) {
      return 'date';
    }
    if (message.includes('network') || message.includes('fetch')) {
      return 'network';
    }
    if (message.includes('validation') || message.includes('required')) {
      return 'validation';
    }
    return 'general';
  };

  const getErrorIcon = (type) => {
    switch (type) {
      case 'date': return '📅';
      case 'network': return '🌐';
      case 'validation': return '⚠️';
      default: return '❌';
    }
  };

  const getErrorTitle = (type) => {
    switch (type) {
      case 'date': return 'Date Range Error';
      case 'network': return 'Connection Error';
      case 'validation': return 'Validation Error';
      default: return 'Calculation Error';
    }
  };

  const getHelpText = (type) => {
    switch (type) {
      case 'date': 
        return 'Please ensure your birth date is between July 29, 1899 and October 9, 2053. This limitation is due to the available astronomical data (JPL DE421 ephemeris).';
      case 'network': 
        return 'Please check your internet connection and try again. The API server might be temporarily unavailable.';
      case 'validation': 
        return 'Please check that all required fields are filled correctly. Latitude should be between -90 and 90, longitude between -180 and 180.';
      default: 
        return 'An unexpected error occurred while calculating your chart. Please try again or contact support if the problem persists.';
    }
  };

  const errorType = getErrorType(message);

  return (
    <div className="error-container">
      <div className="error-icon">
        {getErrorIcon(errorType)}
      </div>
      
      <h3 className="error-title">
        {getErrorTitle(errorType)}
      </h3>
      
      <div className="error-message">
        <p><strong>Error Details:</strong></p>
        <p style={{ 
          background: '#f8f9fa', 
          padding: '1rem', 
          borderRadius: '8px',
          border: '1px solid #e9ecef',
          fontFamily: 'monospace',
          fontSize: '0.9rem',
          margin: '1rem 0'
        }}>
          {message}
        </p>
        
        <p>{getHelpText(errorType)}</p>
        
        {errorType === 'date' && (
          <div style={{ 
            background: '#e8f4fd', 
            padding: '1rem', 
            borderRadius: '8px',
            border: '1px solid #b3d8f2',
            marginTop: '1rem'
          }}>
            <p><strong>💡 Supported Date Range:</strong></p>
            <ul style={{ marginLeft: '1.5rem', marginTop: '0.5rem' }}>
              <li><strong>Earliest:</strong> July 29, 1899</li>
              <li><strong>Latest:</strong> October 9, 2053</li>
              <li><strong>Why this range?</strong> Limited by JPL DE421 planetary ephemeris data</li>
            </ul>
          </div>
        )}
        
        {errorType === 'network' && (
          <div style={{ 
            background: '#fff3cd', 
            padding: '1rem', 
            borderRadius: '8px',
            border: '1px solid #ffeaa7',
            marginTop: '1rem'
          }}>
            <p><strong>🔧 Troubleshooting Steps:</strong></p>
            <ol style={{ marginLeft: '1.5rem', marginTop: '0.5rem' }}>
              <li>Check your internet connection</li>
              <li>Wait a few moments and try again</li>
              <li>If the API is hosted on a free tier, it might be sleeping</li>
              <li>Contact support if the issue persists</li>
            </ol>
          </div>
        )}
      </div>
      
      <button className="retry-button" onClick={onRetry}>
        🔄 Try Again
      </button>
    </div>
  );
};

export default ErrorMessage;

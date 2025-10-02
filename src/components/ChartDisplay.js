import React, { useState } from 'react';
import SouthIndianChart from './SouthIndianChart';

const ChartDisplay = ({ data, onNewChart }) => {
  const [activeTab, setActiveTab] = useState('summary');
  
  // Guard clause to prevent rendering if data is not available
  if (!data) {
    return <div className="chart-container">No chart data available</div>;
  }

  const formatDate = (dateString) => {
    if (!dateString) return 'Unknown';
    try {
      return new Date(dateString).toLocaleString('en-IN', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        timeZone: 'Asia/Kolkata'
      });
    } catch (error) {
      return 'Invalid date';
    }
  };

  const getPlanetEmoji = (planet) => {
    const emojiMap = {
      'Sun': '☉',
      'Moon': '☽',
      'Mars': '♂',
      'Mercury': '☿',
      'Jupiter': '♃',
      'Venus': '♀',
      'Saturn': '♄',
      'Rahu': '☊',
      'Ketu': '☋'
    };
    return emojiMap[planet] || '⭐';
  };

  const getSignEmoji = (sign) => {
    const signEmojis = {
      'Aries': '♈',
      'Taurus': '♉',
      'Gemini': '♊',
      'Cancer': '♋',
      'Leo': '♌',
      'Virgo': '♍',
      'Libra': '♎',
      'Scorpio': '♏',
      'Sagittarius': '♐',
      'Capricorn': '♑',
      'Aquarius': '♒',
      'Pisces': '♓'
    };
    return signEmojis[sign] || '⭐';
  };

  const getHouseColor = (houseNum) => {
    const colors = [
      '#e74c3c', '#e67e22', '#f39c12', '#f1c40f',
      '#2ecc71', '#27ae60', '#1abc9c', '#16a085',
      '#3498db', '#2980b9', '#9b59b6', '#8e44ad'
    ];
    return colors[(houseNum - 1) % 12];
  };

  return (
    <div className="chart-container">
      <div className="chart-header">
        <h2 className="chart-title">🌟 Vedic Birth Chart</h2>
        <p className="chart-subtitle">
          {data.name || 'Unknown'} • Born in {data.birthplace || 'Unknown'}
        </p>
        <p className="chart-subtitle">
          {formatDate(data.birth_datetime_input)} ({data.assumed_tz_handling === 'assumed_IST' ? 'IST' : 'Input Timezone'})
        </p>
        
        {/* Navigation Tabs */}
        <div className="chart-tabs">
          <button 
            className={`tab-button ${activeTab === 'summary' ? 'active' : ''}`}
            onClick={() => setActiveTab('summary')}
          >
            📊 Summary
          </button>
          <button 
            className={`tab-button ${activeTab === 'chart-english' ? 'active' : ''}`}
            onClick={() => setActiveTab('chart-english')}
          >
            🗺️ Chart (English)
          </button>
          <button 
            className={`tab-button ${activeTab === 'chart-tamil' ? 'active' : ''}`}
            onClick={() => setActiveTab('chart-tamil')}
          >
            🗺️ ஜாதகம் (Tamil)
          </button>
          <button 
            className={`tab-button ${activeTab === 'details' ? 'active' : ''}`}
            onClick={() => setActiveTab('details')}
          >
            📋 Details
          </button>
        </div>
      </div>

      {/* Tab Content */}
      <div className="tab-content">
        
        {/* South Indian Chart - English */}
        {activeTab === 'chart-english' && (
          <SouthIndianChart data={data} language="english" />
        )}
        
        {/* South Indian Chart - Tamil */}
        {activeTab === 'chart-tamil' && (
          <SouthIndianChart data={data} language="tamil" />
        )}
        
        {/* Summary Tab */}
        {activeTab === 'summary' && (
          <div className="chart-content">
            {/* Quick Summary */}
            <div className="quick-summary">
              <h3 className="chart-section-title">
                ⭐ Quick Summary
              </h3>
              
              <div className="summary-grid">
                <div className="summary-item">
                  <div className="summary-icon">{getSignEmoji(data.lagna_sign)}</div>
                  <div className="summary-text">
                    <div className="summary-label">Rising Sign</div>
                    <div className="summary-value">{data.lagna_sign || 'Unknown'}</div>
                  </div>
                </div>
                
                <div className="summary-item">
                  <div className="summary-icon">{getSignEmoji(data.moon_sign)}</div>
                  <div className="summary-text">
                    <div className="summary-label">Moon Sign</div>
                    <div className="summary-value">{data.moon_sign || 'Unknown'}</div>
                  </div>
                </div>
                
                <div className="summary-item">
                  <div className="summary-icon">🏠</div>
                  <div className="summary-text">
                    <div className="summary-label">House System</div>
                    <div className="summary-value">Sripati</div>
                  </div>
                </div>
                
                <div className="summary-item">
                  <div className="summary-icon">🌟</div>
                  <div className="summary-text">
                    <div className="summary-label">Ayanamsa</div>
                    <div className="summary-value">Lahiri</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Details Tab */}
        {activeTab === 'details' && (
          <div className="chart-content">
            {/* Basic Information */}
            <div className="basic-info">
          <h3 className="chart-section-title">
            🎯 Basic Information
          </h3>
          
          <div className="info-item">
            <span className="info-label">Lagna (Ascendant):</span>
            <span className="info-value">
              {getSignEmoji(data.lagna_sign)} {data.lagna_sign || 'Unknown'}
            </span>
          </div>
          
          <div className="info-item">
            <span className="info-label">Moon Sign (Rashi):</span>
            <span className="info-value">
              {getSignEmoji(data.moon_sign)} {data.moon_sign || 'Unknown'}
            </span>
          </div>
          
          <div className="info-item">
            <span className="info-label">Ayanamsa (Lahiri):</span>
            <span className="info-value">{data.ayanamsa_deg?.toFixed(4) || 'N/A'}°</span>
          </div>
          
          <div className="info-item">
            <span className="info-label">Lagna Degree:</span>
            <span className="info-value">{data.lagna_sidereal_deg?.toFixed(4) || 'N/A'}°</span>
          </div>
          
          <div className="info-item">
            <span className="info-label">Birth Time Used (UTC):</span>
            <span className="info-value">{data.birth_datetime_used_utc ? new Date(data.birth_datetime_used_utc).toLocaleString() : 'N/A'}</span>
          </div>
        </div>

            {/* Houses Section */}
            <div className="section">
        <h3 className="chart-section-title">
          🏠 Houses (Sripati System)
        </h3>
        <div className="houses-grid">
          {data.houses_sidereal?.map((house) => (
            <div 
              key={house.house} 
              className="house-card"
              style={{ borderLeftColor: getHouseColor(house.house) }}
            >
              <div className="house-number">
                House {house.house}
              </div>
              <div className="house-sign">
                {getSignEmoji(house.sign)} {house.sign || 'Unknown'}
              </div>
              <div className="house-degree">
                {house.cusp_deg?.toFixed(2) || 'N/A'}°
              </div>
            </div>
          )) || <div>No house data available</div>}
        </div>
      </div>

      {/* Planets Section */}
      <div className="section">
        <h3 className="chart-section-title">
          🪐 Planetary Positions
        </h3>
        <div className="planets-grid">
          {data.planets_sidereal?.map((planet) => (
            <div key={planet.graha} className="planet-card">
              <div className="planet-name">
                {getPlanetEmoji(planet.graha)} {planet.graha || 'Unknown'}
              </div>
              <div className="planet-details">
                <div className="planet-detail">
                  <span className="planet-detail-label">Sign:</span>
                  <span className="planet-detail-value">
                    {getSignEmoji(planet.sign)} {planet.sign || 'Unknown'}
                  </span>
                </div>
                <div className="planet-detail">
                  <span className="planet-detail-label">Degree:</span>
                  <span className="planet-detail-value">{planet.sidereal_deg?.toFixed(4) || 'N/A'}°</span>
                </div>
                <div className="planet-detail">
                  <span className="planet-detail-label">In Sign:</span>
                  <span className="planet-detail-value">{planet.deg_in_sign?.toFixed(2) || 'N/A'}°</span>
                </div>
                <div className="planet-detail">
                  <span className="planet-detail-label">DMS:</span>
                  <span className="planet-detail-value">{planet.dms || 'N/A'}</span>
                </div>
                <div className="planet-detail">
                  <span className="planet-detail-label">Tropical:</span>
                  <span className="planet-detail-value">{planet.tropical_deg?.toFixed(4) || 'N/A'}°</span>
                </div>
              </div>
            </div>
          )) || <div>No planetary data available</div>}
        </div>
      </div>

      {/* Debug Information (Collapsible) */}
      <details className="debug-section">
        <summary className="debug-summary">
          🔧 Technical Details (Click to expand)
        </summary>
        <div className="debug-content">
          <div className="debug-grid">
            <div className="debug-item">
              <span className="debug-label">GMST (degrees):</span>
              <span className="debug-value">{data.debug?.gmst_deg?.toFixed(6) || 'N/A'}°</span>
            </div>
            <div className="debug-item">
              <span className="debug-label">GMST (hours):</span>
              <span className="debug-value">{data.debug?.gmst_hours?.toFixed(6) || 'N/A'} hrs</span>
            </div>
            <div className="debug-item">
              <span className="debug-label">LST (degrees):</span>
              <span className="debug-value">{data.debug?.lst_deg?.toFixed(6) || 'N/A'}°</span>
            </div>
            <div className="debug-item">
              <span className="debug-label">LST (hours):</span>
              <span className="debug-value">{data.debug?.lst_hours?.toFixed(6) || 'N/A'} hrs</span>
            </div>
            <div className="debug-item">
              <span className="debug-label">Obliquity (ε):</span>
              <span className="debug-value">{data.debug?.eps_deg?.toFixed(6) || 'N/A'}°</span>
            </div>
            <div className="debug-item">
              <span className="debug-label">Tropical Ascendant:</span>
              <span className="debug-value">{data.debug?.primary_tropical_asc_deg?.toFixed(6) || 'N/A'}°</span>
            </div>
            <div className="debug-item">
              <span className="debug-label">Tropical MC:</span>
              <span className="debug-value">{data.debug?.primary_tropical_mc_deg?.toFixed(6) || 'N/A'}°</span>
            </div>
          </div>
        </div>
            </details>
          </div>
        )}
      </div>

      <button className="new-chart-button" onClick={onNewChart}>
        📊 Calculate New Chart
      </button>
    </div>
  );
};

export default ChartDisplay;

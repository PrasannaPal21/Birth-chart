import React from 'react';
import './SouthIndianChart.css';

const SouthIndianChart = ({ data, language = 'english' }) => {
  if (!data) {
    return <div className="chart-error">No chart data available</div>;
  }

  // South Indian chart house layout (fixed positions)
  const housePositions = {
    1: { top: '75%', left: '0%', width: '25%', height: '25%', position: 'bottom-left' },
    2: { top: '50%', left: '0%', width: '25%', height: '25%', position: 'middle-left' },
    3: { top: '25%', left: '0%', width: '25%', height: '25%', position: 'top-left' },
    4: { top: '0%', left: '0%', width: '25%', height: '25%', position: 'top-left-corner' },
    5: { top: '0%', left: '25%', width: '25%', height: '25%', position: 'top-middle-left' },
    6: { top: '0%', left: '50%', width: '25%', height: '25%', position: 'top-middle-right' },
    7: { top: '0%', left: '75%', width: '25%', height: '25%', position: 'top-right-corner' },
    8: { top: '25%', left: '75%', width: '25%', height: '25%', position: 'top-right' },
    9: { top: '50%', left: '75%', width: '25%', height: '25%', position: 'middle-right' },
    10: { top: '75%', left: '75%', width: '25%', height: '25%', position: 'bottom-right' },
    11: { top: '75%', left: '50%', width: '25%', height: '25%', position: 'bottom-middle-right' },
    12: { top: '75%', left: '25%', width: '25%', height: '25%', position: 'bottom-middle-left' }
  };

  // Get planet symbols based on language
  const getPlanetSymbol = (planet) => {
    if (language === 'tamil') {
      const tamilPlanets = {
        'Sun': 'ஞா', // Gnyayiru (Sun)
        'Moon': 'சந்', // Chandran (Moon)  
        'Mars': 'செவ்', // Sevvai (Mars)
        'Mercury': 'புத', // Budhan (Mercury)
        'Jupiter': 'குரு', // Guru (Jupiter)
        'Venus': 'சுக்', // Shukran (Venus)
        'Saturn': 'சனி', // Shani (Saturn)
        'Rahu': 'ராகு', // Rahu
        'Ketu': 'கேது'  // Ketu
      };
      return tamilPlanets[planet] || planet.substring(0, 2);
    } else {
      // English abbreviations
      const englishPlanets = {
        'Sun': 'Su',
        'Moon': 'Mo',
        'Mars': 'Ma', 
        'Mercury': 'Me',
        'Jupiter': 'Ju',
        'Venus': 'Ve',
        'Saturn': 'Sa',
        'Rahu': 'Ra',
        'Ketu': 'Ke'
      };
      return englishPlanets[planet] || planet.substring(0, 2);
    }
  };

  // Get sign names based on language
  const getSignName = (sign) => {
    if (language === 'tamil') {
      const tamilSigns = {
        'Aries': 'மேஷம்',
        'Taurus': 'ரிஷபம்',
        'Gemini': 'மிதுனம்',
        'Cancer': 'கடகம்',
        'Leo': 'சிம்மம்',
        'Virgo': 'கன்னி',
        'Libra': 'துலாம்',
        'Scorpio': 'விருச்சிகம்',
        'Sagittarius': 'தனுசு',
        'Capricorn': 'மகரம்',
        'Aquarius': 'கும்பம்',
        'Pisces': 'மீனம்'
      };
      return tamilSigns[sign] || sign;
    }
    return sign;
  };

  // Map planets to houses based on their positions
  const getPlanetsInHouse = (houseNumber) => {
    if (!data.planets_sidereal || !data.houses_sidereal) return [];
    
    // Find the sign for this house
    const house = data.houses_sidereal.find(h => h.house === houseNumber);
    if (!house) return [];
    
    // Get next house for boundary calculation
    const nextHouseNum = houseNumber === 12 ? 1 : houseNumber + 1;
    const nextHouse = data.houses_sidereal.find(h => h.house === nextHouseNum);
    
    // Find planets that fall within this house's degree range
    const planetsInHouse = data.planets_sidereal.filter(planet => {
      if (planet.sign === house.sign) {
        // Simple approach: if planet is in same sign as house cusp, it's in that house
        // More complex logic would consider degree ranges between house cusps
        return true;
      }
      return false;
    });
    
    return planetsInHouse;
  };

  // Get house sign
  const getHouseSign = (houseNumber) => {
    if (!data.houses_sidereal) return '';
    const house = data.houses_sidereal.find(h => h.house === houseNumber);
    return house ? house.sign : '';
  };

  return (
    <div className="south-indian-chart-container">
      <div className="chart-header">
        <h3 className="chart-title">
          {language === 'tamil' ? 'தென் இந்திய ஜாதகம்' : 'South Indian Birth Chart'}
        </h3>
        <p className="chart-subtitle">
          {language === 'tamil' ? 'லக்னம்' : 'Lagna'}: {getSignName(data.lagna_sign)} 
          {language === 'tamil' ? ' (ஆரோஹண ராசி)' : ' (Ascendant)'}
        </p>
      </div>

      <div className="south-indian-chart">
        {/* Render all 12 houses */}
        {Object.entries(housePositions).map(([houseNum, position]) => {
          const houseNumber = parseInt(houseNum);
          const planetsInHouse = getPlanetsInHouse(houseNumber);
          const houseSign = getHouseSign(houseNumber);
          
          return (
            <div
              key={houseNum}
              className={`house-box house-${houseNum} ${position.position}`}
              style={{
                position: 'absolute',
                top: position.top,
                left: position.left,
                width: position.width,
                height: position.height
              }}
            >
              <div className="house-header">
                <span className="house-number">{houseNum}</span>
                <span className="house-sign">{getSignName(houseSign)}</span>
              </div>
              
              <div className="planets-in-house">
                {planetsInHouse.map((planet, index) => (
                  <span key={planet.graha} className="planet-symbol">
                    {getPlanetSymbol(planet.graha)}
                  </span>
                ))}
              </div>
              
              {/* Show Lagna marker if this is the ascendant house */}
              {data.lagna_sign === houseSign && (
                <div className="lagna-marker">
                  {language === 'tamil' ? 'லக்' : 'Lag'}
                </div>
              )}
            </div>
          );
        })}

        {/* Center area with chart info */}
        <div className="chart-center">
          <div className="center-content">
            <div className="chart-name">
              {data.name || (language === 'tamil' ? 'பெயர் தெரியவில்லை' : 'Unknown')}
            </div>
            <div className="chart-date">
              {data.birth_datetime_input ? 
                new Date(data.birth_datetime_input).toLocaleDateString(
                  language === 'tamil' ? 'ta-IN' : 'en-IN'
                ) : 
                (language === 'tamil' ? 'தேதி தெரியவில்லை' : 'Unknown Date')
              }
            </div>
            <div className="chart-place">
              {data.birthplace || (language === 'tamil' ? 'இடம் தெரியவில்லை' : 'Unknown Place')}
            </div>
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="chart-legend">
        <h4>{language === 'tamil' ? 'கிரக குறியீடுகள்' : 'Planet Symbols'}</h4>
        <div className="legend-grid">
          {data.planets_sidereal?.map((planet) => (
            <div key={planet.graha} className="legend-item">
              <span className="legend-symbol">{getPlanetSymbol(planet.graha)}</span>
              <span className="legend-name">
                {language === 'tamil' ? 
                  getPlanetSymbol(planet.graha) : 
                  planet.graha
                }
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SouthIndianChart;

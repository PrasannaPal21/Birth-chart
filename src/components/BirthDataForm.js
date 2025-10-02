import React, { useState } from 'react';

const BirthDataForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    birthplace: '',
    birth_datetime: '',
    latitude: '',
    longitude: ''
  });

  const [errors, setErrors] = useState({});
  const [isGeocoding, setIsGeocoding] = useState(false);
  const [geocodeError, setGeocodeError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.birthplace.trim()) {
      newErrors.birthplace = 'Birth place is required';
    }

    if (!formData.birth_datetime) {
      newErrors.birth_datetime = 'Birth date and time is required';
    } else {
      // Validate date range (1899-2053)
      const inputDate = new Date(formData.birth_datetime);
      const minDate = new Date('1899-07-29');
      const maxDate = new Date('2053-10-09');
      
      if (inputDate < minDate || inputDate > maxDate) {
        newErrors.birth_datetime = 'Date must be between July 29, 1899 and October 9, 2053';
      }
    }

    // Latitude and longitude are resolved automatically via geocoding

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const geocodeCity = async (query) => {
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=1`;
    const response = await fetch(url, {
      headers: {
        'Accept': 'application/json'
      }
    });
    if (!response.ok) {
      throw new Error(`Geocoding failed: ${response.status}`);
    }
    const results = await response.json();
    if (!Array.isArray(results) || results.length === 0) {
      throw new Error('No matching location found');
    }
    const top = results[0];
    const lat = parseFloat(top.lat);
    const lon = parseFloat(top.lon);
    if (Number.isNaN(lat) || Number.isNaN(lon)) {
      throw new Error('Invalid coordinates from geocoder');
    }
    return { latitude: lat, longitude: lon };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setGeocodeError('');
    
    if (!validateForm()) {
      return;
    }
    
    try {
      setIsGeocoding(true);
      const { latitude, longitude } = await geocodeCity(formData.birthplace);
      const submitData = {
        ...formData,
        latitude,
        longitude
      };
      onSubmit(submitData);
    } catch (err) {
      console.error('Geocoding error:', err);
      setGeocodeError(err.message || 'Failed to find coordinates for the provided city');
    } finally {
      setIsGeocoding(false);
    }
  };


  return (
    <form className="birth-form" onSubmit={handleSubmit}>
      <h2 className="form-title">Enter Birth Details</h2>
      
      <div className="form-group">
        <label htmlFor="name">Full Name *</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter your full name"
          className={errors.name ? 'error' : ''}
        />
        {errors.name && <span className="error-text">{errors.name}</span>}
      </div>


      <div className="form-group">
        <label htmlFor="birthplace">Birth Place *</label>
        <input
          type="text"
          id="birthplace"
          name="birthplace"
          value={formData.birthplace}
          onChange={handleChange}
          placeholder="e.g., Mumbai, Maharashtra, India"
          className={errors.birthplace ? 'error' : ''}
        />
        {errors.birthplace && <span className="error-text">{errors.birthplace}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="birth_datetime">Birth Date & Time *</label>
        <input
          type="datetime-local"
          id="birth_datetime"
          name="birth_datetime"
          value={formData.birth_datetime}
          onChange={handleChange}
          min="1899-07-29T00:00"
          max="2053-10-09T23:59"
          className={errors.birth_datetime ? 'error' : ''}
        />
        {errors.birth_datetime && <span className="error-text">{errors.birth_datetime}</span>}
        <small className="help-text">
          Supported date range: July 29, 1899 - October 9, 2053
        </small>
      </div>

      {geocodeError && (
        <div className="form-group">
          <span className="error-text">{geocodeError}</span>
        </div>
      )}

      <button type="submit" className="submit-button" disabled={isGeocoding}>
        Calculate Vedic Chart
      </button>

      {isGeocoding && (
        <div className="form-group">
          <small className="help-text">Finding coordinates for your city...</small>
        </div>
      )}

      <div className="form-help">
        <p>
          <strong>Time accuracy:</strong> Birth time should be as accurate as possible 
          for precise ascendant calculation.
        </p>
      </div>
    </form>
  );
};

export default BirthDataForm;

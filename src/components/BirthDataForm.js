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

    if (!formData.latitude) {
      newErrors.latitude = 'Latitude is required';
    } else {
      const lat = parseFloat(formData.latitude);
      if (isNaN(lat) || lat < -90 || lat > 90) {
        newErrors.latitude = 'Latitude must be between -90 and 90';
      }
    }

    if (!formData.longitude) {
      newErrors.longitude = 'Longitude is required';
    } else {
      const lng = parseFloat(formData.longitude);
      if (isNaN(lng) || lng < -180 || lng > 180) {
        newErrors.longitude = 'Longitude must be between -180 and 180';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      const submitData = {
        ...formData,
        latitude: parseFloat(formData.latitude),
        longitude: parseFloat(formData.longitude)
      };
      onSubmit(submitData);
    }
  };

  const popularCities = [
    { name: 'New Delhi, India', lat: 28.6139, lng: 77.2090 },
    { name: 'Mumbai, India', lat: 19.0760, lng: 72.8777 },
    { name: 'Bangalore, India', lat: 12.9716, lng: 77.5946 },
    { name: 'Chennai, India', lat: 13.0827, lng: 80.2707 },
    { name: 'Kolkata, India', lat: 22.5726, lng: 88.3639 },
    { name: 'Hyderabad, India', lat: 17.3850, lng: 78.4867 },
    { name: 'Pune, India', lat: 18.5204, lng: 73.8567 },
    { name: 'Ahmedabad, India', lat: 23.0225, lng: 72.5714 }
  ];

  const handleCitySelect = (e) => {
    const selectedCity = popularCities.find(city => city.name === e.target.value);
    if (selectedCity) {
      setFormData(prev => ({
        ...prev,
        birthplace: selectedCity.name,
        latitude: selectedCity.lat.toString(),
        longitude: selectedCity.lng.toString()
      }));
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
        <label htmlFor="citySelect">Quick Select Popular Cities (Optional)</label>
        <select
          id="citySelect"
          onChange={handleCitySelect}
          value=""
        >
          <option value="">-- Select a city to auto-fill coordinates --</option>
          {popularCities.map(city => (
            <option key={city.name} value={city.name}>
              {city.name}
            </option>
          ))}
        </select>
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

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="latitude">Latitude * (°N)</label>
          <input
            type="number"
            id="latitude"
            name="latitude"
            value={formData.latitude}
            onChange={handleChange}
            placeholder="e.g., 19.0760"
            step="0.0001"
            min="-90"
            max="90"
            className={errors.latitude ? 'error' : ''}
          />
          {errors.latitude && <span className="error-text">{errors.latitude}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="longitude">Longitude * (°E)</label>
          <input
            type="number"
            id="longitude"
            name="longitude"
            value={formData.longitude}
            onChange={handleChange}
            placeholder="e.g., 72.8777"
            step="0.0001"
            min="-180"
            max="180"
            className={errors.longitude ? 'error' : ''}
          />
          {errors.longitude && <span className="error-text">{errors.longitude}</span>}
        </div>
      </div>

      <button type="submit" className="submit-button">
        Calculate Vedic Chart
      </button>

      <div className="form-help">
        <p>
          <strong>Need coordinates?</strong> Use the city selector above or search 
          "{formData.birthplace || 'your city'} coordinates" on Google.
        </p>
        <p>
          <strong>Time accuracy:</strong> Birth time should be as accurate as possible 
          for precise ascendant calculation.
        </p>
      </div>
    </form>
  );
};

export default BirthDataForm;

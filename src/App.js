import React, { useState } from 'react';
import BirthDataForm from './components/BirthDataForm';
import ChartDisplay from './components/ChartDisplay';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorMessage from './components/ErrorMessage';
import './App.css';

const API_BASE_URL = 'https://astro-calculations.onrender.com';

function App() {
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFormSubmit = async (birthData) => {
    setLoading(true);
    setError(null);
    setChartData(null);

    try {
      const response = await fetch(`${API_BASE_URL}/vedic-chart`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(birthData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setChartData(data);
    } catch (err) {
      console.error('Error fetching chart data:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleNewChart = () => {
    setChartData(null);
    setError(null);
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>🌟 Vedic Astrology Chart Calculator</h1>
        <p>Generate accurate birth charts using traditional Vedic astrology principles</p>
      </header>

      <main className="app-main">
        {!chartData && !loading && (
          <div className="form-section">
            <BirthDataForm onSubmit={handleFormSubmit} />
          </div>
        )}

        {loading && (
          <div className="loading-section">
            <LoadingSpinner />
          </div>
        )}

        {error && (
          <div className="error-section">
            <ErrorMessage message={error} onRetry={handleNewChart} />
          </div>
        )}

        {chartData && !loading && (
          <div className="chart-section">
            <ChartDisplay data={chartData} onNewChart={handleNewChart} />
          </div>
        )}
      </main>

      <footer className="app-footer">
        <p>
          Powered by traditional Vedic astrology calculations | 
          <span className="date-range"> Supports dates: 1899-2053</span>
        </p>
      </footer>
    </div>
  );
}

export default App;

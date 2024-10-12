import React, { useState, useContext } from 'react';
import axios from 'axios';
import { CityContext } from './cityContext';

const Location = () => {
  const [location, setLocation] = useState({ latitude: '', longitude: '' });
  const { setCity } = useContext(CityContext);

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        setLocation({ latitude, longitude });
        getStateDistrictName(latitude, longitude);
      });
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  };

  const getStateDistrictName = (latitude, longitude) => {
    const apiKey = '74e35d0f002ac2762c193dba8a223c69';
    const url = `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${apiKey}`;

    axios
      .get(url)
      .then((response) => {
        const stateDistrict = response.data.results[0].components.state_district;
        setCity(stateDistrict);
      })
      .catch((error) => {
        console.error('Error fetching the state district name:', error);
      });
  };

  return (
    <div>
      <h1>Find Your Location</h1>
      <button onClick={getLocation}>Get Location</button>
      {location.latitude && location.longitude && (
        <div>
          <h2>Coordinates</h2>
          <p>Latitude: {location.latitude}</p>
          <p>Longitude: {location.longitude}</p>
        </div>
      )}
    </div>
  );
};

export default Location;

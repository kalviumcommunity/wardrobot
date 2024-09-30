import React, { useState, useEffect } from "react";
import axios from 'axios';
import cloud from "./assets/cloud.png";
import sun from "./assets/sun.png";
import snowflake from "./assets/snowflake.png";
import arrow from "./assets/UpwardArrow.png";
import Cookies from 'js-cookie';
import "./climate.css";

function Climate() {
    const [weather, setWeather] = useState(null);
    const [shirt, setShirt] = useState('');
    const [pant, setPant] = useState('');
    const [accessory, setAccessory] = useState('');
    const [occasion, setOccasion] = useState('');
    const [userName, setUserName] = useState('');
    const [outfits, setOutfits] = useState([]);
    const [currentOutfitIndex, setCurrentOutfitIndex] = useState(0);
    const [location, setLocation] = useState({ latitude: '', longitude: '' });
    const [city, setCity] = useState('');
    
    const API_KEY = '74e35d0f002ac2762c193dba8a223c69';

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
        const apiKey = 'fa62c8355b494adf94ace9b592329f47'; 
        const url = `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${apiKey}`;

        axios
            .get(url)
            .then((response) => {
                const stateDistrict = response.data.results[0].components.state_district;
                setCity(stateDistrict);
                console.log(stateDistrict);
            })
            .catch((error) => {
                console.error('Error fetching the state district name:', error);
            });
    };

    useEffect(() => {
        getLocation();
    }, []);

    useEffect(() => {
        const fetchUsername = () => {
            const user = Cookies.get('userName');
            if (user) {
                setUserName(user);
                console.log('Username fetched from cookies:', user);
            } else {
                console.log('User not found in cookies');
            }
        };
        fetchUsername();
    }, []);

    const fetchClimate = async () => {
        try {
            const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`);
            setWeather(response.data);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        if (city) {
            fetchClimate();
        }
    }, [city]);

    const getWeatherIcon = (temp) => {
        if (temp > 30) {
            return sun;
        } else if (temp <= 17) {
            return snowflake;
        } else {
            return cloud;
        }
    };

    const getWeatherDescription = (icon) => {
        if (icon === sun) {
            return 'sun';
        } else if (icon === snowflake) {
            return 'winter';
        } else {
            return 'rainy';
        }
    };

    useEffect(() => {
        if (weather) {
            const temperatureCelsius = Math.round(weather.main.temp - 273.15);
            const weatherIcon = getWeatherIcon(temperatureCelsius);
            const weatherDescription = getWeatherDescription(weatherIcon);
            setOccasion(weatherDescription);
        }
    }, [weather]);

    const fetchOutfit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.get(`http://localhost:3000/api/outfits/${userName}/${occasion}`);
            console.log('Outfit response:', response.data);
            setOutfits(response.data);
            setCurrentOutfitIndex(0);
            if (response.data.length > 0) {
                updateOutfitImages(response.data[0]);
            }
        } catch (err) {
            console.log('Error fetching outfit data:', err);
        }
    };

    const updateOutfitImages = (outfit) => {
        switch (outfit.dressType) {
            case 'Shirt':
                setShirt(outfit.image);
                break;
            case 'Pant':
                setPant(outfit.image);
                break;
            default:
                setAccessory(outfit.image);
                break;
        }
    };

    const handleNext = () => {
        if (currentOutfitIndex < outfits.length - 1) {
            const nextIndex = currentOutfitIndex + 1;
            setCurrentOutfitIndex(nextIndex);
            updateOutfitImages(outfits[nextIndex]);
        }
    };

    const handleBack = () => {
        if (currentOutfitIndex > 0) {
            const prevIndex = currentOutfitIndex - 1;
            setCurrentOutfitIndex(prevIndex);
            updateOutfitImages(outfits[prevIndex]);
        }
    };

    const temperatureCelsius = weather ? Math.round(weather.main.temp - 273.15) : 0;
    const weatherIcon = getWeatherIcon(temperatureCelsius);

    return (
        <div>
            <h1 className="heading">Try out some other <br /> features</h1>
            <div className="climate-texts">
                <h1>Select your outfit <br /> based on </h1>
                <h2>Weather</h2>
                <button className="show-outfit-btn" onClick={fetchOutfit}>Show outfit</button>
                <div className="climate-images">
                    <p className="climate-now" id="climate-text1">{`${temperatureCelsius}°C`}</p>
                    <img src={weatherIcon} alt="weather icon" />
                </div>
            </div>
            <div className="container2">
                <h1>Your wardrobe</h1>
                <div className="climate-info">
                    <p className="climate-now" id="climate-text2">{`${temperatureCelsius}°C`}</p>
                    <img id="climate-img" src={weatherIcon} alt="weather icon" />
                </div>
                <div className="outfit-display">
                    <div className="shirt">
                        <img className='images' src={`http://localhost:3000/images/${shirt}`} alt="Shirt" />
                    </div>
                    <div className="pant">
                        <img className='images' src={`http://localhost:3000/images/${pant}`} alt="Pant" />
                    </div>
                    <div className="accessory">
                        <img className='images' src={`http://localhost:3000/images/${accessory}`} alt="Accessory" />
                    </div>
                </div>
                <div className="buttons2">
                    <button className="back2" onClick={handleBack}>← Back</button>
                    <button className="next2" onClick={handleNext}>Next →</button>
                    <button className="add-new-dress">Add new Dress <img src={arrow} height='10px' alt="" /></button>
                </div>
            </div>
        </div>
    );
}

export default Climate;

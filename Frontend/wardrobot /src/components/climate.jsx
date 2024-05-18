import React, { useState } from "react";
import axios from 'axios';
import cloud from "./assets/cloud.png";
import arrow from "./assets/UpwardArrow.png";
import "./climate.css";

function Climate() {
    const [weather, setWeather] = useState(null);
    const API_KEY = '74e35d0f002ac2762c193dba8a223c69';
    const CITY_NAME = 'Bangalore';

    const fetchClimate = async () => {
        try {
            const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${CITY_NAME}&appid=${API_KEY}`);
            setWeather(response.data);
        } catch (err) {
            console.log(err);
        }
    }
    fetchClimate()
    return (
        <div>
            <h1 className="heading">Try out some other <br /> features</h1>
            <div className="climate-texts">
                <h1>Select your outfit <br /> based on </h1>
                <h2>Weather</h2>
                <button className="show-outfit-btn" >Show outfit</button>
                <div className="climate-images">
                    <p className="climate-now" id="climate-text1">{weather ? `${Math.round(weather.main.temp - 273.15)}°C` : '0°C'}</p>
                    <img src={cloud} alt="" />
                </div>
            </div>
            <div className="container2">
                <h1>Your wardrobe</h1>
                <div className="climate-info" >
                    <p className="climate-now" id="climate-text2">{weather ? `${Math.round(weather.main.temp - 273.15)}°C` : '0°C'}</p>
                    <img id="climate-img" src={cloud} alt="" />
                </div>
                <div className="outfit-display">
                    <div className="shirt">
                        {/* Render shirt component here */}
                    </div>
                    <div className="pant">
                        {/* Render pant component here */}
                    </div>
                    <div className="accessory">
                        {/* Render accessory component here */}
                    </div>
                </div>
                <div className="buttons2">
                    <button className="back2">← Back</button>
                    <button className="next2">Next →</button>
                    <button className="add-new-dress">Add new Dress <img src={arrow} height='10px' alt="" /></button>
                </div>
            </div>
        </div>
    );
}

export default Climate;

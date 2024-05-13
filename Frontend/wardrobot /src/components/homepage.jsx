import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from "./navbars";
import logo from "./assets/logo.png";
import ellipse from "./assets/Ellipse.png";
import shirt3 from "./assets/shirt3.png"
import upwardArrow from "./assets/UpwardArrow.png";
import './setuppage1.css';
import './homepage.css';

function Homepage() {
    const navigate = useNavigate(); 
    const handleClick = () => {
        navigate('/main');
    };

    return (
        <div>
            <img src={logo} alt="" id="logo2" />
            <img src={ellipse} alt="" id='ellipse' />
            <Navbar/>
            <img src={shirt3} alt="" id='shirt3'/>
            <div className='home-texts'>
                <h2 className='welcome-text animate__animated animate__fadeInRight'>Welcome back Abra!</h2>
                <h1 className='select animate__animated animate__fadeInRight'>Let's select <br /> your</h1>
                <h1 className='outfit animate__animated animate__fadeInRight'>Outfit</h1>
                <button className='add-wardobe3' onClick={handleClick} type='submit'>Go to wardrobe <img src={upwardArrow} alt="" id='upward-arrow2' /></button>
            </div>
        </div>
    );
}

export default Homepage;

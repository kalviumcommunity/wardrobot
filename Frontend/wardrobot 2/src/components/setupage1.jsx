import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Navbar from "./navbars";
import logo from "./assets/logo.png";
import ellipse from "./assets/Ellipse.png";
import shirt2 from "./assets/shirt2.png"
import upwardArrow from "./assets/UpwardArrow.png"
import './setuppage1.css';


function Setuppage1() {
    const navigate = useNavigate(); 
    const handleClick =()=>{
        navigate('/setup')
    }
    return (
        <div>
            <img src={logo} alt="" id="logo2" />
            <img src={ellipse} alt="" id='ellipse' />
            <Navbar/>
            <img src={shirt2} alt="" id='shirt2'/>
            <h1 className='user-setup'>User setup</h1>
            <div className='user-form1'>
                <form action="" className='user-forms'>
                    <div>
                        <input className='file-input' type="file"/>
                    </div>
                    <button className='add-wardobe1' type='submit' onClick={handleClick}>Add dress <img src={upwardArrow} alt="" id='upward-arrow' /></button>
                    <p id='drop-text'>or drop an image file</p>
                </form>
            </div>
            <Link id='finish-setup' to='/home'>Finish set up</Link>
        </div>
    );
}

export default Setuppage1;

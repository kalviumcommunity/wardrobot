import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from "./navbars";
import logo from "./assets/logo.png";
import ellipse from "./assets/Ellipse.png";
import './mainpage.css';


function Mainpage() {
    return (
        <div>
            <img src={logo} alt="" id="logo2" />
            <img src={ellipse} alt="" id='ellipse' />
            <Navbar/>
            <div className='container1'>
                <h1>Your Wardrobe</h1>
                <div className='box-texts'>
                    <div  id='what-dress'>
                        <h4>What kind of outfits are <br /> you looking...?</h4>
                        <select>
                        <option value="">wedding</option> 
                        <option value="">shopping</option>
                        <option value="">party</option>
                        <option value="">office</option>
                        <option value="">college</option>
                        </select>
                    </div>
                    <div id='bot-msg'>
                        <h4>I've found your favourite <br /> outfit. Wanna check it out...?</h4>
                        <button id='bot-msg-btn'>Your favourite outfit </button>
                    </div>
                </div>
                <button className='add-new'>Add new dress</button>
                <div className='image-display'>
                    <div id='shirt'>
                        <img src="" alt="" />
                    </div>
                    <div id='pant'>
                        <img src="" alt="" />
                    </div>
                    <div id='acessory'>
                        <img src="" alt="" />
                    </div>
                </div>
                <div className='buttons'>
                    <button id='back'>← Back</button>
                    <button id='next'>Next →</button>
                    <button id='select'>Select this outfit</button>
                </div>
              
            </div>
        </div>
    );
}

export default Mainpage;

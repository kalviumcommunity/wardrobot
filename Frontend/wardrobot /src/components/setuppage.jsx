import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Navbar from "./navbars";
import logo from "./assets/logo.png";
import ellipse from "./assets/Ellipse.png";
import shirt2 from "./assets/shirt2.png"
import './setuppage.css';


function Setuppage() {
    const navigate = useNavigate(); 
    const handleClick =()=>{
        navigate('/setup1'); 
    }
    return (
        <div>
            <img src={logo} alt="" id="logo2" />
            <img src={ellipse} alt="" id='ellipse' />
            <Navbar/>
            <img src={shirt2} alt="" id='shirt2'/>
            <h1 className='user-setup'>User setup</h1>
            <div className='user-form'>
                <form action="" className='user-forms'>
                    <div>
                        <label htmlFor="">Our bot ✨ found it is a t-shirt if not, <br /> please choose:</label>
                        <br />
                        <select>
                            <option value="">t-shirt</option>
                            <option value="">pant</option>
                            <option value="">trouse</option>
                            <option value="">shirt</option>
                        </select>
                    </div>
                    <div className='ocassion'>
                        <label htmlFor="">Choose the occasion that you'll <br /> use this dress:</label>
                        <br />
                        <select>
                            <option value="">Party</option>
                            <option value="">Wedding</option>
                            <option value="">shopping</option>
                            <option value="">others</option>
                        </select>
                    </div>
                    <button className='add-wardobe' type='submit' onClick={handleClick}>Add to wardrobe</button>
                </form>
            </div>

        </div>
    );
}

export default Setuppage;

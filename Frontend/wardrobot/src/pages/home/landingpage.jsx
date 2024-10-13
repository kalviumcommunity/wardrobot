import React, { useState } from 'react';
import Navbar from "../../components/navbars";
import './landingpage.css';
import logo from "../../assets/logo.png";
import downbtn from "../../assets/DownButton.png";
import ellipse from "../../assets/Ellipse.png";
import shirt1 from "../../assets/shit1.png"; // Make sure the filename is correct; should it be 'shirt1.png'?
import { useNavigate } from 'react-router-dom';

function Landingpage() {
    const [moveLeft, setMoveLeft] = useState(false);
    const [moveRight, setMoveRight] = useState(false);
    const [moveFront,setmoveFront] = useState(false);
    const navigate = useNavigate(); 

    const handleClick = () => {
        setMoveLeft(!moveLeft);
        setMoveRight(!moveRight);
        setmoveFront(!moveFront);
        setTimeout(() => {
            navigate('/signup'); 
        }, 700);
    };

    return (
        <div>
            <img src={logo} alt="" id="logo" />
            <img src={ellipse} alt="" id='ellipse' />
            <Navbar />
            <div className="texts">
                <h2 className={`head1 ${moveLeft ? 'move-left' : ''}`}>Your Digital</h2>
                <h1 className={`wardrobe ${moveFront ? 'move-front' : ''}`}>Wardrobe</h1>
                <h2 className={`head2 ${moveRight ? 'move-right' : ''}`}>Assistant</h2>
            </div>
            <p>Welcome to Wardrobot – your personal wardrobe bot! With WardRobot, you can upload photos of your clothing items, creating a digital wardrobe that you can access anytime, anywhere. </p>
            <h3>Let's start setting</h3>
            {/* Use a button instead of a Link for delayed action */}
            <button className="setup-btn" onClick={handleClick}>
                Setup profile <img src={downbtn} alt="" id="down-btn" />
            </button>
            <img src={shirt1} alt="" id="shirt1" />
        </div>
    );
}

export default Landingpage;

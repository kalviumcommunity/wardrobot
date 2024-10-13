import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from "../../components/navbars";
import logo from "../../assets/logo.png";
import ellipse from "../../assets/Ellipse.png";
import shirt3 from "../../assets/shirt3.png";
import upwardArrow from "../../assets/UpwardArrow.png";
import Cookies from 'js-cookie';
import Addimg from '../../assets/Add.png';
import './homepage.css';
import axios from 'axios';

function Homepage() {
    const [username, setUsername] = useState('');
    const navigate = useNavigate(); 

    const fetchUsername = async () => {
        try {
            const useremail = Cookies.get('email');
            console.log("User email from cookies:", useremail); 
            
            if (!useremail) {
                console.error("No email found in cookies");
                return;
            }
            const response = await axios.post(`https://wardrobot-6.onrender.com/users/fetchUserName/`, {
                email: useremail, 
            });
            const user = response.data.userName; 
    
            setUsername(user); 
            console.log("Fetched username:", user); 
            Cookies.set('userName',user)
            
        } catch (error) {
            console.error("Error fetching username:", error); 
        }
    };
    
    useEffect(() => {
        fetchUsername();
    }, []);

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
                <h2 className='welcome-text animate__animated animate__fadeInRight'>Welcome back {username}!</h2>
                <h1 className='select animate__animated animate__fadeInRight'>Let's select <br /> your</h1>
                <h1 className='outfit animate__animated animate__fadeInRight'>Outfit</h1>
                <button className='add-wardobe3' onClick={handleClick} type='submit'>Select your outfit<img src={upwardArrow} alt="" id='upward-arrow2' /></button>
                <button className='add-wardobe4' onClick={() => navigate('/wardrobe')}>Go to Wardrobe <img src={upwardArrow} alt="" id='upward-arrow2' /></button>
                <button className='add-wardobe5' onClick={() => navigate('/setup1')}>Add New Dress <img src={Addimg} alt="" id='upward-arrow2' /></button>
            </div>
        </div>
    );
}

export default Homepage;

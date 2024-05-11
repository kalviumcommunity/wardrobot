import React from 'react';
import './login.css';
import logo from "./assets/logo.png";
import downbtn from "./assets/DownButton.png";
import profile from "./assets/profile.png"
import ellipse from "./assets/Ellipse.png";
import { useNavigate } from 'react-router-dom';
function Login() {
    const navigate = useNavigate()
    const handleBack=()=>{
        navigate('/')
    }
    const handleLogin=()=>{
        navigate('/setup1')
    }
    return (
        <>
            <img src={logo} alt="" id="logo2" />
            <img src={ellipse} alt="" id='ellipse' />
            <img src={profile} alt="" id='profile' />
            <div className='form'>
                <div className="login wrap">
                    <div className="h1">Login</div>
                    <input pattern="^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$" placeholder="Email" id="email" name="email" type="text" />
                    <input placeholder="Password" id="password" name="password" type="password" />
                    <input value="Login" className="btn" type="submit" onClick={handleLogin} />
                    <button className='back-btn' onClick={handleBack}>← Back to home</button>
                </div>
            </div>
            
        </>
    );
}

export default Login;

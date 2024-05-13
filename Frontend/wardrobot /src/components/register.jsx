import React from 'react';
import './register.css';
import logo from "./assets/logo.png";
import downbtn from "./assets/DownButton.png";
import profile from "./assets/profile.png"
import ellipse from "./assets/Ellipse.png";
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
function Register() {
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
                    <div className="h1">Signup</div>
                    <input pattern="^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$" placeholder="Email" id="email" name="email" type="text" />
                    <input placeholder="Password" id="password" name="password" type="password" />
                    <input placeholder="Confirm Password" id="password" name="password" type="password" />
                    <input value="Signup" className="btn" type="submit" onClick={handleLogin} />
                    <div id='login-nav'>
                        <p >Already have an account? <Link to='/login'>Log in</Link></p>
                    </div>
                    <button className='back-btn' onClick={handleBack}>← Back to home</button>
                </div>
            </div>
           
           
        </>
    );
}

export default Register;

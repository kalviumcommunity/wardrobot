import React, { useState } from 'react';
import './register.css';
import axios from 'axios';
import logo from "./assets/logo.png";
import profile from "./assets/profile.png";
import ellipse from "./assets/Ellipse.png";
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Loader from "./Loader.jsx"; 

function Register() {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false); 
    const navigate = useNavigate();

    const handleBack = () => {
        navigate('/');
    }

    const handleLogin = async (e) => {
        if (!userName){
            alert("enter user name")
        } else if (!password){
            alert("enter password")
        }
        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }
        e.preventDefault();
        setLoading(true); 
        try {
            const userData = await axios.post('https://wardrobot-22.onrender.com/users/userupload', { userName, password });
            console.log(userData);
            navigate('/login');
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false); 
        }
    };

    return (
        <>
            <img src={logo} alt="" id="logo2" />
            <img src={ellipse} alt="" id='ellipse' />
            <img src={profile} alt="" id='profile' />
            <div className='form'>
                <div className="login wrap">
                    <div className="h1">Signup</div>
                    <input pattern="^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$" placeholder="Username" id="email" name="email" type="text" onChange={(e) => setUserName(e.target.value)} />
                    <input placeholder="Password" id="password" name="password" type="password" onChange={e => setPassword(e.target.value)} />
                    <input placeholder="Confirm Password" id="password" name="password" type="password" onChange={e => setConfirmPassword(e.target.value)} />
                    <button className="btn" type="submit" onClick={handleLogin} disabled={loading}>
                        {loading ? <Loader /> : "Signup"} 
                    </button>
                    <div id='login-nav'>
                        <p>Already have an account? <Link to='/login'>Log in</Link></p>
                    </div>
                    <button className='back-btn' onClick={handleBack}>← Back to home</button>
                </div>
            </div>
        </>
    );
}

export default Register;

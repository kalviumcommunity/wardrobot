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

    const handleLogin = (e) => {
        e.preventDefault();
        if (validatePassword()) {
            SignUp();
        }
    }

    const SignUp = async () => {
        if (!userName){
            alert("Enter user name");
            return;
        } 
        if (!password){
            alert("Enter password");
            return;
        }
        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }
        setLoading(true); 
        try {
            const userData = await axios.post('http://localhost:3000/users/userupload', { userName, password });
            console.log(userData);
            navigate('/login');
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false); 
        }
    };

    const validatePassword = () => {
        const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#\$%\*])(?=.{8,})/;
        if (!passwordPattern.test(password)) {
            alert('Password must contain at least 8 characters, including at least 1 uppercase letter, 1 lowercase letter, and 1 special character like #, ?, !');
            return false;
        }
        return true;
    }

    return (
        <>
            <img src={logo} alt="" id="logo2" />
            <img src={ellipse} alt="" id='ellipse' />
            <img src={profile} alt="" id='profile' />
            <div className='form'>
                <div className="login wrap">
                    <div className="h1">Signup</div>
                    <input 
                        placeholder="Username" 
                        id="email" 
                        name="email" 
                        type="text" 
                        onChange={(e) => setUserName(e.target.value)} 
                    />
                    <input 
                        placeholder="Password" 
                        id="password" 
                        name="password" 
                        type="password" 
                        onChange={e => setPassword(e.target.value)} 
                    />
                    <input 
                        placeholder="Confirm Password" 
                        id="password" 
                        name="password" 
                        type="password" 
                        onChange={e => setConfirmPassword(e.target.value)} 
                    />
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

import React, { useState } from 'react';
import './register.css';
import axios from 'axios';
import logo from "../../assets/logo.png";
import profile from "../../assets/profile.png";
import ellipse from "../../assets/Ellipse.png";
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Loader from "../../components/Loader.jsx"; 

function Register() {
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false); 
    const navigate = useNavigate();

    const handleBack = () => {
        navigate('/');
    };

    const handleLogin = (event) => {
        event.preventDefault();
        if (validatePassword()) {
            SignUp();
        }
    };

    const validatePassword = () => {
        const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#\$%\*])(?=.{8,})/;
        if (!passwordPattern.test(password)) {
            alert('Password must contain at least 8 characters, including at least 1 uppercase letter, 1 lowercase letter, and 1 special character like #, ?, !');
            return false;
        }
        return true;
    };

    const SignUp = async () => {
        if (!userName) {
            alert("Enter user name");
            return;
        } 
        if (!password) {
            alert("Enter password");
            return;
        }
        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }
        setLoading(true); 
        try {
            const response = await fetch(`http://localhost:3000/users/signup`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    userName: userName,
                    email: email,
                    password: password
                })
            });
            const data = await response.json();
            console.log(data);
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
                    <input 
                        placeholder="Username" 
                        id="username" 
                        name="username" 
                        type="text" 
                        onChange={(e) => setUserName(e.target.value)} 
                    />
                    <input 
                        placeholder="Email" 
                        id="email" 
                        name="email" 
                        type="text" 
                        onChange={(e) => setEmail(e.target.value)} 
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
                        id="confirm-password" 
                        name="confirm-password" 
                        type="password" 
                        onChange={e => setConfirmPassword(e.target.value)} 
                    />
                    <button className="btn" type="submit" onClick={handleLogin} disabled={loading}>
                        {loading ? <Loader /> : "Signup"} 
                    </button>
                    <div id='login-nav'>
                        <p>Already have an account? <Link to='/login'>Log in</Link></p>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Register;

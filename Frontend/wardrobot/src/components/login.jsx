import React, { useState } from 'react';
import './login.css';
import logo from "./assets/logo.png";
import Cookies from 'js-cookie';
import { Link } from 'react-router-dom';
import profile from "./assets/profile.png";
import ellipse from "./assets/Ellipse.png";
import { useNavigate } from 'react-router-dom';
import Loader from "./Loader.jsx";

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false); 
    const navigate = useNavigate();

    const handleBack = () => {
        navigate('/home');
    };

    const removeAllCookies = () => {
        const cookies = Cookies.get();
        for (const cookie in cookies) {
            Cookies.remove(cookie);
        }
    };

    // const handleLogin = (event) => {
    //     event.preventDefault();
    //     signin();
    // };

    // const signin = async () => {
    //     console.log('Sign in function called');
    //     setLoading(true);
    //     try {
    //         const response = await fetch(`http://localhost:3000/users/signin`, {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //             body: JSON.stringify({
    //                 email: email,  // Corrected from userName to email
    //                 password: password,
    //             }),
    //         });
    //         const data = await response.json();
    //         if (response.ok) {
    //             console.log("Login successful");
    //             setEmail('');  // Clear input after successful login
    //             setPassword(''); 
    //             // Navigate or store login data, e.g., setting cookies
    //             navigate('/dashboard');  // Redirect to the dashboard after login
    //         } else {
    //             console.log("Login error");
    //             alert(data.message || "Login failed. Please check your credentials.");
    //         }
    //     } catch (err) {
    //         console.error(err);
    //         alert("An error occurred. Please try again later.");
    //     } finally {
    //         setLoading(false);
    //     }
    // };

    const handleLogin = (event) => {
        event.preventDefault();
        signin();
      };
    
    const signin = async () => {
        console.log('Sing in funtion called');
        try {
          const response = await fetch(`http://localhost:3000/users/signin`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email: email,
              password: password,
            }),
          });
          const data = await response.json();
          if (response.ok) {
            setEmail('');
            setPassword('');
            console.log(data);
          } else {
            console.error(data.error);
          }
        } catch (err) {
          console.error(err);
        }
    };

    return (
        <>
            <img src={logo} alt="" id="logo2" />
            <img src={ellipse} alt="" id='ellipse' />
            <img src={profile} alt="" id='profile' />
            <div className='form'>
                <div className="login wrap">
                    <div className="h1">Login</div>
                    <input 
                        placeholder="Email" 
                        id="email" 
                        name="email" 
                        type="text" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)} 
                    />
                    <input 
                        placeholder="Password" 
                        id="password" 
                        name="password" 
                        type="password" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)} 
                    />
                    <button className="btn" type="submit" onClick={handleLogin} disabled={loading}>
                        {loading ? <Loader /> : "Login"}  {/* Corrected the button text */}
                    </button>
                    <div id='signup-nav'>
                        <p>Don't have an account? <Link to='/signup'>Sign up</Link></p>
                    </div>
                    <button className='back-btn' onClick={handleBack}>← Back to home</button>
                </div>
            </div>
        </>
    );
}

export default Login;

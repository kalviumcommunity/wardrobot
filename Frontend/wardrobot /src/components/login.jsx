import React, { useState } from 'react';
import './login.css';
import logo from "./assets/logo.png";
import Cookies from 'js-cookie';
import axios from 'axios'
import { Link } from 'react-router-dom';
import profile from "./assets/profile.png"
import ellipse from "./assets/Ellipse.png";
import { useNavigate } from 'react-router-dom';
import Loader from "./Loader.jsx";
function Login() {
    const [userName,setUserName]=useState('')
    const [password,setPassword]=useState('')
    const [loading, setLoading] = useState(false); 
    const navigate = useNavigate()
    const handleBack=()=>{
        navigate('/home')
    }
    const removeAllCookies = () => {
        const cookies = Cookies.get();
        for (const cookie in cookies) {
            Cookies.remove(cookie);
        }
    };
    // removeAllCookies()
    const handleLogin = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            const userData = await axios.get(`https://wardrobot-21.onrender.com/users/getuserbyUsername/${userName}`);
            const fetchedPassword=userData.data[0].password;
            console.log(fetchedPassword)
            if (fetchedPassword===password){
                if (userData.status === 201) {
                    Cookies.set('userName', userName, { expires: 7 });
                    console.log(userData);
                    navigate('/home');
                }
            }else{
                alert('incorrect password or username')
            }
        } catch (err) {
            console.log(err);
            alert('incorrect password or username')
        }finally {
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
                    <div className="h1">Login</div>
                    <input pattern="^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$" placeholder="Email" id="email" name="email" type="text" onChange={e=> setUserName(e.target.value)} />
                    <input placeholder="Password" id="password" name="password" type="password" onChange={e=> setPassword(e.target.value)} />
                    <button className="btn" type="submit" onClick={handleLogin} disabled={loading}>
                        {loading ? <Loader /> : "Signup"} 
                    </button>
                    <div id='signup-nav'>
                        <p >Don't have an account? <Link to='/signup'>Sign up</Link></p>
                    </div>
                    <button className='back-btn' onClick={handleBack}>← Back to home</button>
                </div>
            </div>
            
        </>
    );
}

export default Login;

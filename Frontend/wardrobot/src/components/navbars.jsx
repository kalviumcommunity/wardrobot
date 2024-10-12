import "./navbars.css"
import Cookies from 'js-cookie';
import React, { useState,useEffect } from 'react';
import { Link } from "react-router-dom";
const Navbar =()=>{
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    useEffect(() => {
        const cookies = document.cookie;
        setIsLoggedIn(cookies);
      }, []); 
    const removeAllCookies = () => {
        const confirm_logout=window.confirm('Are you sure you want to log out..?')
        if (confirm_logout){
            location.reload()
            const cookies = Cookies.get();
            for (const cookie in cookies) {
                Cookies.remove(cookie);
            }
        }
    };
return(
    
    <div>
        <ul>
            <li> <Link id="link" to='/home'>Home</Link> </li>
            <li><Link id="link" to='/'>About</Link></li>
            <div id="link">
          {isLoggedIn ? (
            <button id='link-btn' className="dynamic-btn" onClick={removeAllCookies}>Log out</button>
          ) : (
            <Link id='link-txt' to='/login'>Sign in</Link>
          )}
        </div>
            <li><Link id="link" to='/signup'>Sign up</Link></li>
        </ul>
    </div>
    )
}
export default Navbar;
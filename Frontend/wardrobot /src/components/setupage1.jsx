import React, { useState,useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from './navbars';
import logo from './assets/logo.png';
import ellipse from './assets/Ellipse.png';
import shirt2 from './assets/shirt2.png';
import upwardArrow from './assets/UpwardArrow.png';
import axios from 'axios';
import Cookies from 'js-cookie';
import './setuppage1.css';

function Setuppage1() {
    const [file, setFile] = useState('');
    const navigate = useNavigate();
    const [userName, setUserName] = useState('');

    useEffect(() => {
        const fetchUsername = () => {
            const user = Cookies.get('userName');
            if (user) {
                setUserName(user);
                console.log('Username fetched from cookies:', user);
            } else {
                console.log('User not found in cookies');
            }
        };
        fetchUsername();
    }, []);
    const handleFileChange = async (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);

        try {
            const update = await axios.post('http://localhost:3000/api/upload', {userName:userName, file: selectedFile });
            console.log('File uploaded successfully:', update);
            navigate('/setup');
        } catch (err) {
            console.error('Error uploading file:', err);
        }
    };

    return (
        <div>
            <img src={logo} alt="Logo" id="logo2" />
            <img src={ellipse} alt="Ellipse" id="ellipse" />
            <Navbar />
            <img src={shirt2} alt="Shirt" id="shirt2" />
            <h1 className="user-setup">User setup</h1>
            <div className="user-form1">
                <form className="user-forms">
                    <div>
                        <input className="file-input" id="inp-file" type="file" onChange={handleFileChange} />
                    </div>
                    <button className="add-wardobe1" type="submit">
                        Add dress <img src={upwardArrow} alt="Upward Arrow" id="upward-arrow" />
                    </button>
                    <p id="drop-text">or drop an image file</p>
                </form>
            </div>
            <Link id="finish-setup" to="/home">Finish set up</Link>
        </div>
    );
}

export default Setuppage1;

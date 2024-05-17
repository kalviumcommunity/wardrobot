import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from './navbars';
import logo from './assets/logo.png';
import ellipse from './assets/Ellipse.png';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Climate from './climate';
import './mainpage.css';
import Cookies from 'js-cookie';

function Mainpage() {
    const [shirt, setShirt] = useState('');
    const [pant, setPant] = useState('');
    const [accessory, setAccessory] = useState('');
    const [occasion, setOccasion] = useState('');
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
    const navigate = useNavigate()
    const addNew=()=>{
        navigate('/setup1')
    }
    const fetchOutfit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.get(`http://localhost:3000/api/outfits/${userName}/${occasion}`);
            console.log('Outfit response:', response);

            response.data.forEach(item => {
                switch (item.dressType) {
                    case 'Shirt':
                        setShirt(item.image);
                        break;
                    case 'Pant':
                        setPant(item.image);
                        break;
                    default:
                        setAccessory(item.image);
                        break;
                }
            });
        } catch (err) {
            console.log('Error fetching outfit data:', err);
        }
    };

    return (
        <div>
            <img src={logo} alt="Logo" id="logo2" />
            <img src={ellipse} alt="Ellipse" id='ellipse' />
            <Navbar />
            <div className='container1'>
                <h1>Your Wardrobe</h1>
                <div className='box-texts'>
                    <div id='what-dress'>
                        <h4>What kind of outfits are <br /> you looking for?</h4>
                        <select onChange={e => setOccasion(e.target.value)} value={occasion}>
                            <option value="">Select occasion</option>
                            <option value="wedding">Wedding</option>
                            <option value="shopping">Shopping</option>
                            <option value="party">Party</option>
                            <option value="office">Office</option>
                            <option value="college">College</option>
                        </select>
                    </div>
                    <div id='bot-msg'>
                        <h4>I've found your favourite <br /> outfit. Wanna check it out?</h4>
                        <button id='bot-msg-btn'>Your favourite outfit</button>
                    </div>
                    <button onClick={fetchOutfit} id='output-btn'>Find outfit</button>
                </div>
                <button className='add-new'onClick={addNew}>Add new dress</button>
                <div className='image-display'>
                    <div id='shirt'>
                        <img id='shirt-img' className='images' src={`http://localhost:3000/images/${shirt}`} alt="Shirt" />
                    </div>
                    <div id='pant'>
                        <img id='pant-img' className='images' src={`http://localhost:3000/images/${pant}`} alt="Pant" />
                    </div>
                    <div id='accessory'>
                        <img id='acess-img' className='images' src={`http://localhost:3000/images/${accessory}`} alt="Accessory" />
                    </div>
                </div>
                <div className='buttons'>
                    <button id='back'>← Back</button>
                    <button id='next'>Next →</button>
                    <button id='select'>Select this outfit</button>
                </div>
            </div>
            <Climate />
        </div>
    );
}

export default Mainpage;

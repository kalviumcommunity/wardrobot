
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from "./navbars";
import logo from "./assets/logo.png";
import ellipse from "./assets/Ellipse.png";
import shirt2 from "./assets/shirt2.png";
import './setuppage.css';

function Setuppage() {
    const navigate = useNavigate(); 
    const [selectedItem, setSelectedItem] = useState('');
    const [selectedOccasion, setSelectedOccasion] = useState('');

    useEffect(() => {
        const animatedItems = document.querySelectorAll('.animated-item');
        const animatedSelects = document.querySelectorAll('.animated-select');

        animatedItems.forEach(item => {
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
        });

        animatedSelects.forEach(select => {
            select.style.opacity = '1';
            select.style.transform = 'translateY(0)';
        });
    }, []);

    const handleClick = () => {
        navigate('/setup1'); 
    }

    const handleItemChange = (event) => {
        setSelectedItem(event.target.value);
    }

    const handleOccasionChange = (event) => {
        setSelectedOccasion(event.target.value);
    }

    return (
        <div>
            <img src={logo} alt="" id="logo2" />
            <img src={ellipse} alt="" id='ellipse' />
            <Navbar/>
            <img src={shirt2} alt="" id='shirt2' className='animated-item'/>
            <h1 className='user-setup animated-item'>User setup</h1>
            <div className='user-form'>
                <form action="" className='user-forms'>
                    <div className='animated-item'>
                        <label htmlFor="">Our bot ✨ found it is a t-shirt if not, <br /> please choose:</label>
                        <br />
                        <select value={selectedItem} onChange={handleItemChange} className='animated-select'>
                            <option value="t-shirt">t-shirt</option>
                            <option value="pant">pant</option>
                            <option value="trouse">trouse</option>
                            <option value="shirt">shirt</option>
                        </select>
                    </div>
                    <div className='ocassion animated-item'>
                        <label htmlFor="">Choose the occasion that you'll <br /> use this dress:</label>
                        <br />
                        <select value={selectedOccasion} onChange={handleOccasionChange} className='animated-select'>
                            <option value="party">Party</option>
                            <option value="wedding">Wedding</option>
                            <option value="shopping">shopping</option>
                            <option value="others">others</option>
                        </select>
                    </div>
                    <button className='add-wardobe animated-item' type='submit' onClick={handleClick}>Add to wardrobe</button>
                </form>
            </div>
        </div>
    );
}

export default Setuppage;

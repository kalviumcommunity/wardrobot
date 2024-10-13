import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from "../../components/navbars";
import logo from "../../assets/logo.png";
import ellipse from "../../assets/Ellipse.png";
import shirt2 from "../../assets/shirt2.png";
import './setuppage.css';

function Setuppage() {
    const navigate = useNavigate();
    const [dressType, setDressType] = useState('');
    const [occasion, setOccasion] = useState('');
    const [occasions, setOccasions] = useState([]);
    const [newOccasion, setNewOccasion] = useState('');

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
        const storedOccasions = JSON.parse(localStorage.getItem('occasions')) || ["Party", "Wedding", "Shopping", "Winter", "Rainy", "Others"];
        setOccasions(storedOccasions);
    }, []);

    const dataId = localStorage.getItem('recent_dataset');
    console.log("Data ID from localStorage:", dataId);

    const handleClick = async (e) => {
        e.preventDefault();

        if (!dataId) {
            console.error("No dataset ID found in localStorage.");
            return;
        }

        try {
            const update = await axios.put(`http://localhost:3000/api/updateoutfit/${dataId}`, {
                dressType: dressType,
                occasion: occasion
            });
            console.log("Dataset updated", update);
            navigate('/setup1');
        } catch (err) {
            console.error("Error updating dataset", err);
        }
    };

    const handleAddOccasion = () => {
        if (newOccasion && !occasions.includes(newOccasion)) {
            const updatedOccasions = [...occasions, newOccasion];
            setOccasions(updatedOccasions);
            setNewOccasion('');
            localStorage.setItem('occasions', JSON.stringify(updatedOccasions));
        }
    };

    const handleDeleteOccasion = (occasionToDelete) => {
        const updatedOccasions = occasions.filter(occ => occ !== occasionToDelete);
        setOccasions(updatedOccasions);
        localStorage.setItem('occasions', JSON.stringify(updatedOccasions));
    };

    return (
        <div>
            <img src={logo} alt="Logo" id="logo2" />
            <img src={ellipse} alt="Ellipse" id="ellipse" />
            <Navbar />
            <img src={shirt2} alt="Shirt" id="shirt2" className="animated-item" />
            <h1 className="user-setup animated-item">User setup</h1>
            <div className="user-form">
                <form className="user-forms">
                    <div className="animated-item">
                        <label>
                            Our bot ✨ found it is a t-shirt if not, <br /> please choose:
                        </label>
                        <br />
                        <select value={dressType} onChange={e => setDressType(e.target.value)} className="animated-select">
                            <option value="">Select Dress Type</option>
                            <option value="Shirt">Shirt</option>
                            <option value="Pant">Pant</option>
                            <option value="Accessory">Accessory</option>
                        </select>
                    </div>
                    <div className="ocassion animated-item">
                        <label>
                            Choose the occasion that you'll <br /> use this dress:
                        </label>
                        <br />
                        <select value={occasion} onChange={e => setOccasion(e.target.value)} className="animated-select">
                            <option value="">Select occasion</option>
                            {occasions.map((occ, index) => (
                                <option key={index} value={occ.toLowerCase()}>{occ}</option>
                            ))}
                        </select>
                        <br />
                        <div className='new-occassion-input'>
                            <input 
                                type="text" 
                                value={newOccasion} 
                                onChange={e => setNewOccasion(e.target.value)} 
                                placeholder="Add new occasion" 
                                className="animated-item"
                            />
                            <button type="button" onClick={handleAddOccasion} className="animated-item">
                                + Add Occasion
                            </button>
                        </div>
                        {/* <div className="animated-item">
                            <h4>Current Occasions:</h4>
                            <ul className='current-occasions'>
                                {occasions.map((occ, index) => (
                                    <li key={index}>
                                        {occ} <button onClick={() => handleDeleteOccasion(occ)}>Delete</button>
                                    </li>
                                ))}
                            </ul>
                        </div> */}
                    </div>
                    <button className="add-wardobe animated-item" type="submit" onClick={handleClick}>
                        Add to wardrobe
                    </button>
                </form>
            </div>
        </div>
    );
}
export default Setuppage;

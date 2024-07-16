// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import Navbar from './navbars';
// import logo from './assets/logo.png';
// import ellipse from './assets/Ellipse.png';
// import axios from 'axios';
// import Climate from './climate';
// import './mainpage.css';
// import Cookies from 'js-cookie';

// function Mainpage() {
//     const [outfits, setOutfits] = useState([]);
//     const [currentOutfitIndex, setCurrentOutfitIndex] = useState(0);
//     const [shirt, setShirt] = useState('');
//     const [pant, setPant] = useState('');
//     const [accessory, setAccessory] = useState('');
//     const [occasion, setOccasion] = useState('');
//     const [userName, setUserName] = useState('');
//     const [occasions, setOccasions] = useState([]);
//     const navigate = useNavigate();

//     useEffect(() => {
//         const fetchUsername = () => {
//             const user = Cookies.get('userName');
//             if (user) {
//                 setUserName(user);
//                 console.log('Username fetched from cookies:', user);
//             } else {
//                 console.log('User not found in cookies');
//             }
//         };
//         fetchUsername();

//         // Load occasions from localStorage or use default occasions if not found
//         const storedOccasions = JSON.parse(localStorage.getItem('occasions')) || ["Party", "Wedding", "Shopping", "Winter", "Rainy", "Others"];
//         setOccasions(storedOccasions);
//     }, []);

//     const fetchOutfit = async (e) => {
//         e.preventDefault();
//         try {
//             const response = await axios.get(`http://localhost:3000/api/outfits/${userName}/${occasion}`);
//             console.log('Outfit response:', response.data);
//             if (response.data.length > 0) {
//                 setOutfits(response.data);
//                 setCurrentOutfitIndex(0);
//                 updateOutfitImages(response.data[0]);
//             } else {
//                 console.log('No outfits found for the selected occasion.');
//                 setOutfits([]);
//                 setShirt('');
//                 setPant('');
//                 setAccessory('');
//             }
//         } catch (err) {
//             console.log('Error fetching outfit data:', err);
//         }
//     };

//     const addNew = () => {
//         navigate('/setup1');
//     };

    // const updateOutfitImages = (outfit) => {
    //     console.log('Updating outfit images:', outfit);
    //     switch (outfit.dressType) {
    //         case 'Shirt':
    //             setShirt(outfit.image || '');
    //             setPant('');
    //             setAccessory('');
    //             break;
    //         case 'Pant':
    //             setPant(outfit.image || '');
    //             setShirt('');
    //             setAccessory('');
    //             break;
    //         default:
    //             setAccessory(outfit.image || '');
    //             setShirt('');
    //             setPant('');
    //             break;
    //     }
    // };

//     const handleNext = () => {
//         if (currentOutfitIndex < outfits.length - 1) {
//             const nextIndex = currentOutfitIndex + 1;
//             setCurrentOutfitIndex(nextIndex);
//             updateOutfitImages(outfits[nextIndex]);
//         }
//     };

//     const handleBack = () => {
//         if (currentOutfitIndex > 0) {
//             const prevIndex = currentOutfitIndex - 1;
//             setCurrentOutfitIndex(prevIndex);
//             updateOutfitImages(outfits[prevIndex]);
//         }
//     };

//     const currentOutfit = outfits[currentOutfitIndex] || {};

//     return (
//         <div>
//             <img src={logo} alt="Logo" id="logo2" />
//             <img src={ellipse} alt="Ellipse" id="ellipse" />
//             <Navbar />
//             <div className='container1'>
//                 <h1>Your Wardrobe</h1>
//                 <div className='box-texts'>
//                     <div id='what-dress'>
//                         <h4>What kind of outfits are <br /> you looking for?</h4>
//                         <select onChange={e => setOccasion(e.target.value)} value={occasion}>
//                             <option value="">Select occasion</option>
//                             {occasions.map((occ, index) => (
//                                 <option key={index} value={occ.toLowerCase()}>{occ}</option>
//                             ))}
//                         </select>
//                     </div>
//                     <div id='bot-msg'>
//                         <h4>I've found your favourite <br /> outfit. Wanna check it out?</h4>
//                         <button id='bot-msg-btn' onClick={fetchOutfit}>Your favourite outfit</button>
//                     </div>
//                     <button onClick={fetchOutfit} id='output-btn'>Find outfit</button>
//                 </div>
//                 <button className='add-new' onClick={addNew}>Add new dress</button>
//                 <div className='image-display'>
//                     <div id='shirt'>
//                         <img id='shirt-img' className='images' src={shirt ? `http://localhost:3000/images/${shirt}` : ''} alt="Shirt" />
//                     </div>
//                     <div id='pant'>
//                         <img id='pant-img' className='images' src={pant ? `http://localhost:3000/images/${pant}` : ''} alt="Pant" />
//                     </div>
//                     <div id='accessory'>
//                         <img id='acess-img' className='images' src={accessory ? `http://localhost:3000/images/${accessory}` : ''} alt="Accessory" />
//                     </div>
//                 </div>
//                 <div className='buttons'>
//                     <button id='back' onClick={handleBack} disabled={currentOutfitIndex === 0}>← Back</button>
//                     <button id='next' onClick={handleNext} disabled={currentOutfitIndex === outfits.length - 1}>Next →</button>
//                     <button id='select'>Select this outfit</button>
//                 </div>
//             </div>
//             <Climate />
//         </div>
//     );
// }

// export default Mainpage;
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './navbars';
import logo from './assets/logo.png';
import ellipse from './assets/Ellipse.png';
import axios from 'axios';
import Climate from './climate';
import './mainpage.css';
import Cookies from 'js-cookie';

function Mainpage() {
    const [outfits, setOutfits] = useState([]);
    const [currentOutfitIndex, setCurrentOutfitIndex] = useState(0);
    const [shirt, setShirt] = useState('');
    const [pant, setPant] = useState('');
    const [accessory, setAccessory] = useState('');
    const [occasion, setOccasion] = useState('');
    const [userName, setUserName] = useState('');
    const [occasions, setOccasions] = useState([]);
    const navigate = useNavigate();

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

        // Load occasions from localStorage or use default occasions if not found
        const storedOccasions = JSON.parse(localStorage.getItem('occasions')) || ["Party", "Wedding", "Shopping", "Winter", "Rainy", "Others"];
        setOccasions(storedOccasions);
    }, []);

    const fetchOutfit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.get(`http://localhost:3000/api/outfits/${userName}/${occasion}`);
            console.log('Outfit response:', response.data);
            if (response.data.length > 0) {
                setOutfits(response.data);
                setCurrentOutfitIndex(0);
                updateOutfitImages(response.data[0]);
            } else {
                console.log('No outfits found for the selected occasion.');
                setOutfits([]);
                setShirt('');
                setPant('');
                setAccessory('');
            }
        } catch (err) {
            console.log('Error fetching outfit data:', err);
        }
    };

    const addNew = () => {
        navigate('/setup1');
    };

    const updateOutfitImages = (outfit) => {
        console.log('Updating outfit images:', outfit);
        switch (outfit.dressType) {
            case 'Shirt':
                setShirt(outfit.image || '');
                setPant('');
                setAccessory('');
                break;
            case 'Pant':
                setPant(outfit.image || '');
                setShirt('');
                setAccessory('');
                break;
            default:
                setAccessory(outfit.image || '');
                setShirt('');
                setPant('');
                break;
        }
    };

    const handleNext = () => {
        if (currentOutfitIndex < outfits.length - 1) {
            const nextIndex = currentOutfitIndex + 1;
            setCurrentOutfitIndex(nextIndex);
            updateOutfitImages(outfits[nextIndex]);
        }
    };

    const handleBack = () => {
        if (currentOutfitIndex > 0) {
            const prevIndex = currentOutfitIndex - 1;
            setCurrentOutfitIndex(prevIndex);
            updateOutfitImages(outfits[prevIndex]);
        }
    };

    const currentOutfit = outfits[currentOutfitIndex] || {};

    return (
        <div>
            <img src={logo} alt="Logo" id="logo2" />
            <img src={ellipse} alt="Ellipse" id="ellipse" />
            <Navbar />
            <div className='container1'>
                <h1>Your Wardrobe</h1>
                <div className='box-texts'>
                    <div id='what-dress'>
                        <h4>What kind of outfits are <br /> you looking for?</h4>
                        <select onChange={e => setOccasion(e.target.value)} value={occasion}>
                            <option value="">Select occasion</option>
                            {occasions.map((occ, index) => (
                                <option key={index} value={occ.toLowerCase()}>{occ}</option>
                            ))}
                        </select>
                    </div>
                    <div id='bot-msg'>
                        <h4>I've found your favourite <br /> outfit. Wanna check it out?</h4>
                        <button id='bot-msg-btn' onClick={fetchOutfit}>Your favourite outfit</button>
                    </div>
                    <button onClick={fetchOutfit} id='output-btn'>Find outfit</button>
                </div>
                <button className='add-new' onClick={addNew}>Add new dress</button>
                <div className='image-display'>
                    <div id='shirt'>
                        <img id='shirt-img' className='images' src={shirt ? `http://localhost:3000/images/${shirt}` : ''} alt="" />
                    </div>
                    <div id='pant'>
                        <img id='pant-img' className='images' src={pant ? `http://localhost:3000/images/${pant}` : ''} alt="" />
                    </div>
                    <div id='accessory'>
                        <img id='acess-img' className='images' src={accessory ? `http://localhost:3000/images/${accessory}` : ''} alt="" />
                    </div>
                </div>
                <div className='buttons'>
                    <button id='back' onClick={handleBack} disabled={currentOutfitIndex === 0}>← Back</button>
                    <button id='next' onClick={handleNext} disabled={currentOutfitIndex === outfits.length - 1}>Next →</button>
                    <button id='select'>Select this outfit</button>
                </div>
            </div>
            <Climate />
        </div>
    );
}

export default Mainpage;

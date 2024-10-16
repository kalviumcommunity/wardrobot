import React, { useEffect, useState } from "react";
import axios from 'axios';
import Navbar from "../../components/navbars";
import logo from "../../assets/logo.png";
import ellipse from "../../assets/Ellipse.png";
import './wardrobe.css';
import Cookies from 'js-cookie';
import heart from "../../assets/Heart.png";
import Delete from "../../assets/Remove.png";
import Fav from "../../assets/Favorite.png"

const Wardrobe = () => {
    const [occasions, setOccasions] = useState([]);
    const [wardrobe, setWardrobe] = useState({});
    const [isFav, setIsFav] = useState({});

    useEffect(() => {
        const storedOccasions = JSON.parse(localStorage.getItem('occasions')) || [];
        const userName = Cookies.get('userName');
        if (userName && storedOccasions.length > 0) {
            const fetchOutfits = async () => {
                const outfitsData = {};
                const favStatus = {};
                const validOccasions = [];
                for (const occasion of storedOccasions) {
                    try {
                        const response = await axios.get(`https://wardrobot-6.onrender.com/api/outfits/${userName}/${occasion.toLowerCase()}`);
                        if (response.data.length > 0) {
                            outfitsData[occasion] = response.data;
                            validOccasions.push(occasion);
                            response.data.forEach(outfit => {
                                favStatus[outfit._id] = outfit.favOutfit || false;
                            });
                        }
                    } catch (err) {
                        console.error(`Error fetching outfits for ${occasion}:`, err);
                    }
                }
                setWardrobe(outfitsData);
                setIsFav(favStatus);
                setOccasions(validOccasions);
            };

            fetchOutfits();
        }
    }, []);

    const deleteOutfit = async (occasion, outfitId) => {
        try {
            await axios.delete(`https://wardrobot-6.onrender.com/api/deleteOutfit/${outfitId}`);
            const updatedWardrobe = { ...wardrobe };
            updatedWardrobe[occasion] = updatedWardrobe[occasion].filter(outfit => outfit._id !== outfitId);
            if (updatedWardrobe[occasion].length === 0) {
                delete updatedWardrobe[occasion];
                setOccasions(occasions.filter(occ => occ !== occasion));
            }
            setWardrobe(updatedWardrobe);
        } catch (err) {
            console.error(`Error deleting outfit:`, err);
        }
    };

    const toggleFavourite = async (e, dataId) => {
        e.preventDefault();

        if (!dataId) {
            console.log("no id");
            return;
        }
        
        try {
            const currentFavStatus = isFav[dataId] || false;
            await axios.put(`https://wardrobot-6.onrender.com/api/updateoutfit/${dataId}`, {
                favOutfit: !currentFavStatus
            });
            setIsFav(prevState => ({ ...prevState, [dataId]: !currentFavStatus }));
            console.log("fav status toggled");
        } catch (err) {
            console.log("error occurred", err);
        }
    };

    return (
        <div>
            <img src={logo} alt="Logo" id="logo2" />
            <img src={ellipse} alt="Ellipse" id="ellipse" />
            <Navbar />
            <div>
                <div className='container2'>
                    <h1>Your Wardrobe</h1>
                    {occasions.map((occasion, index) => (
                        <div key={index}>
                            <h3 className="occasions-wardrobe">{occasion}</h3>
                            <div className="sub-containers">
                                {wardrobe[occasion]?.map((outfit, idx) => (
                                    <div className="images-holder" key={idx}>
                                        <img src={`https://wardrobot-6.onrender.com/images/${outfit.image}`} alt={outfit.dressType} className="outfit-image" />
                                        <button className="deleteoutfitbutton" onClick={() => deleteOutfit(occasion, outfit._id)}>Delete Dress <img src={Delete}  /> </button>
                                        <button 
                                            style={{backgroundColor: isFav[outfit._id] ? 'white' : 'red',color:isFav[outfit._id] ? 'red' : 'white'}}
                                            onClick={(e) => toggleFavourite(e, outfit._id)} 
                                            className="fav-button"
                                            
                                        >
                                            {isFav[outfit._id] ? "Remove Favourites" : "Add to Favourites"}
                                            <img src={isFav[outfit._id]?heart:Fav} className="heart-img" alt="" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Wardrobe;
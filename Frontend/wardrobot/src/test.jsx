// import React, { useState } from 'react';

// function OutfitForm() {
//     const [formData, setFormData] = useState({
//         userName: '',
//         shirts: null,
//         pants: null,
//         accessory: null,
//         occasion: ''
//     });
//     const [imageURLs, setImageURLs] = useState({ shirts: '', pants: '', accessory: '' }); // State to store multiple image URLs

//     const handleChange = (e) => {
//         const { name, files } = e.target;
//         setFormData(prevState => ({
//             ...prevState,
//             [name]: files ? files[0] : undefined // Ensure correct handling of file input
//         }));
//     };

//     const handleSubmit = (e) => {
//         e.preventDefault();

//         const data = new FormData();
//         data.append('userName', formData.userName);
//         data.append('occasion', formData.occasion);
//         if (formData.shirts) data.append('shirts', formData.shirts);
//         if (formData.pants) data.append('pants', formData.pants);
//         if (formData.accessory) data.append('accessory', formData.accessory);

//         fetch('http://localhost:3000/api/post', {
//             method: 'POST',
//             body: data,
//         })
//         .then(response => response.json())
//         .then(data => {
//             console.log('Success:', data);
//             setImageURLs({
//                 shirts: data.filePath.shirts,
//                 pants: data.filePath.pants,
//                 accessory: data.filePath.accessory
//             });
//         })
//         .catch((error) => {
//             console.error('Error:', error);
//         });
//     };

//     return (
//         <form onSubmit={handleSubmit}>
//             <input type="text" name="userName" value={formData.userName} onChange={handleChange} placeholder="User Name" />
//             <input type="file" name="shirts" onChange={handleChange} placeholder="Upload Shirts" />
//             <input type="file" name="pants" onChange={handleChange} placeholder="Upload Pants" />
//             <input type="file" name="accessory" onChange={handleChange} placeholder="Upload Accessory" />
//             <input type="text" name="occasion" value={formData.occasion} onChange={handleChange} placeholder="Occasion" />
//             <button type="submit">Upload Outfit</button>
//             <div>
//                 {imageURLs.shirts && <img src={imageURLs.shirts} alt="Uploaded Shirts" />}
//                 {imageURLs.pants && <img src={imageURLs.pants} alt="Uploaded Pants" />}
//                 {imageURLs.accessory && <img src={imageURLs.accessory} alt="Uploaded Accessory" />}
//             </div>
//         </form>
//     );
// }

// export default OutfitForm;

import React, { useState, useEffect } from 'react';

function OutfitGallery() {
    const [imageURLs, setImageURLs] = useState({ shirts: '', pants: '', accessory: '' });

    useEffect(() => {
        fetchData();
    }, []);

    function fetchData() {
        fetch('http://localhost:3000/api/outfit')
            .then(response => response.json())
            .then(data => {
                console.log('Images fetched:', data);
                setImageURLs({
                    shirts: data[0].shirts,
                    pants: data[0].pants,
                    accessory: data[0].accessory
                });
            })
            .catch(error => {
                console.error('Failed to fetch images:', error);
            });
    }

    return (
        <div>
            <h1>Outfit Gallery</h1>
            <div>
                {imageURLs.shirts && <img src={imageURLs.shirts} alt="Shirts" />}
                {imageURLs.pants && <img src={imageURLs.pants} alt="Pants" />}
                {imageURLs.accessory && <img src={imageURLs.accessory} alt="Accessory" />}
            </div>
        </div>
    );
}

export default OutfitGallery;


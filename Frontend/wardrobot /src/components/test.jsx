import React, { useEffect, useState } from "react";
import axios from 'axios';


function Test() {
    const [userName,setUserName] = useState('');
    const [dress, setDress] = useState('');
    const [occasion, setOccasion] = useState('');
    const [file, setFile] = useState(null);
    const [images, setImages] = useState([]); 

    const uploadFile = () => {
        if (!file || !dress || !occasion) { 
            alert("Please enter a dress type, occasion, and select a file.");
            return;
        }
    
        const formData = new FormData();
        formData.append('file', file);
        formData.append('dressType', dress); 
        formData.append('occasion', occasion); 
        formData.append('userName',userName);
        axios.post("http://localhost:3000/api/upload", formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        .then(res => console.log(res))
        .catch(err => console.log(err));
    };

    useEffect(() => {
        axios.get("http://localhost:3000/api/outfits")
        .then(res => {
            if (res.data && Array.isArray(res.data)) {
                setImages(res.data.map(item => item.image)); 
            }
        })
        .catch(err => console.log(err));
    }, []);

    return (
        <div>
            <input type="text" placeholder="username" onChange={e=>setUserName(e.target.value)}/>
            <input type="text" placeholder="Dress Type" onChange={e => setDress(e.target.value)} />
            <input type="text" placeholder="Occasion" onChange={e => setOccasion(e.target.value)} />
            <input type="file" onChange={e => setFile(e.target.files[0])} />
            <button onClick={uploadFile}>Upload</button>
            <br />
            {images.map((image, index) => (
                <img key={index} src={`http://localhost:3000/images/${image}`} alt={`Dress ${index}`} />
            ))}
        </div>
    );
}
export default Test;
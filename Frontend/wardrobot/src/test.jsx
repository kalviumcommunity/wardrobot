import React from "react";
import { useEffect,useState } from "react";
import axios from 'axios'
import './index.css'
function Test(){
    const [file,setFile]=useState()
    const [image,setImage]=useState()
    const uploadFile =(e)=>{
        const formdata = new FormData()
        formdata.append('file',file)
        axios.post("http://localhost:3000/api/upload",formdata)
        .then(res=>console.log(res))
        .catch(err=>console.log(err))
    }
    useEffect(()=>{
        axios.get("http://localhost:3000/api/getImage")
        .then(res=>setImage(res.data[3].image))
        .catch(err=>console.log(err))
    },[])
    return(
        <div>
            <input type="file" onChange={e=> setFile(e.target.files[0])} />
            <button onClick={uploadFile}>Upload</button>
            <br />
            <img src={`http://localhost:3000/images/${image}`} alt="" />
        </div>
    )
}
export default Test
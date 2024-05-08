import React from "react";
import { useEffect,useState } from "react";
import axios from 'axios'
function Login(){
    const [userName,setUserName]=useState('')
    const [password,setPassword]=useState('')

    const handelSubmit=(e)=>{
        e.preventDefault();
        axios.post('http://localhost:3000/users/userupload',{
            userName:userName,
            password:password
        })
        .then(res => {
            console.log(res)
            const nextYear = new Date();
            nextYear.setFullYear(nextYear.getFullYear() + 1);
            document.cookie = `userName=${userName};expires=${nextYear.toUTCString()};path=/;`;
        })
        .catch(err => console.log(err));
    }
    const deleteCookie =()=>{
        const confirm_logout=window.confirm('Are you sure you want to log out..?')
        if(confirm_logout){
          document.cookie = 'userName=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
      }
    }
    return(
        <div>
            <form onSubmit={handelSubmit}>
                <input type="text" placeholder="username" onChange={e=> setUserName(e.target.value)}/>
                <input type="password" placeholder="password" onChange={e=> setPassword(e.target.value)}/>
                <button type="submit">Submit</button>
            </form>
            <button onClick={deleteCookie}>Logout</button>
        </div>
    )
}
export default Login;
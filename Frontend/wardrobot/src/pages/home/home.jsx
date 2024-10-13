import React, { useEffect, useState } from "react";
import axios from "axios";
import Homepage from "./homepage";
import "./home.css";

function Home() {
    const [users, setUsers] = useState([]);
    const [userDatas, setUserDatas] = useState({}); // Changed to an object to store data for each user

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('https://wardrobot-6.onrender.com/user/userdata');
                setUsers(response.data);
                console.log(response.data);

                // Fetch user data for each user
                response.data.forEach(async (user) => {
                    if (user.userName) {
                        try {
                            const fetchedUserDatas = await axios.get(`https://wardrobot-6.onrender.com/api/username/${user.userName}`);
                            setUserDatas(prevData => ({
                                ...prevData,
                                [user.userName]: fetchedUserDatas.data
                            }));
                            console.log(fetchedUserDatas.data);
                        } catch (error) {
                            console.error(`Error fetching data for user ${user.userName}:`, error);
                        }
                    }
                });
            } catch (err) {
                console.error('Error fetching users:', err);
            }
        };

        fetchUsers();
    }, []);

    return (
        <div>
            <Homepage />
            <div>
                <h1>Checkout your Friends' Outfits</h1>
                <div className="users-grid">
                    {users.map((user) => (
                        <div key={user.userName} className="userDetails">
                            <div className="user-prof-container">
                                {user.profile && (
                                    <img className="user-prof" src={`https://wardrobot-6.onrender.com/images/${user.profile}`} alt="Profile" />
                                )}
                            </div>
                            <h3>{user.userName}</h3>
                            <p>{(userDatas[user.userName] || []).length} Dresses</p>
                            <p>4 Occasions</p>
                            <button>Check Outfits</button>
                        </div>
                    ))}
                </div>
                
            </div>
        </div>
    );
}

export default Home;

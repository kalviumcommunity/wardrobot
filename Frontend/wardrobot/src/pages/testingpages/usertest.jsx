import React, { useState } from 'react';
import axios from 'axios';

function UserTest() {
  const [userName, setUserName] = useState('');
  const [file, setFile] = useState(null);
  const [followers, setFollowers] = useState('');
  const [following, setFollowing] = useState('');
  const [error, setError] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const formData = new FormData();
    formData.append('file', file);
    formData.append('userName', userName);
    formData.append('followers', followers);
    formData.append('following', following);

    try {
      const response = await axios.post('http://localhost:3000/user/uploadUser', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response.data);
    } catch (error) {
      console.error('Error uploading user profile', error);
      setError('Error uploading user profile');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Upload User Profile</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div>
        <label>Username:</label>
        <input type="text" value={userName} onChange={(e) => setUserName(e.target.value)} required />
      </div>
      <div>
        <label>Profile Picture:</label>
        <input type="file" onChange={handleFileChange} required />
      </div>
      <div>
        <label>Followers:</label>
        <input type="text" value={followers} onChange={(e) => setFollowers(e.target.value)} />
      </div>
      <div>
        <label>Following:</label>
        <input type="text" value={following} onChange={(e) => setFollowing(e.target.value)} />
      </div>
      <button type="submit">Upload</button>
    </form>
  );
}

export default UserTest;

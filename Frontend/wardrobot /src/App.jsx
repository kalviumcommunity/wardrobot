import React, { useState, useEffect } from 'react';
import './App.css';
import Landingpage from './components/landingpage';
import Homepage from './components/homepage';
import Setuppage1 from './components/setupage1';
import SetupPage from "./components/setuppage";
import Login from './components/login';
import Register from './components/register';
import Mainpage from './components/mainpage';
import Test from "./components/test";
import { Route, Routes, Navigate } from 'react-router-dom';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const cookies = document.cookie;
    setIsLoggedIn(!!cookies);
  }, []);


  return (
    <Routes>
      <Route
        path="/"
        element={isLoggedIn ? <Homepage /> : <Landingpage />}
      />
      <Route path="/landing" element={<Landingpage />} />
      <Route path="/setup1" element={<Setuppage1 />} />
      <Route path="/setup" element={<SetupPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/home" element={<Homepage />} />
      <Route path="/signup" element={<Register />} />
      <Route path="/main" element={<Mainpage />} />
      <Route path="/test" element={<Test />} />
    </Routes>
  );
}

export default App;

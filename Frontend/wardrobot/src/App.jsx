import React, { useState, useEffect } from 'react';
import Landingpage from './pages/home/landingpage';
import Homepage from './pages/home/homepage';
import Setuppage1 from './pages/setuppages/setupage1';
import SetupPage from "./pages/setuppages/setuppage";
import Login from './pages/Authentication/login';
import Register from './pages/Authentication/register';
import Mainpage from './pages/mainpages/mainpage';
import Test from "./pages/testingpages/test";
import UserTest from "./pages/testingpages/usertest"
import Wardrobe from './pages/mainpages/wardrobe';
import Location from './components/locationfetcher';
import Home from './pages/home/home';
// import Climate from './components/climate';
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
      <Route path="/wardrobe" element={<Wardrobe />} />
      <Route path="/userTest" element={<UserTest />} />
      <Route path="/location" element={<Location />} />
      <Route path="/homev2" element={<Home />} />
    </Routes>
  );
}

export default App;

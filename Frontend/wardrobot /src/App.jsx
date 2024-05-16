import './App.css'
import Landingpage from './components/landingpage'
import Homepage from './components/homepage';
import Setuppage1 from './components/setupage1';
import SetupPage from "./components/setuppage"
import Login from './components/login';
import Register from './components/register';
import Mainpage from './components/mainpage';
import { Route, Routes } from 'react-router-dom';
function App() {
window.onload = function() {
    window.location.href = '/home';
};
return (
    <>
      <Routes>
        <Route path='/' element={<Landingpage/>}></Route>
        <Route path='/setup1' element={<Setuppage1/>}></Route>
        <Route path='/setup' element={<SetupPage/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/home' element={<Homepage/>}></Route>
        <Route path='/signup' element={<Register/>}></Route>
        <Route path='/main' element={<Mainpage/>}></Route>
      </Routes>
    </>
  )
}

export default App

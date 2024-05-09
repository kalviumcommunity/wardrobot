import { useState } from 'react'
import './App.css'
import Test from "./test"
import Login from './login'
import Landingpage from './components/landingpage'
import { Route, Routes } from 'react-router-dom';
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
        
        {/* <Login/>
        <br />
        <br />
        <br />
        <br />
        <br />
        <Test/> */}
      <Routes>
        <Route path='/' element={<Landingpage/>}></Route>
      </Routes>
    </>
  )
}

export default App

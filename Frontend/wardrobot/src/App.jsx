import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Test from "./test"
import Login from './login'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
        <Login/>
        <br />
        <br />
        <br />
        <br />
        <br />
        <Test/>
    </>
  )
}

export default App

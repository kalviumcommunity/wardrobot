import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Test from "./test"
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Test/>
    </>
  )
}

export default App

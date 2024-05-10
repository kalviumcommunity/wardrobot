import './App.css'
import Landingpage from './components/landingpage'
import Setuppage1 from './components/setupage1';
import { Route, Routes } from 'react-router-dom';
function App() {

return (
    <>
      <Routes>
        <Route path='/' element={<Landingpage/>}></Route>
        <Route path='/setup1' element={<Setuppage1/>}></Route>
      </Routes>
    </>
  )
}

export default App

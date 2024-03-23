import { useState } from 'react'
import Register from './Pages/Register/Register'
import LogIn from './Pages/Login/Login'
import {Route,Routes} from "react-router-dom"
import Addjob from './Pages/Addjob/Addjob'
import Jobfinder from './Pages/Jobfinder/Jobfinder'
import ViewDetail from './Pages/ViewDetail/ViewDetail'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Routes>
      <Route path='/register' element={<Register/>}/>
      <Route path="/login" element={<LogIn/>}/>
      <Route path="/addjob" element={<Addjob/>}/>
      <Route path="/job-details/:jobId" element={<ViewDetail/>}/>
      <Route path="/" element={<Jobfinder/>}/>
    </Routes>
    </>
  )
}

export default App

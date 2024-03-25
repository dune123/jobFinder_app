import React,{Component, useState} from 'react'
import { Navigate } from 'react-router-dom'
import Addjob from '../Pages/Addjob/Addjob'

const ProtectedRoute = ({Component}) => {
    const [token]=useState(localStorage.getItem('token'))
    const [isLoggedIn]=useState(!!token)
  return (
    <div>{isLoggedIn?<Component/> :<Navigate to="/login" />}</div>
  )
}

export default ProtectedRoute
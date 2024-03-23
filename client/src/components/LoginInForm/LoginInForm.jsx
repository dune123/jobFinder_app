import React, { useState } from 'react'
import styles from "./LoginInForm.module.css"
import { useNavigate } from "react-router-dom"
import { authuser } from '../../utils/userApi'

const LoginInForm = () => {
  const [formvalues,setFormvalues]=useState({
    email:"",
    password:""
  })
  const navigate=useNavigate(); 

  const handleauth=async ()=>{
    const response=await authuser(formvalues.email,formvalues.password);
    if (response) {
      localStorage.setItem("token", response.token);
      localStorage.setItem("userID",response.userid)
      navigate("/");
  }
  }
  return (
    <div>
    <div className={styles.container}>
        <div className={styles.heading}>
            <h1>Already have an account?</h1>
            <p>Your personal job finder is here</p>
        </div>
        <div className={styles.inputform}>
        <input
            type="text"
            placeholder="email"
            className="inputforstyle"
            onChange={(e)=>{
              setFormvalues((prev)=>{
                return {...prev,email:e.target.value}
              })
            }}
          />
          <input
            type="password"
            placeholder="Password"
            className="inputforstyle"
            onChange={(e)=>{
              setFormvalues((prev)=>{
                return {...prev,password:e.target.value}
              })
            }}
          />
          <button onClick={()=>handleauth()}>
            Log In
        </button>
        </div>
    </div>
    <div className={styles.dontaccount} style={{color:"#C2C2C2"}}>
            Don't have an account?
            <span style={{color:"black",textDecoration:"Underline",cursor:"pointer"}}>  Sign Up</span>
        </div>
    </div> 
  )
}

export default LoginInForm
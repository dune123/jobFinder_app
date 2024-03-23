import React, { useState } from 'react'
import styles from "./Navbar.module.css"
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
  const token=localStorage.getItem("token")
  const Navigate=useNavigate()

  const handlelogout=()=>{
    localStorage.clear();
    Navigate('/login')
  }

  const handleregister=()=>{
    Navigate('/register')
  }
  return (
    <div className={styles.Navbarcontainer}>
        <h1>Jobfinder</h1>

      {
        token?(
            <div className={styles.buttonContainer}>
            <p className={styles.Logout}
            onClick={()=>handlelogout()}>Logout</p>
            <p className={styles.loginmessage}>Hello! Recruiter</p>
            </div>
        ):(
          <div className={styles.buttonContainer}>
            <button className={styles.login} onClick={()=>handlelogout()}>Login</button>
            <button className={styles.register} onClick={()=>handleregister()} >Register</button>
        </div>
        )
      }
    </div>
  )
}

export default Navbar
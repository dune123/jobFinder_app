import React from 'react'
import styles from "./Login.module.css"
import LoginInForm from "../../components/LoginInForm/LoginInForm"

const LogIn = () => {
  return (
    <div className={styles.container}>
        <div className={styles.leftcontainer}>
            <LoginInForm/>
        </div>
        <div className={styles.rightcontainer}>
            <h1>Your Personal Job Finder</h1>
            <img src="./register_page.png"/>
        </div>
    </div>
  )
}

export default LogIn
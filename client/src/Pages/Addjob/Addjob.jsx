import React from 'react'
import styles from "./Addjob.module.css"
import AddjobForm from '../../components/Addjobform/AddjobForm'

const Addjob = () => {
  return (
    <div className={styles.container}>
        <div className={styles.leftcontainer}>
            <AddjobForm/>
        </div>
        <div className={styles.rightcontainer}>
            <h1>Recruiter add job details here</h1>
            <img src="./addjob.png"/>
        </div>
    </div>
  )
}

export default Addjob
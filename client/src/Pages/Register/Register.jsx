import React from "react";
import styles from "./Register.module.css";
import RegisterFrom from "../../components/RegisterForm/RegisterForm";

const Register = () => {
  return (
    <div className={styles.container}>
      <div className={styles.leftcontainer}>
        <RegisterFrom/>
      </div>
      <div className={styles.rightcontainer}>
        <h1>Your Personal Job Finder</h1>
        <img src="./register_page.png"/>
      </div>
    </div>
  );
};

export default Register;

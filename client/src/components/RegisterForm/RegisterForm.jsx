import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./RegisterForm.module.css";
import { adduser } from "../../utils/userApi";

const RegisterFrom = () => {
  const navigate=useNavigate();

  const [formvalues, setFormvalues] = useState({
    name: null,
    email: null,
    mobile: null,
    password: null,
    agreepolicy: false,
  });

  const handlesubmit=(formvalues)=>{
    if(!formvalues.name||!formvalues.email||!formvalues.mobile||!formvalues.password){
      alert("Fields can not be empty")
      return;
    }
    adduser(formvalues)
    setFormvalues({
      name:"",
      email:"",
      mobile:"",
      password:"",
      agreepolicy:null
    })
    navigate("/login")
  }
  
  return (
    <div>
      <div className={styles.container}>
        <div className={styles.heading}>
          <h1>Create an account</h1>
          <p>Your personal job finder is here</p>
        </div>
        <div className={styles.inputform}>
          <input
            type="text"
            placeholder="username"
            className="inputforstyle"
            value={formvalues.name}
            onChange={(e) => {
              setFormvalues((prev) => {
                return { ...prev, name: e.target.value };
              });
            }}
          />
          <input
            type="text"
            placeholder="email"
            className="inputforstyle"
            value={formvalues.email}
            onChange={(e) => {
              setFormvalues((prev) => {
                return { ...prev, email: e.target.value };
              });
            }}
          />
          <input
            type="text"
            placeholder="mobile"
            className="inputforstyle"
            value={formvalues.mobile}
            onChange={(e) => {
              setFormvalues((prev) => {
                return { ...prev, mobile: e.target.value };
              });
            }}
          />
          <input
            type="password"
            placeholder="password"
            className="inputforstyle"
            value={formvalues.password}
            onChange={(e) => {
              setFormvalues((prev) => {
                return { ...prev, password: e.target.value };
              });
            }}
          />
          <div className={styles.checkbox}>
            <label htmlFor="registerbox">
              <input
                id="registerbox"
                type="checkbox"
                name="registerbox"
                className={styles.box}
                checked={formvalues.agreepolicy}
                onChange={(e) => {
                  setFormvalues((prev) => {
                    return { ...prev, agreepolicy: !prev.agreepolicy };
                  });
                }}
              />
              <span>
                By creating an account, I agree to our terms of use and privacy
                policy
              </span>
            </label>
          </div>
          <button onClick={()=>handlesubmit(formvalues)}>create account</button>
          <div style={{ color: "#525252" }}>
            already have an account?
            <a
              style={{
                color: "black",
                cursor: "pointer",
                textDecoration: "underline",
              }}
            >
              {" "}
              Sign in
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterFrom;

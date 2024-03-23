import React from "react";
import styles from "./CompanyData.module.css";
import { MdPeopleAlt } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const CompanyData = ({ item }) => {
  const token = localStorage.getItem("token");
  const navigate=useNavigate()
  return (
    <div className={styles.container}>
      <div className={styles.leftcontainer}>
        <div className={styles.logo}>
          <img src={item.logoUrl} style={{ height: "4vh", width: "6vw" }} />
        </div>
        <div className={styles.logoright}>
          <h1>{item.role}</h1>
          <div className={styles.middle}>
            <p>
              <MdPeopleAlt /> {item.noofpeople}
            </p>
            <p>₹ {item.salary}</p>
            <div className={styles.location}>
              <img src="./indianFlag.png" />
              <p>{item.location}</p>
            </div>
          </div>
          <div className={styles.bottom}>
            <p>{item.remoteOrOffice}</p>
            <p>Full time</p>
          </div>
        </div>
      </div>
      <div className={styles.rightcontainer}>
        <div className={styles.skillsreq}>
          {item.skills.map((data, index) => (
            <div key={index}>{data}</div>
          ))}
        </div>
        {token ? (
          <div className={styles.buttoncontainer}>
            <button className={styles.editjob}>Edit job</button>
            <button className={styles.viewdetail}>View Detail</button>
          </div>
        ) : (
          <button className={styles.viewdetail} onClick={()=>{
            navigate(`/job-details/${item._id}`)
            console.log(`navigate to viewdetail`)
          }}>View Detail</button>
        )}
      </div>
    </div>
  );
};

export default CompanyData;

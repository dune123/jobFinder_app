import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import styles from "./ViewDetail.module.css";
import { useNavigate, useParams } from "react-router-dom";
import {getJobDetailsById} from "../../utils/jobApi"

const ViewDetail = () => {
    let {jobId}=useParams()

    const navigate=useNavigate()
    const [jobDetails,setJobDetails] = useState(null)
    const [isEditable,setIsEditable]=useState(false)

    const fetchJobDetailById=async()=>{
        const response=await getJobDetailsById(jobId);
        setJobDetails(response.data);
    }

    const isAllowedToEdit = () => {
        const token = localStorage.getItem("token");
        if (token) {
            setIsEditable(true);
        }
    };
    useEffect(()=>{
      fetchJobDetailById();
  },[])
  console.log(jobDetails)
  return (
    /*<div className={styles.container}>
     <Navbar />
      <div className={styles.uppersubcontainer}>
        <p>
          WordPress Development work from home job/internship at Adyaka Infosec
          Private Limited
        </p>
      </div>
      <div className={styles.lowersubcontainer}>
        <div className={styles.Topcontainer}>
          <div className={styles.TopcontainerTop}>
            <p>1m ago</p>
            <p>Full Time</p>
            <p>Google</p>
          </div>
          <div className={styles.Topmiddlecontainer}>
            <div className={styles.left}>
              <h1>{jobDetails.role}</h1>
              <div className={styles.location}>Banglore | india</div>
            </div>
            <div className={styles.right}>
              <button>Edit job</button>
            </div>
          </div>
          <div className={styles.topbottomcontainer}>
            <div className={styles.stipend}>
              <p style={{color:"#999999"}}>stipend</p>
              <p>Rs 250000/month</p>
            </div>
            <div className={styles.duration}>
              <p style={{color:"#999999"}}>Duration</p>
              <p>6 months</p>
            </div>
          </div>
        </div>
        <div className={styles.bottomcontainer}>
          <div className={styles.aboutcompany}>
            <p style={{fontWeight:"500"}}>About Company</p>
            <div className={styles.aboutcompanydata} style={{color:"#999999"}}>
              We provide technology-based services to help businesses and
              organizations achieve their goals. We offer a wide range of
              services, including software development, system integration,
              network and security services, cloud computing, and data
              analytics. Our primary focus is on leveraging technology to
              streamline business processes, improve productivity, and enhance
              overall efficiency.
            </div>
          </div>
          <div className={styles.aboutcompany}>
            <p style={{fontWeight:"500"}}>About the job/company</p>
            <div className={styles.aboutthejob}
            style={{color:"#999999"}}>
              We are looking for a responsible PHP/WordPress/Laravel/Shopify
              Developer. He/She will be liable for managing services and
              therefore the interchange of knowledge between the server and the
              users. The candidate's primary focus is going to be the event of
              all server-side logic, definition, and maintenance of the central
              database and ensuring high performance and responsiveness to
              requests from the front end. Selected intern's day-to-day
              responsibilities include: 1. Work on the development of theme
              customization, liquid programming language, and corresponding apps
              2. Implement system integrations that are crucial to our success
              3. Contribute to the development of HTML5/CSS/JavaScript and
              standard web technologies integral to building seamless
              multi-channel experiences 4. Work on speed optimization and making
              a mobile-friendly website
            </div>
          </div>
          <div className={styles.skills}> 
            <p style={{fontWeight:"500"}}>Skills Required</p>
            <div className={styles.skills}>

            </div>
          </div>
          <div className={styles.additonalinfo}></div>
        </div>
      </div>
    </div>*/
    <div>

    </div>
  );
};

export default ViewDetail;

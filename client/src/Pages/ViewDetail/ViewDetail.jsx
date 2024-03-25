import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import styles from "./ViewDetail.module.css";
import { useNavigate, useParams } from "react-router-dom";
import {getJobDetailsById} from "../../utils/jobApi"

const ViewDetail = () => {
    let {jobId}=useParams()

    const navigate = useNavigate();
    const [jobDetails, setJobDetails] = useState({});
    const [isEditable, setIsEditable] = useState(null);
    const [isLoggedIn] = useState(!!localStorage.getItem("token"));

    useEffect(() => {
        fetchJobDetails();
    }, []);

    useEffect(()=>{
      checkforedit()
    },[jobDetails])

    const fetchJobDetails = async () => {
        if (!jobId) return;
        const result = await getJobDetailsById(jobId);
        setJobDetails(result.data);
    };

    const checkforedit=()=>{
        const userid=localStorage.getItem('userID')
        const refuserID=jobDetails.refUserId;
        if(userid==refuserID){
          setIsEditable(true)
        }
        else{
          setIsEditable(false)
        }
    } 
    const handleedit=()=>{
      navigate("/addjob", {
        state: {
            jobDetails: jobDetails,
            edit: true,
        },
    });
    }
    console.log(jobDetails)
  return (
    <div className={styles.container}>
     <Navbar />
      <div className={styles.uppersubcontainer}>
        <p>
          {jobDetails.role}
        </p>
      </div>
      <div className={styles.lowersubcontainer}>
        <div className={styles.Topcontainer}>
          <div className={styles.TopcontainerTop}>
            <p>1m ago</p>
            <p>Full Time</p>
            <p>{jobDetails.companyName}</p>
          </div>
          <div className={styles.Topmiddlecontainer}>
            <div className={styles.left}>
              <h1>{jobDetails.role}</h1>
              <div className={styles.location}>{jobDetails.location} | india</div>
            </div>
            <div className={styles.right}>
            {
              isEditable?(
                <button onClick={()=>handleedit()}>Edit job</button>
              ):(
                null
              )
            }
            </div>
          </div>
          <div className={styles.topbottomcontainer}>
            <div className={styles.stipend}>
              <p style={{color:"#999999"}}>stipend</p>
              <p>Rs {jobDetails.salary}/month</p>
            </div>
            <div className={styles.duration}>
              <p style={{color:"#999999"}}>Duration</p>
              <p>{jobDetails.duration}</p>
            </div>
          </div>
        </div>
        <div className={styles.bottomcontainer}>
          <div className={styles.aboutcompany}>
            <p style={{fontWeight:"500"}}>About Company</p>
            <div className={styles.aboutcompanydata} style={{color:"#999999"}}>
              {jobDetails.descriptionAboutCompany}
            </div>
          </div>
          <div className={styles.aboutcompany}>
            <p style={{fontWeight:"500"}}>About the job/company</p>
            <div className={styles.aboutthejob}
            style={{color:"#999999"}}>
              {
                jobDetails.informationAboutJob
              }
            </div>
          </div>
          <div className={styles.skillsreq}> 
            <p style={{fontWeight:"500"}}>Skills Required</p>
            <div className={styles.skills}>
            {jobDetails.skills && jobDetails.skills.map((skill, index) => (
                <div key={index}>{skill}</div>
            ))}
            </div>
          </div>
          <div className={styles.additonalinfo}></div>
        </div>
      </div>
    </div>
  );
};

export default ViewDetail;

import React, { useState } from "react";
import styles from "./AddjobForm.module.css";
import { addjob ,updateJobById} from "../../utils/jobApi";
import { useNavigate,useLocation } from "react-router-dom";

const AddjobForm = () => {
  const {state}=useLocation()
  const [stateData] = useState(state?.jobDetails);
  const [addjobform,setAddjobform]=useState({
    companyName:""||stateData?.companyName,
    logoUrl:""||stateData?.logoUrl,
    role:""||stateData?.role,
    descriptionAboutCompany:""||stateData?.descriptionAboutCompany,
    informationAboutJob:""||stateData?.informationAboutJob,
    salary:""||stateData?.salary,
    location:""||stateData?.location,
    duration:""||stateData?.duration,
    remoteOrOffice:""||stateData?.remoteOrOffice,
    information:""||stateData?.information,
    skills:stateData?.skills||[],
  })
  console.log(stateData.skills)
  const [currentskills,setCurrentskills] = useState("");
  const navigate=useNavigate()

  const addskills=()=>{
    if(currentskills.trim()!==""){
      setAddjobform((prev)=>({
        ...prev,
        skills:[...prev.skills,currentskills.trim()]
      }))
    }
  }

  const handlekeypress=()=>{
    addskills()
    setCurrentskills("")
  }

  const handlesumbit=(addjobform)=>{
    if(state?.edit){
      const userId=localStorage.getItem('userID')
      updateJobById(stateData?._id, addjobform, userId)
      navigate("/");
      return;
    }
    addjob(addjobform)
    setAddjobform({
      companyName:"",
      logoUrl:"",
      role:"",
      descriptionAboutCompany:"",
      informationAboutJob:"",
      salary:"",
      location:"",
      duration:"",
      remoteOrOffice:"",
      information:"",
      skills:[],
    })
    setCurrentskills("")
    navigate("/")
  }
  const handleRemoveSkill=(index)=>{
    const updatedskills=[...addjobform.skills];
    updatedskills.splice(index,1);
    setAddjobform(prev=>({
      ...prev,
      skills:updatedskills
    })
    )
  }
  return (
    <div className={styles.container}>
      <div className={styles.heading}>
        <h1>Add Job description</h1>
      </div>
      <div className={styles.inputform}>
        <div className={styles.inputform}>
          <div className={styles.inputcontainer}>
          <p>Company Name</p>
          <input
            type="text"
            placeholder="Enter your company name"
            value={addjobform.companyName}
            onChange={(e)=>{
              setAddjobform((prev)=>{
                return {...prev,companyName:e.target.value}
              })
            }}
          />
          </div>
          <div className={styles.inputcontainer}>
          <p>Add logo URL</p>
          <input
            type="text"
            placeholder="Enter the link"
            value={addjobform.logoUrl}
            onChange={(e)=>{
              setAddjobform((prev)=>{
                return {...prev,logoUrl:e.target.value}
              })
            }}
          />
          </div>
          <div className={styles.inputcontainer}>
          <p>job position</p>
          <input
            type="text"
            placeholder="Enter job position"
            value={addjobform.role}
            onChange={(e)=>{
              setAddjobform((prev)=>{
                return {...prev,role:e.target.value}
              })
            }}
          />
          </div>
          <div className={styles.inputcontainer}>
          <p>Monthly salary</p>
          <input
            type="text"
            placeholder="Enter amount in rupee"
            value={addjobform.salary}
            onChange={(e)=>{
              setAddjobform((prev)=>{
                return {...prev,salary:e.target.value}
              })
            }}
          />
          </div>
          <div className={styles.inputcontainer}>
          <p>Remote/office</p>
          <input
            type="text"
            placeholder="remote/office"
            value={addjobform.remoteOrOffice}
            onChange={(e)=>{
              setAddjobform((prev)=>{
                return {...prev,remoteOrOffice:e.target.value}
              })
            }}
          />
          </div>
          <div className={styles.inputcontainer}>
          <p>Location</p>
          <input
            type="text"
            placeholder="Enter the location"
            value={addjobform.location}
            onChange={(e)=>{
              setAddjobform((prev)=>{
                return {...prev,location:e.target.value}
              })
            }}
          />
          </div>
          <div className={styles.inputcontainer}>
          <p>Duration</p>
          <input
            type="text"
            placeholder="for how many months"
            value={addjobform.duration}
            onChange={(e)=>{
              setAddjobform((prev)=>{
                return {...prev,duration:e.target.value}
              })
            }}
          />
          </div>
          <div className={styles.inputcontainer}>
          <p>Job Description</p>
          <textarea
            type="text"
            placeholder="Type your job description"
            value={addjobform.informationAboutJob}
            onChange={(e)=>{
              setAddjobform((prev)=>{
                return {...prev,informationAboutJob:e.target.value}
              })
            }}
          ></textarea>
          </div>
          <div className={styles.inputcontainer}>
          <p>About Company</p>
          <textarea
            type="text"
            placeholder="About your company"
            value={addjobform.descriptionAboutCompany}
            onChange={(e)=>{
              setAddjobform((prev)=>{
                return {...prev,descriptionAboutCompany:e.target.value}
              })
            }}
          ></textarea>
          </div>
          <div className={styles.inputcontainer}>
          <p>Skills Required</p>
          <div className={styles.skillscontainer}>
          <input
            type="text"
            placeholder="Enter skills required"
            value={currentskills}
            onChange={(e)=>{
              setCurrentskills(e.target.value)
            }}
            onKeyPress={(e)=>{
              if(e.key==="Enter"){
                handlekeypress()
              }
            }} 
          />
          <div className={styles.selectedskills}>
            {
              addjobform.skills.length>0&&addjobform.skills.map((element,index)=>(
                <div className={styles.diffskills} key={index}>
                  <div>{element}</div>
                  <span onClick={handleRemoveSkill(index)}>X</span>
                </div>
              ))
            }
          </div>
          </div>
          </div>
          <div className={styles.inputcontainer}>
          <p>Information</p>
          <input
            type="text"
            placeholder="Enter your additional information"
            value={addjobform.information}
            onChange={(e)=>{
              setAddjobform((prev)=>{
                return {...prev,information:e.target.value}
              })
            }}
          />
          </div>
        </div>
      </div>
      <div className={styles.buttons}>
      <button style={{color:"#C2C2C2",background:"white",border:"1px solid #C2C2C2"}}>Cancel</button>
          <button style={{color:"white",background:"#ED5353"}} onClick={()=>handlesumbit(addjobform)}>{state?.edit?"Edit job":"Add Job"}</button>
      </div>
    </div>
  );
};

export default AddjobForm;

import React, { useState } from "react";
import styles from "./JobTypeCard.module.css";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { addSkill, removeSkill } from "../../actions/searchSkillAction"

const JobTypeCard = () => {
  const searchskills=useSelector(state => state.searchSkill.searchSkills);
  const dispatch=useDispatch();
  const [skill, setSkill] = useState(null);
  const token=localStorage.getItem('token');
  const navigate=useNavigate()

  const handleKeyPress = () => {
    if (skill.trim() !== "") {
      dispatch(addSkill(skill.trim()));
      // Return the updated state value from the updater function
      setSkill(""); // Clear the input field after adding the skill
    }
  };

  const handleremoveSkill=(skillToRemove)=>{
    dispatch(removeSkill(skillToRemove))
  }

  const movetoaddjob=()=>{
    navigate('/addjob')
  }


  return (
    <div className={styles.container}>
      <div className={styles.searchBar}>
        <FaSearch className={styles.searchicon} />
        <input type="text" placeholder="Type any Job Title" />
      </div>
      <div className={styles.bottomcontainer}>
        <div className={styles.bottomleft}>
          <div className={styles.addskills}>
            <input
              placeholder="skills"
              value={skill}
              onChange={(e) => setSkill(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  handleKeyPress();
                }
              }}
            />
          </div>
          <div className={styles.skillcontainer}>
            {searchskills&&searchskills.map((skill, index) => (
              <div key={index}>
              <div className={styles.skillname}>{skill} </div>
              <span onClick={()=>handleremoveSkill(skill)}>X</span></div>
            ))}
          </div>
        </div>
        {
            token?(
              <div className={styles.singlebutton}>
                <button onClick={()=>movetoaddjob()}>
                  + Add Job
                </button>
              </div>
            ):(
              <div className={styles.buttons}>
          <button
            style={{
              width: "10vw",
              color: "white",
              backgroundColor: "#ED5353",
              cursor: "pointer",
            }}
          >
            Apply Filter
          </button>
          <button
            style={{
              width: "10vw",
              color: "white",
              backgroundColor: "white",
              color: "#ED5353",
              border: "1px solid #ED5353",
              cursor: "pointer",
            }}
          >
            Clear
          </button>
        </div>
            )
        }
      </div>
    </div>
  );
};

export default JobTypeCard;

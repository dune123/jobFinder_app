import React, { useEffect,useState } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import styles from "./Jobfinder.module.css"
import JobTypeCard from "../../components/JobTypeCard/JobTypeCard"
import CompanyData from '../../components/CompanyData/CompanyData'
import {getAllJobPost} from "../../utils/jobApi"
import { useSelector, useDispatch } from 'react-redux';

const Jobfinder = () => {
  const [data,setData]=useState(null)
  const skills=useSelector(state=>state.searchSkill.searchSkill)
  useEffect(()=>{
    const fetcheddata=async()=>{
      try {
          const result=await getAllJobPost({skills: skills})
          setData(result);
      } catch (error) {
        console.error('Error in fethcing the data',error)
      }
    }
    fetcheddata();
  },[])

  return (
    <div className={styles.container}>
        <Navbar/>
        <div className={styles.Jobtypecontainer}>
        <JobTypeCard/>
        </div>
        <div className={styles.jobsearchcontainer}>
        {
          Array.isArray(data) &&data.map((value,index)=> (
          <div key={index}>
            <CompanyData item={value} />
          </div>))
        }
        </div>
    </div>
  )
}

export default Jobfinder
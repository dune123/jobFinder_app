import axios from "axios"
import { useState } from "react"

const baseurl="http://localhost:3000"

const adduser=(formvalues)=>{
    axios
        .post(`${baseurl}/signin`,formvalues)
        .then(()=>{
            console.log("user created")
        })
        .catch((err)=>{
            console.log(err);
        })
}

const authuser=async(email,password)=>{
    try {
        const url=`${baseurl}/login`
        const response=await axios.post(url,{email,password})
        return response.data
    } catch (error) {
        console.log(error);
    }
}



export {adduser,authuser}
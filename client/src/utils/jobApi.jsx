import axios from "axios"

const baseurl="http://localhost:3000"

const addjob=async(addjobform)=>{
    try {
        const reqUrl = `${baseurl}/create`;
        const token = localStorage.getItem("token");
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        const response = await axios.post(reqUrl, addjobform);
        return response.data;
    } catch (error) {
        console.log(error);
        // toast something went wrong please try after sometime
    }
}

const getAllJobPost=async(filter)=>{
    try {
        const reqUrl=`${baseurl}/all?role=${filter?.role||""}&skills=${filter?.skills||""}`
        const response = await axios.get(reqUrl);
        console.log(response.data)
        return response.data.data;
    } catch (error) {
        console.log(error);
    }
}

export const getJobDetailsById = async (jobId) => {
    try {
        const reqUrl = `${baseurl}/job-details/${jobId}`;
        const response = await axios.get(reqUrl);
        return response.data
    } catch (error) {
        console.log(error);
        // toast something went wrong please try after sometime
    }
};

export const updateJobById=async(jobId,updatedFormData, userId)=>{
    try {
        const reqURL=`${baseurl}/update/${jobId}`
        const token = localStorage.getItem("token");
        axios.defaults.headers.common["Authorization"]=token
        const response=await axios.put(reqURL,{
            ...updatedFormData,
            userId
        })
        return response.data;
    } catch (error) {
        console.log(error);
    }
}
export {addjob,getAllJobPost}
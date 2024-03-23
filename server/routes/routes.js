const {Router}=require('express')
const { adduser, authuser } = require('../controllers/user_controller')
const verifytoken = require('../middleware/verifytoken')
const { createJobPost, updateJobDetailsById, getAllJobs, getJobDetailsById } = require('../controllers/job_controller')


const router=Router()

router.post("/signin",adduser)
router.post("/login",authuser)
router.post("/create",verifytoken, createJobPost);
router.get("/job-details/:jobId", getJobDetailsById);
router.put("/update/:jobId", verifytoken,updateJobDetailsById);
router.get("/all",getAllJobs);


module.exports=router

/*MVC ARCHITECTURE
MODEL VIEW CONTROLLER
View- UI/Presentation

*/


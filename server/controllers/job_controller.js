const Job=require("../models/AddJob");

const createJobPost = async (req, res, next) => {
    try {
        const {
            companyName,
            logoUrl,
            role,
            descriptionAboutCompany,
            informationAboutJob,
            salary,
            location,
            duration,
            remoteOrOffice,
            skills,
            information,
            refUserId,
        } = req.body;

        if (
            !companyName ||
            !logoUrl ||
            !role ||
            !descriptionAboutCompany ||
            !informationAboutJob||
            !salary ||
            !location ||
            !duration ||
            !remoteOrOffice ||
            !skills
        ) {
            return res.status(400).json({
                errorMessage: "Bad request",
            });
        }

        const userId = req.userId;

        const jobDetails = new Job({
            companyName,
            logoUrl,
            role,
            descriptionAboutCompany,
            informationAboutJob,
            salary,
            location,
            duration,
            remoteOrOffice,
            skills,
            information,
            refUserId: userId,
        });

        await jobDetails.save();
        res.json({ message: "Job created successfully" });
    } catch (error) {
        next(error);
    }
};

const getJobDetailsById = async (req, res, next) => {
    try {
        const jobId = req.params.jobId;

        const jobDetails = await Job.findById(jobId);

        if (!jobDetails) {
            return res.status(400).json({
                errorMessage: "Bad request",
            });
        }

        res.json({ data: jobDetails });
    } catch (error) {
        next(error);
    }
};

const updateJobDetailsById = async (req, res, next) => {
    try {
        const jobId = req.params.jobId;
        const userId = req.userId;

        if (!jobId) {
            return res.status(400).json({
                errorMessage: "Bad Request",
            });
        }

        const isJobExists = await Job.findOne({
            _id: jobId,
            refUserId: userId,
        });
        if (!isJobExists) {
            return res.status(400).json({
                errorMessage: "Bad Request",
            });
        }

        const {
            companyName,
            logoUrl,
            role,
            descriptionAboutCompany,
            informationAboutJob,
            salary,
            location,
            duration,
            remoteOrOffice,
            skills,
            information
        } = req.body;

        if (
            !companyName ||
            !logoUrl ||
            !role ||
            !descriptionAboutCompany ||
            !informationAboutJob||
            !salary ||
            !location ||
            !duration ||
            !remoteOrOffice ||
            !information||
            !skills
        ) {
            return res.status(400).json({
                errorMessage: "Bad request",
            });
        }

        await Job.updateOne(
            { _id: jobId, refUserId: userId },
            {
                $set: {
                    companyName,
                    logoUrl,
                    role,
                    descriptionAboutCompany,
                    informationAboutJob,
                    salary,
                    location,
                    duration,
                    remoteOrOffice,
                    skills,
                    information
                },
            }
        );

        res.json({ message: "Job updated successfully" });
    } catch (error) {
        next(error);
    }
};

const getAllJobs = async (req, res, next) => {
    try {
        const role = req.query.role || "";
        const skills = req.query.skills;
        let filteredSkills;
        let filter = {};

        if (skills) {
            filteredSkills = skills.split(",");
            const caseInsensitiveFilteredSkills = filteredSkills.map(
                (element) => new RegExp(element, "i")
            );
            filter = { skills: { $in: caseInsensitiveFilteredSkills } };
        }

        const jobList = await Job.find(
            {
                role: { $regex: role, $options: "i" },
                ...filter,
            },
            { companyName: 1, role: 1 ,descriptionAboutCompany:1,informationAboutJob:1,logoUrl:1,salary:1,location:1,duration:1,remoteOrOffice:1,skills:1,information:1}
        );
        res.json({ data: jobList });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    createJobPost,
    getJobDetailsById,
    updateJobDetailsById,
    getAllJobs,
};

/*const Job=require("../models/AddJob")

const createJobPost = async (req, res, next) => {
    try {
        const {
            companyName,
            logoUrl,
            title,
            description,
            salary,
            location,
            duration,
            remoteOrOffice,
            information,
            skills
        } = req.body;

        if (
            !companyName ||
            !logoUrl ||
            !title ||
            !description ||
            !salary ||
            !location ||
            !duration ||
            !remoteOrOffice ||
            !information||
            !skills
        ) {
            return res.status(400).json({
                errorMessage: "Bad request",
            });
        }

        const userId = req.userId;

        const jobDetails = new Job({
            companyName,
            logoUrl,
            title,
            description,
            salary,
            location,
            duration,
            remoteOrOffice,
            skills,
            refUserId: userId,
            information
        });

        await jobDetails.save();
        res.json({ message: "Job created successfully" });
    } catch (error) {
        next(error);
    }
};

module.exports.getJobDetailsById=async(req,res,next)=>{
    try {
        const jobId=req.params.jobId;

        const jobDetails=await Job.findById(jobId);

        if(!jobDetails){
            return res.status(400).json({
                errorMessage:"Bad request"
            })
        }

        res.json({data:jobDetails})
    } catch (error) {
        next(error)
    }
}

module.exports.updateJobDetailsById=async(req,res,next)=>{
    try {
        const jobId=req.params.jobId
        const userId=req.userId

        if(!jobId){
            return res.status(400).json({
                errorMessage:"Bad Request"
            })
        }

        const isJobExists=await Job.findOne({_id:jobId,refUserId:userId})

        if(!isJobExists){
            res.status(400).json({
                errorMessage:"Bad request"
            })
        }
        const {companyName,logourl,title,description,salary,location,duration,remoteOrOffice,skills,refUserId}=req.body;

        if(!companyName ||
            !logourl ||
            !title ||
            !description ||
            !salary ||
            !location ||
            !duration ||
            !remoteOrOffice ||
            !skills){
                return res.status(400).json({
                    errorMessage:"Bad request"
                })
            }
        
            await Job.updateOne(
                { _id: jobId, refUserId: userId },
                {
                    $set: {
                        companyName,
                        logourl,
                        title,
                        description,
                        salary,
                        location,
                        duration,
                        remoteOrOffice,
                        skills,
                    },
                }
            );
    
            res.json({ message: "Job updated successfully" });

    } catch (error) {
        next(error);
    }
}

module.exports.getAllJobs=async(req,res,next)=>{
    try {
        const title=req.query.title||"";
        const skills=req.query.skills;
        //its better to pass query in , sperated values
        let filteredskills;
        let filter={};
        if(skills){
            filteredskills=skills.split(",")
            filter={skills:{$in:filteredskills}}
        }

        //in operator go to each and every operator and try to match every single value in the Document
        //before in operator getting no result beacuse its try to match the exact array
        //before ...filter after this is filter is empty
        
        const jobList=await Job.find(
            { title:{ $regex: title, $options: "i" },
            ...filter
        },
            {companyName:1,title:1}
        );
        res.json({data:jobList})
    } catch (error) {
        next(error)
    }
}



module.exports={createJobPost}*/
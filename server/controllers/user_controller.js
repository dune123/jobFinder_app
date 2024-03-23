const usermodel = require('../models/UserModel');
const bcrypt = require('bcrypt');
const jwt=require("jsonwebtoken")

module.exports.adduser = async (req, res) => {
    const { name, email, mobile, password } = req.body;

    try {
        // Check if the user with the provided email already exists
        const user = await usermodel.findOne({ email });

        if (user) {
            return res.status(400).json({ error: "User already exists" });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create the new user with the hashed password
        const newUser = await usermodel.create({
            name,
            email,
            mobile,
            password: hashedPassword // Assign the hashed password
        });

        res.status(201).json(newUser);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
};

module.exports.authuser=async(req,res)=>{
    const {email,password}=req.body;

    try{
        const finduser=await usermodel.findOne({email})

        if(!finduser){
            return res
                .status(401)
                .json({ errorMessage: "User doesn't exists" });
        }
        else{
            const passwordMatch=await bcrypt.compare(password,finduser.password);
            if (!passwordMatch) {
                return res
                    .status(401)
                    .json({ errorMessage: "Invalid credentials" });
            }
            const token=jwt.sign(
                { userId: finduser._id, name: finduser.name },
                process.env.JWT_SECRET_KEY,
                { expiresIn: "60h" }
            )
            res.json({
                message: "User logged in",
                token: token,
                userid:finduser._id
            });
        }   
    }
    catch(error){
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
}

//mongodb://localhost:27017/
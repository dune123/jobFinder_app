const express=require('express')
const mongoose=require('mongoose')
const cors=require('cors')
const routes=require('./routes/routes')
require('dotenv').config()
const bodyParser = require("body-parser")


const app=express()
const PORT=process.env.PORT||5000

//body-parser is the alternative 
//express is now have there own body parser
app.use(express.json())
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }));

mongoose
    .connect(process.env.MONGODB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 5000 // Timeout in milliseconds
    })
    .then(() => console.log(`Connected to MongoDB`))
    .catch(err => console.error(`Error connecting to MongoDB: ${err.message}`));

app.use(routes)

app.listen(PORT,()=>console.log(`listening on port ${PORT}`))
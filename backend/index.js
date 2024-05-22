const express = require("express");
const app = express();
const cors = require("cors")
const User = require("./db/user.js")

const dotenv = require("dotenv") 
const port = 8082;
const connectDb = require("./db/mongoose.js")



dotenv.config();


app.use(cors())
app.use(express.json())


app.post("/register",async(req,res)=>{
    try{
        const {username,password} = req.body;
        console.log(req.body)
        const user = new User({username,password})
        await user.save()
        res.status(201).json({message: "User is Registered"})
    }catch(error){
        res.status(500).json({message: "Registeration Failed"})
    }
})

app.post("/login",async(req,res)=>{
    try{
        const {username,password} = req.body;
        const user = await User.findOne({username})
        if(!user){
            return res.status(400).json({error: "Invalid Credentials"})
        }
        if(user.password !== password){
            return res.status(401).json({error: "Invalid Credentials"})
        }
        res.status(200).json({message: "login Successful"})
    }catch{
        return res.status(500).json({error: "ILogin Failed"})
    
    }
})




connectDb()
.then(()=>{
    app.listen(port,()=>{
        console.log(`Server is Running on Port:${port}`)
    })
    
})
.catch((error)=>{
    console.log("MONGO db connection failed !!! ", err)
})
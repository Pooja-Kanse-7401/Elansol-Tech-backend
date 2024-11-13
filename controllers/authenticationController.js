const User = require("../models/user");
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')

dotenv.config();

exports.register = async (req, res) => {
    try{
        const {username, email, password} = req.body;
        const newUser = new User({username, email, password})
        await newUser.save();
        res.status(201).json({message: "user Registered successfully"})
    }catch(error){
        res.status(400).json({error : error.message})
    }
}

// Login

exports.login = async (req, res) => {
    try{
        const {email, password} = req.body;
        console.log("Email in login api : ", email)
        console.log("password in login api : ", password)
        const user = await User.findOne({email})
       
        if(!user){
            res.status(404).json({error : "User not found"})
        }
        
        const isMatch = await user.comparePassword(password);
        if(!isMatch){
            res.status(400).json({error : "Invalid Credentials"})
        }

        const token = jwt.sign({id:user._id}, process.env.JWT_SECRET, {expiresIn : '1h'})
        res.json({token})
        
    }catch(error){
        res.status(400).json({error : error.message})
    }
} 
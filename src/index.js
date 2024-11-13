const dotenv = require("dotenv")
const express = require("express");
const { dbConnect } = require("../config/dbConnections");
const router = require('../routes/userRoutes')
const cors = require('cors')
const User = require('../models/user')

const app = express();

dotenv.config();


dbConnect();


app.use(cors());
const port = process.env.PORT || 4000;
const hostname = process.env.HOST_NAME || 'localhost'

app.get('/api/v1/users', (req, res) => {
    res.status(200).json({message : "Hello from Application"})
})

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Routers
app.use('/api/v1', router)

// Post
app.post('/api/v1/users', async(req, res) => {
    try{
        const {username, email, password} = req.body;
        const userData = new User( {
            username,
            email,
            password,
        })
        await userData.save();
        res.status(201).json(userData)
         
    }catch(error){
        res.status(400).json({error: error.message})
    }
})


app.listen(port, () => {
    console.log(`http://${hostname}:${port}`)
}) 
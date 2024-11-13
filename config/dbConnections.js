const mongoose = require('mongoose');

function dbConnect(){
    // console.log("DB Connection: ",process.env.DB_URL)
    try{
        // mongoose.connect(process.env.DB_URL)
        mongoose.connect('mongodb+srv://kansepd:v8VglrVN3p9dOz8F@cluster0.j1oco.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
        .then(() => {
            console.log("Great Connected To DB")
        })
    }catch(error){
        console.log('Failed to Connect', error)
    }
}

module.exports = {dbConnect}
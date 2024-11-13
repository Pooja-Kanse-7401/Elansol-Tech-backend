const User = require("../models/user");


exports.createUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const userData = new User({
            username,
            email,
            password,
        });
        await userData.save();
        res.status(201).json(userData);

    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

exports.getUser = async (req, res) => {
    try {
        const findUser = await User.findById(req.params.id)
        if(!findUser){
            res.status(404).json({error : "User not found"})
        }
        res.json(findUser)
    }
    catch (error) {
        res.status(400).json({error : error.message})
    }
}

exports.updateUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const updateData = {
            username,
            email,
            password,
            updatedAt: Date.now()
        };

        const userData = await User.findByIdAndUpdate(req.params.id, updateData, { new : true })
        if(!userData) {
            res.status(404).json({error : "User not found"})
        }
        res.json(userData);
    } catch (error) {
        res.status(400).json({error : error.message})
    }
}

exports.deleteUser = async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        if(!deletedUser){
            res.status(404).json({error : "User not found"})
        }
        res.json({message : "User Deleted"})
    }
    catch (error) {
        res.status(400).json({error : error.message})
    }
}
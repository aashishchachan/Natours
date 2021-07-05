const User = require('./../models/userModel');
const jwt = require('jsonwebtoken')

exports.signup = async (req, res, next) => {
    try {
        const newUser = await User.create(req.body);
        
        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
            expiresIn: 1800
        })
        
        res.status(201).json({
            status: 'success',
            token, 
            data: {
                newUser
            }
        });
    } catch (err) {
        console.log(err);
        res.status(404).json({
            status: "failed",
            messsage: err,
        });
    }
}
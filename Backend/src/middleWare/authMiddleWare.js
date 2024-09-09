const jwt  = require('jsonwebtoken');
const dotenv = require('dotenv');
const User = require('../models/UserModel.js');

dotenv.config();

const authMiddleware = (req, res ,next) => {
    console.log('checkToken', req.headers.token)
    const token = req.headers.token.split(' ')[1]
    jwt.verify(token, process.env.ACCESS_TOKEN, function (err,user){
        if (err) {
            return res.status(404).json({
                message: "The authenication",
                status: "ERROR"
            })
        }
        const { payload } = user 
        if (payload.isAdmin) {
            next()
        } else {
            return res.status(404).json({
                message: "Is not an admin",
                status: "ERROR"
            })
        }
    });
}
const authUserMiddleware = async(req, res ,next) => {
    console.log('checkToken', req.headers.token)
    const token = req.headers.token.split(' ')[1]
    jwt.verify(token, process.env.ACCESS_TOKEN, function (err,user){
        console.log('User:', user)
        if (err) {
            return res.status(404).json({
                message: "The authenication",
                status: "ERROR"
            })
        }
        const { payload } = user 
        console.log('User Data:',payload)
        if (payload) {
            next()
        } else {
            return res.status(404).json({
                message: "Is not user",
                status: "ERROR"
            
             })
            }
        
    });
}

module.exports = {
    authMiddleware,
    authUserMiddleware
}

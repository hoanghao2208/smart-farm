const UserService = require('../services/UserService')
const jwt = require('jsonwebtoken');
const uploadCloud = require('../config/cloudinary.config.js');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const User = require('../models/UserModel.js')

const uploadCloudAvatar = uploadCloud.single('image');

const sendResetCodeEmail = async (req, res) => {
    try {
      const { email } = req.body;
      const user = await UserService.getUserByEmail(email);
        console.log('User Controller',user)
      if (!user) {
        return res.status(404).json({ message: 'User not found', status: 'ERROR' });
      }
      const resetCode = Math.floor(100000 + Math.random() * 900000);
      await UserService.updateResetCodeByEmail(user._id, resetCode);

      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'leminhkhiem110@gmail.com',
          pass: 'wkxgltoqapfvftcj',
        },
      });
      const mailOptions = {
        from: 'leminhkhiem110@gmail.com',
        to: email,
        subject: 'Password Reset Code',
        text: `Your password reset code is: ${resetCode}`,
      };
      await transporter.sendMail(mailOptions);
  
      return res.status(200).json({ message: 'Password reset code sent successfully', status: 'OK' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Failed to send password reset code', status: 'ERROR' });
    }
  };
  

const createUser = async (req,res) => {
    try {
        const { name, email,phone,date, password, confirmPassword} = req.body
        const regexPhoneNumber = /(84|0[3|5|7|8|9])+([0-9]{8})\b/g;
        const reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
        const regexDate = /^\d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])$/;

        const isCheckEmail = reg.test(email)
        const isCheckPhone = regexPhoneNumber.test(phone)
        const isCheckDate = regexDate.test(date)
        if (!name || !email || !password || !confirmPassword || !phone)
        {
            return res.status(200).json({
                status: 401,
                message: 'The input is required'
            })
        } else if(!isCheckEmail) {
            return res.status(200).json({
                status: 401,
                message: 'The email is invalid'
            })
        } else if(password !== confirmPassword){
            return res.status(200).json({
                status: 401,
                message: 'The input is equal confirmPassword'
            })
        } else if (!isCheckPhone) {
            return res.status(200).json({
                status: 401,
                message: "The phone is invalid"
            })
        } else if (!isCheckEmail) {
            return res.status(200).json({
                status: 401,
                message: "The phone is invalid"
            })
        }
         const response = await UserService.createUser(req.body)
         return res.status(200).json(response)
    } catch(e){
        console.log(e)
        return res.status(404).json({
            message: e
        })
    }
}
const loginUser = async (req,res) => {
    try {
        const {email, password} = req.body
        const reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
        const isCheckEmail = reg.test(email)
        if ( !email || !password)
        {
            return res.status(200).json({
                status: 401,
                message: 'The input is required'
            })
        } else if(!isCheckEmail) {
            return res.status(200).json({
                status: 401,
                message: 'The input is email'
            })
        } 
        // else if(password !== confirmPassword){
        //     return res.status(200).json({
        //         status: 'ERR',
        //         message: 'The input is equal confirmPassword'
        //     })
        // }
         const response = await UserService.loginUser(req.body)
         return res.status(200).json(response)
    } catch(e){
        return res.status(404).json({
            message: e
        })
    }
}
const updateUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const data = req.body
        console.log(userId)
        if (!userId) {
            return res.status(200).json({
                status: 'error',
                message: 'The user is required'
            })
        }
        const response = await UserService.updateUser(userId,data)
        return res.status(200).json(response)
    } catch(e){
        console.log(e)
        return res.status(404).json({
            message: e
        })
    }
}
const deleteUser = async (req, res) => {
    try {
        const userId = req.params.id;
        if (!userId) {
            return res.status(200).json({
                status: 'error',
                message: 'The user is required'
            })
        }
        const response = await UserService.deleteUser(userId)
        return res.status(200).json(response)
    } catch(e){
        return res.status(404).json({
            message: e
        })
    }
}
const getAllUser = async (req, res) => {
    try {
        const response = await UserService.getAllUser()
        return res.status(200).json(response)
    } catch(e){
        return res.status(404).json({
            message: e
        })
    }
}
const getDetailUser = async (req, res) => {
    try {
        
        const userId = req.params.id;
        if (!userId) {
            return res.status(200).json({
                status: 'error',
                message: 'The user is required'
            })
        }
        const response = await UserService.getDetailUser(userId)
        return res.status(200).json(response)
    } catch(e){
        return res.status(404).json({
            message: e
        })
    }
}
const getInformation = async (req,res) => {
    try {
        const token = req.headers.token.split(' ')[1]
        let payload;
        jwt.verify(token, process.env.ACCESS_TOKEN, function (err,user){
            if (err) {
                return res.status(404).json({
                    message: "The authenication",
                    status: "ERROR"
                })
            }
             payload  = user 
        });
        console.log('ID is',payload.payload.id)
        const response = await UserService.getInformation(payload.payload.id)
        return res.status(200).json(response)
    } catch(e) {
        return res.status(404).json({
            message: e
        })
    }
}

const updateAvatar = async (req, res) => {

    try {
    
      const token = await req.headers.token.split(' ')[1]
        let payload;
        jwt.verify(token, process.env.ACCESS_TOKEN, function (err,user){
            if (err) {
                return res.status(404).json({
                    message: "The authenication",
                    status: "ERROR"
                })
            }
             payload  = user 
        });
        console.log('ID is',payload.payload.id)

      const avatarURL = req.file.path;
      console.log('Avatar URL', avatarURL)

      const response = await UserService.uploadAvatar(payload.payload.id, avatarURL);
  
      return res.status(200).json(response);
    } catch (e) {
        console.log(e)
        return res.status(404).json({
            message: e
        })
    }
  };
  const checkValidCode = async (req, res) => {
    try {
        const { email, passwordResetCode} = req.body;
        if (!email || !passwordResetCode) {
            return res.status(401).json({
                message: "Not a valid input"
            })
        }
        const user = await User.findOne({ email });
        const response = await UserService.checkValidCode(email,passwordResetCode)
        console.log("Response is", response)
        if (response) {
            return res.status(200).json({
                status: 200,
                message: "Code is matching"  ,
                data: user  
            })
        }
        else {
            return res.status(401).json({
                status: 401,
                message: "Code not matching"
            })
        }
    } catch (e) {
        return res.status(404).json({
            status: 401,
            message: e
        })
    }
  }
  const resetPasswordCode = async (req, res) => {
    try {
        const id = req.params.id;
        const { password, rePassword, newPassword } = req.body;
        if (!id) {
            return res.status(401).json({
                status: 401,
                message: "Please enter user"
            })
        }
        if (!password || !rePassword || !newPassword) {
            return res.status(401).json({
                status: 401,
                message: "Input is required"
            })
        }
        if (password != rePassword) {
            return res.status(401).json({
                status: 401,
                message: "Password and RePassword not match"
            })
        }
        const response = await UserService.resetPasswordCode(id,password, newPassword)
        return res.status(200).json(response)
    } catch (error) {
      console.error(error);
      return res.status(401).json({ message: 'Failed to reset password', status: 'ERROR' });
    }
};

module.exports = {
    createUser,
    loginUser,
    updateUser,
    deleteUser,
    getAllUser,
    getDetailUser,
    getInformation,
    uploadCloudAvatar, 
    updateAvatar,
    sendResetCodeEmail,
    resetPasswordCode,
    checkValidCode
}
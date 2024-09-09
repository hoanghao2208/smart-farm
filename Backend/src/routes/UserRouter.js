const express = require('express');
const router = express.Router();
const userController = require('../controllers/UserController');
const { authMiddleware, authUserMiddleware } = require('../middleWare/authMiddleWare');
const multer = require('multer');
const path = require('path');
const uploader = require('../config/cloudinary.config')

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'Images'); // Đảm bảo bạn đã tạo thư mục 'uploads/avatars' trước
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage: storage });

router.post('/signup', userController.createUser)
router.post('/login', userController.loginUser)

router.get('/get-info', userController.getInformation)
router.put('/update-user/:id', userController.updateUser)
router.delete('/delete-user/:id', userController.deleteUser)
router.get('/getAll', userController.getAllUser)
router.get('/get-detail/:id', userController.getDetailUser)
router.post('/upload-avatar',uploader.single('images'), userController.updateAvatar);

router.post('/send-reset-code', userController.sendResetCodeEmail);
router.post('/checkValidCode',userController.checkValidCode)
router.post('/reset-password-code/:id', userController.resetPasswordCode);

module.exports = router;
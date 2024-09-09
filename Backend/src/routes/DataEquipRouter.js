const express = require('express');
const router = express.Router();
const dataEquipmentController = require('../controllers/dataEquipmentController');
const { authMiddleware } = require('../middleWare/authMiddleWare');

router.post('/post/:id', dataEquipmentController.createDataEquipment);
router.get('/getAll/:id', dataEquipmentController.getDataEquipment);
router.put('/update-equipment/:id', dataEquipmentController.updateEquipment);
router.delete('/delete-equipment/:id', dataEquipmentController.deleteEquipment);
router.get('/getDetail/:id', dataEquipmentController.getDetailEquipment);
module.exports = router;
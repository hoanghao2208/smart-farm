const express = require('express');
const router = express.Router();
const controlEquipmentController = require('../controllers/controlEquipmentController');
const { authMiddleware } = require('../middleWare/authMiddleWare');

router.post('/post/:id', controlEquipmentController.createControlEquipment);
router.get('/getAll/:id', controlEquipmentController.getControlEquipment);
router.put('/update-equipment/:id', controlEquipmentController.updateEquipment);
router.delete('/delete-equipment/:id', controlEquipmentController.deleteEquipment);
router.get('/getDetail/:id', controlEquipmentController.getDetailEquipment);

module.exports = router;
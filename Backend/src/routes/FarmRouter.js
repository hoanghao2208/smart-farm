const express = require('express');
const router = express.Router();
const farmController = require('../controllers/FarmController');
const { authMiddleware } = require('../middleWare/authMiddleWare');

router.get('/getFarm/:id',authMiddleware,farmController.getFarm)
router.get('/getAllFarm',authMiddleware,farmController.getAllFarm)
router.post('/createFarm',authMiddleware, farmController.createFarm)
router.put('/updateFarm/:id',authMiddleware, farmController.updateFarm)
router.delete('/deleteFarm/:id',authMiddleware, farmController.deleteFarm)

router.get('/adakey',farmController.getAdakey)


module.exports = router;

const FarmService = require('../services/FarmService');

const getFarm = async (req, res) => {
    try {
        
        const farmId = req.params.id;
        if (!farmId) {
            return res.status(200).json({
                status: 'error',
                message: 'The Farm is required'
            })
        }
        const response = await FarmService.getFarm(farmId)
        return res.status(200).json(response)
    } catch(e){
        console.log(e)
        return res.status(404).json({
            message: e
        })
    }
}

const createFarm = async (req, res) => {
    try {
        const {name, address } = req.body;
        if (!name  || !address) {
            return res.status(200).json({
                status: 401,
                message: 'The input is required'
            })
        }
        const response = await FarmService.createFarm(req.body)
        return res.status(200).json(response)
    } catch (e) {
        console.log(e)
        return res.status(404).json({
            message: e
        })
    }
}
const updateFarm = async (req, res) => {
    try {
        const farmId = req.params.id;
        const data = req.body
        if (!farmId) {
            return res.status(200).json({
                status: 401,
                message: 'Providing Farm ID'
            })
        }
        const response = await FarmService.updateFarm(farmId,data)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

const deleteFarm = async (req, res) => {
    try {
        const farmId = req.params.id;
        const data = req.body
        if (!farmId) {
            return res.status(200).json({
                status: 401,
                message: 'Providing Farm ID'
            })
        }
        const response = await FarmService.deleteFarm(farmId)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}
const getAllFarm = async (req, res) => {
    try {
        const response = await FarmService.getAllFarm()
        return res.status(200).json(response)
    } catch(e){
        return res.status(404).json({
            message: e
        })
    }
}

const getAdakey = async (req,res) => {
    try {
        const response = await FarmService.getAdakey()
        return res.status(200).json(response)
    } catch(e){
        return res.status(404).json({
            message: e
        })
    }
}

module.exports = {
    getFarm ,
    createFarm ,
    updateFarm ,
    deleteFarm ,
    getAllFarm ,
    getAdakey
}

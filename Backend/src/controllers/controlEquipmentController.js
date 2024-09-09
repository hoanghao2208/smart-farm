const ControlEquipmentService = require('../services/controlEquipmentService');

const createControlEquipment = async (req, res) => {
    try {
        const  farmId  = req.params.id;
        const {  name,key,typ,status } = req.body;

        if (!farmId || !key || !name || !typ || !status) {
            return res.status(400).json({
                status: 400,
                message: 'Invalid input data',
            });
        }

        const response = await ControlEquipmentService.createControlEquipment(farmId, {
            name,
            key,
            typ,
            status
        });

        return res.status(response.status).json(response);
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'Internal Server Error',
            error: error.message,
        });
    }
};

const getControlEquipment = async (req, res) => {
    try {
        console.log("bbbb")
        const farmId = req.params.id;
        console.log(farmId)

        if (!farmId) {
            return res.status(400).json({
                status: 400,
                message: 'Invalid farmId',
            });
        }

        const response = await ControlEquipmentService.getControlEquipment(farmId);
        return res.status(response.status).json(response);
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'Internal Server Error',
            error: error.message,
        });
    }
};
const getAll = async (req, res) => {
    try {
        const response = await ControlEquipmentService.getAll();
        return res.status(response.status).json(response);
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'Internal Server Error',
            error: error.message,
        });
    }
};
const updateEquipment = async (req, res) => {
    try {
        const equipId = req.params.id;
        const data = req.body
        console.log(equipId)
        if (!equipId) {
            return res.status(200).json({
                status: 'error',
                message: 'The equipment is required'
            })
        }
        const response = await ControlEquipmentService.updateEquipment(equipId,data)
        return res.status(200).json(response)
    } catch(e){
        console.log(e)
        return res.status(404).json({
            message: e
        })
    }
}
const deleteEquipment = async (req, res) => {
    try {
        const equipId = req.params.id;
        if (!equipId) {
            return res.status(200).json({
                status: 'error',
                message: 'The user is required'
            })
        }
        const response = await ControlEquipmentService.deleteEquipment(equipId)
        return res.status(200).json(response)
    } catch(e){
        return res.status(404).json({
            message: e
        })
    }
}

const getDetailEquipment = async (req, res) => {
    try {
        
        const equipId = req.params.id;
        if (!equipId) {
            return res.status(200).json({
                status: 'error',
                message: 'The equipment is required'
            })
        }
        const response = await ControlEquipmentService.getDetailEquipment(equipId)
        return res.status(200).json(response)
    } catch(e){
        return res.status(404).json({
            message: e
        })
    }
}

module.exports = {
    createControlEquipment,
    getControlEquipment,
    updateEquipment,
    deleteEquipment,
    getDetailEquipment,
    getAll
};

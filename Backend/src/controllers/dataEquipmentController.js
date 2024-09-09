const DataEquipmentService = require('../services/dataEquipmentService');

const createDataEquipment = async (req, res) => {
    try {
        const  farmId  = req.params.id;
        const {  name,key,typ, min, min_action, max, max_action, auto } = req.body;

        if (!farmId || !key || !name || !typ || !min || !max || !auto) {
            return res.status(400).json({
                status: 400,
                message: 'Invalid input data',
            });
        }

        const response = await DataEquipmentService.createDataEquipment(farmId, {
            name,
            key,
            typ,
            min,
            min_action,
            max,
            max_action,
            auto,
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

const getAll = async (req, res) => {
    try {
        const response = await DataEquipmentService.getAll();
        return res.status(response.status).json(response);
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'Internal Server Error',
            error: error.message,
        });
    }
};
const getDataEquipment = async (req, res) => {
    try {
        console.log("aaa")
        const farmId = req.params.id;

        if (!farmId) {
            return res.status(400).json({
                status: 400,
                message: 'Invalid farmId',
            });
        }

        const response = await DataEquipmentService.getDataEquipment(farmId);
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
        const response = await DataEquipmentService.updateEquipment(equipId,data)
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
        const response = await DataEquipmentService.deleteEquipment(equipId)
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
        const response = await DataEquipmentService.getDetailEquipment(equipId)
        return res.status(200).json(response)
    } catch(e){
        return res.status(404).json({
            message: e
        })
    }
}

module.exports = {
    createDataEquipment,
    getDataEquipment,
    updateEquipment,
    deleteEquipment,
    getDetailEquipment,
    getAll
};

const ControlEquipment = require('../models/ControlEquipModel.js');

const createControlEquipment = (farmId, newControlEquipment) => {
    return new Promise(async (resolve, reject) => {
        const {  name,key, typ, status } = newControlEquipment;

        try {
            const createdControlEquipment = await ControlEquipment.create({
                name,
                key,
                typ,
                farmId,
                status
            });

            resolve({
                status: 200,
                message: 'Create Data Equipment successfully',
                data: createdControlEquipment,
            });
        } catch (e) {
            console.log(e)
            reject(e);
        }
    });
};

const getControlEquipment = (farmId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const controlEquipment = await ControlEquipment.find({ farmId });

            resolve({
                status: 200,
                message: 'Get Data Equipment from Farm successfully',
                data: controlEquipment,
            });
        } catch (error) {
            reject(error);
        }
    });
};

const getAll = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const dataEquipment = await ControlEquipment.find();

            resolve({
                status: 200,
                message: 'Get Data Equipment from Farm successfully',
                data: dataEquipment,
            });
        } catch (error) {
            reject(error);
        }
    });
};
const updateEquipment = (id,data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkEquipment = await ControlEquipment.findOne({
                _id: id
            })
            // console.log(checkUser)
            if (checkEquipment === null)  {
                resolve({
                status: 'OK',
                message: 'The equipment is not defined'
                })
            }
            const update = await ControlEquipment.findByIdAndUpdate(id,data, {new: true})
            console.log(update)
            resolve({
                status: 'OK',
                message: 'Update Successfully',
                data: update
            })  
        } catch(e) {
            reject(e);
        }
    })
}

const deleteEquipment = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkEquipment = await ControlEquipment.findOne({
                _id: id
            })
            if (checkEquipment === null)  {
                resolve({
                status: 'OK',
                message: 'The equipment is not defined'
                })
            }
            await ControlEquipment.findByIdAndDelete(id)
            resolve({
                status: 'OK',
                message: 'Delete Equipment Successfully',
            })  
        } catch(e) {
            reject(e);
        }
    })
}

const getDetailEquipment = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkEquipment = await ControlEquipment.findOne({
                _id: id
            })
            // console.log(checkUser)
            if (checkEquipment === null)  {
                resolve({
                status: 'OK',
                message: 'The Equipment is not defined'
                })
            }
            resolve({
                status: 'OK',
                message: 'Get Detail Equipment Successfully',
                data: checkEquipment
            })  
        } catch(e) {
            reject(e);
        }
    })
}

module.exports = {
    createControlEquipment,
    getControlEquipment,
    updateEquipment,
    deleteEquipment,
    getDetailEquipment,
    getAll
}
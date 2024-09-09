const DataEquipment = require('../models/DataEquipModel.js');

const createDataEquipment = (farmId, newDataEquipment) => {
    return new Promise(async (resolve, reject) => {
        const {  name,key, typ, min, min_action, max, max_action, auto } = newDataEquipment;

        try {
            const createdDataEquipment = await DataEquipment.create({
                name,
                key,
                typ,
                farmId,
                min,
                min_action,
                max,
                max_action,
                auto,
            });

            resolve({
                status: 200,
                message: 'Create Data Equipment successfully',
                data: createdDataEquipment,
            });
        } catch (e) {
            reject(e);
        }
    });
};

const getDataEquipment = (farmId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const dataEquipment = await DataEquipment.find({ farmId });

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
const getAll = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const dataEquipment = await DataEquipment.find();

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
            const checkEquipment = await DataEquipment.findOne({
                _id: id
            })
            // console.log(checkUser)
            if (checkEquipment === null)  {
                resolve({
                status: 'OK',
                message: 'The equipment is not defined'
                })
            }
            const updateEquipment = await DataEquipment.findByIdAndUpdate(id,data, {new: true})
            console.log(updateEquipment)
            resolve({
                status: 'OK',
                message: 'Update Successfully',
                data: updateEquipment
            })  
        } catch(e) {
            reject(e);
        }
    })
}

const deleteEquipment = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkEquipment = await DataEquipment.findOne({
                _id: id
            })
            if (checkEquipment === null)  {
                resolve({
                status: 'OK',
                message: 'The equipment is not defined'
                })
            }
            await DataEquipment.findByIdAndDelete(id)
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
            const checkEquipment = await DataEquipment.findOne({
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
    createDataEquipment,
    getDataEquipment,
    updateEquipment,
    deleteEquipment,
    getDetailEquipment,
    getAll
}
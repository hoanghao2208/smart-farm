const Farm = require('../models/FarmModel')
const bcrypt = require('bcrypt')

const getFarm = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkFarm = await Farm.findOne({
                _id: id
            })
            // console.log(checkUser)
            if (checkFarm === null)  {
                resolve({
                status: '401',
                message: 'The Farm is not undefined'
                })
            }
            resolve({
                status: '200',
                message: 'Get Detail Farm SUCCESS',
                data: checkFarm
            })  
        } catch(e) {
            reject(e);
        }
    })
}

const createFarm = (newFarm) => {
    return new Promise(async (resolve, reject) => {
        const {name,address,description} = newFarm
        try {
            const checkFarm = await Farm.findOne({
                name: name,
            })
            if (checkFarm) {
                resolve({
                    status: '401',
                    message: 'Farm has been created',
                })
            }

            const createFarm = await Farm.create({
                name,
                address,
                image : 'https://cdn.tgdd.vn/Files/2021/11/10/1396965/10-nong-trai-da-lat-rong-lon-bao-la-voi-nhieu-goc-song-ao-tuyet-dep-202111101135102355.jpg',
                description
            })
            if (createFarm) {
                resolve({
                    status: '200',
                    message: 'Create Farm successfully',
                    data: createFarm
                })
            }
        } catch(e) {
            reject(e);
        }
    })
}

const updateFarm = (id,data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkFarm = await Farm.findOne({
                _id: id
            })
            if (checkFarm === null)  {
                resolve({
                status: 401,
                message: 'The Farm is undefined'
                })
            }
            const updateFarm = await Farm.findByIdAndUpdate(id,data, {new: true})
            resolve({
                status: 200,
                message: 'Update Successfully',
                data: updateFarm
            })  
        } catch(e) {
            reject(e);
        }
    })
}

const deleteFarm = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkFarm = await Farm.findOne({
                _id: id
            })
            if (checkFarm === null)  {
                resolve({
                status: 401,
                message: 'The Farm is undefined'
                })
            }
            const updateFarm = await Farm.findByIdAndDelete(id)
            resolve({
                status: 200,
                message: 'Delete Successfully'
            })  
        } catch(e) {
            reject(e);
        }
    })
}

const getAllFarm = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const allFarm = await Farm.find()
            resolve({
                status: '200',
                message: 'Get All Farm Successfully',
                data: allFarm
            })  
        } catch(e) {
            reject(e);
        }
    })
}

const getAdakey = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const adakey = process.env.ACTIVE_KEY
            console.log("Adafruit Key", adakey)
            resolve({
                status: '200',
                message: 'Get Adafruit Key Successfully',
                data: adakey
            })  
        } catch(e) {
            reject(e);
        }
    })
}

module.exports = {
    getFarm,
    createFarm,
    updateFarm,
    deleteFarm,
    getAllFarm,
    getAdakey
}

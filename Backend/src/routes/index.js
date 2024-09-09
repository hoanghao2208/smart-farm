const UserRouter = require('./UserRouter')
const FarmRouter = require('./FarmRouter')
const DataEquipRouter = require('./DataEquipRouter')
const ControlEquipmentRouter = require('./ControlEquipRouter')

const routes = (app) => {

    app.use('/api/user', UserRouter)
    app.use('/api/admin',FarmRouter)
    app.use('/api/dequip',DataEquipRouter)
    app.use('/api/cequip',ControlEquipmentRouter)
}

module.exports = routes;
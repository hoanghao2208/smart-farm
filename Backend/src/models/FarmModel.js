const mongoose = require('mongoose')

const farmSchema = new mongoose.Schema(
    {
        name: {type: String, required: true, unique: true},
        address: {type: String, required:true},
        image: {type: String, required: true},
        description: {type: String},
        equipment: [{ type: mongoose.Schema.Types.ObjectId, ref: 'dataEquipment' ,unique: false}],
    },
    {
        timestamps: true,
    }
);

const Farm = mongoose.model('Farm', farmSchema);
module.exports = Farm;
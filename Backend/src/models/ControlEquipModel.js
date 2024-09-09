const mongoose = require('mongoose');

const controlEquipSchema = new mongoose.Schema(
    {
        key: { type: 'string', required: true},
        name:  { type: String},
        farmId: { type: mongoose.Schema.Types.ObjectId, required: true },
        typ: {type: String, required: true},
        status: { type: String, required: true },
    },
    {
        timestamps: true,
    }
);

const ControlEquipment = mongoose.model('ControlEquipment', controlEquipSchema);
module.exports = ControlEquipment;

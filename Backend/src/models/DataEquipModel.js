const mongoose = require('mongoose');

const dataEquipSchema = new mongoose.Schema(
    {
        key: { type: 'string', required: true},
        name:  { type: String},
        farmId: { type: mongoose.Schema.Types.ObjectId, required: true },
        typ: {type: String, required: true},
        min: { type: Number, required: true, default: 0 },
        min_action: { type: Number, required: true},
        max: { type: Number, required: true, default: 0 },
        max_action: { type: Number, required: true },
        auto: { type: Number, required: true, default: 0 },
    },
    {
        timestamps: true,
    }
);

const DataEquipment = mongoose.model('DataEquipment', dataEquipSchema);
module.exports = DataEquipment;

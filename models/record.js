const mongoose = require("mongoose"),
    {Schema} = mongoose,
    Patient = require("./patient"),
    Provider = require("./provider"),

    recordSchema = new Schema({
        date: {
            type: Date,
            required: true
        },
        status: {
            type: String,
            default: 'Unarrived'
        },
        problem: {
            type: String
        },
        hpi: {
            type: String,
            default: ''
        },
        ros: {
            type: String,
            default: ''
        },
        exam: {
            type: String,
            default: ''
        },
        assessment: {
            type: String,
            default: ''
        },
        diagnoses: [{
            type: String
        }],
        complete: {
            type: Boolean,
            default: false
        },
        patient: {type: Schema.Types.ObjectId, ref: Patient, required: true},
        provider: {type: Schema.Types.ObjectId, ref: Provider, required: true}
    },
    {
        timeStamps: true,
    });

recordSchema.index({ patient: 1, date: 1 }, { unique: true });
recordSchema.index({ provider: 1, date: 1 }, { unique: true });

module.exports = mongoose.model("Record", recordSchema);
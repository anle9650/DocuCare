const mongoose = require("mongoose"),
    {Schema} = mongoose,

    patientSchema = new Schema({
        name: {
            first: {
                type: String,
                required: true,
            },
            last: {
                type: String,
                required: true,
            }
        },
        gender: {
            type: String,
            required: true
        },
        DOB: {
            type: Date,
            required: true
        },
        diagnoses: [{
            type: String
        }]
    },
    {
        timeStamps: true,
    });

patientSchema.virtual("fullName")
    .get(function() {
        return `${this.name.first} ${this.name.last}`;
    });

module.exports = mongoose.model("Patient", patientSchema);
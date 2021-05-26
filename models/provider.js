const mongoose = require("mongoose"),
    {Schema} = mongoose,

    providerSchema = new Schema({
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
        username: {
            type: String,
            required: true
        }
    },
    {
        timeStamps: true,
    });

providerSchema.virtual("fullName")
    .get(function() {
        return `${this.name.first} ${this.name.last}`;
    });

module.exports = mongoose.model("Provider", providerSchema);
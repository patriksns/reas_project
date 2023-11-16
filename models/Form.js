const mongoose = require("mongoose");

const formSchema = new mongoose.Schema(
    {
    FullName: {
        type: String,
        require: true,
        min: 5,
        max: 255,
        },

    Phone: {
        type: String,
        require: true,
        min: 9,
        max: 20,
        },

    EstateType: {
        type: String,
        require: true,
        },

    Email: {
        type: String,
        require: true,
        max: 40,
        },

    Region: {
        type: String,
        require: true,
        },

    District: {
        type: String,
        require: true,
        },
    },
    {
    timestamps: true,
    }
);

module.exports = mongoose.model("Form", formSchema);

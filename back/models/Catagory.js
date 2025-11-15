const mongoose = require('mongoose');

const { Schema } = mongoose;

const CatagorySchema = new Schema(
    {
        name: {
            type: String,
            required: [true, 'Category name is required'],
            trim: true,
            unique: true,
            maxlength: 100,
        }
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Catagory', CatagorySchema);
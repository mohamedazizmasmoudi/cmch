const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const sellerSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            trim: true,
            required: true,
            maxlength: 32,
            unique: true
        },role: {
            type: Number,
            default: 0
        }
        ,jobcategory: {
            type: ObjectId,
            ref: "Category",
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Seller", sellerSchema);

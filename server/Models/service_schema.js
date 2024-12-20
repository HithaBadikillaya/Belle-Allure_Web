const mongoose = require('mongoose')
const { Schema } = mongoose
const serviceSchema = new Schema({
    title: { type: String },
    picture: { type: String },
    price: { type: String },
    description: { type: String },
    status: { type: String }
})
module.exports = mongoose.model("services",serviceSchema)
const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    status: {
        type: Number,
        default: true
    }
})

categorySchema.statics.getAll = async function() {
    return await this.find({}).sort({$natural: -1})
}
module.exports = mongoose.model('category', categorySchema)
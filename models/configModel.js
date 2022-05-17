const mongoose = require('mongoose');

const configSchema = new mongoose.Schema({
    config: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('config', configSchema)
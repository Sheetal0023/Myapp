const mongoose = require('mongoose')

const amcSchema = new mongoose.Schema({
    description: {
        type: String,
        require: true,
    },
    price: {
        type: Number,
        require: true,
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
    }
})

const companyAmcs = mongoose.model('companyAmcs', amcSchema)

module.exports = companyAmcs
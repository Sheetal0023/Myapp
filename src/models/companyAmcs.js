const mongoose = require('mongoose')

const amcSchema = new mongoose.Schema({
    device_cetagory: {
        type: String,
        require: true,
    },
    device_name: {
        type: String,
        require: true,
    },
    contract_period: {
        type: String,
        require: true,
    },
    maintenance_period_one: {
        type: String,
        require: true,
    },
    maintenance_period_two: {
        type: String,
        require: true,
    },
    maintenance_period_three: {
        type: String,
        require: true,
    },
    maintenance_period_four: {
        type: String,
        require: true,
    },

    charges_one: {
        type: String,
        require: true,
    },
    charges_two: {
        type: String,
        require: true,
    },
    charges_three: {
        type: String,
        require: true,
    },
    charges_four: {
        type: String,
        require: true,
    },
    contract_charges: {
        type: String,
        require: true,
    },
    userInformation: [{
        useremail: {
            type: String,
            require: true,
        }
    }],
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
    }
})

const companyAmcs = mongoose.model('companyAmcs', amcSchema)

module.exports = companyAmcs
const mongoose = require('mongoose')

const amcSchema = new mongoose.Schema({
<<<<<<< HEAD
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
=======
    description: {
        type: String,
        require: true,
    },
    price: {
        type: Number,
        require: true,
    },
>>>>>>> 505ecf3f0c3fc9ece6350c30af13c3d9610b7e3c
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
    }
})

const companyAmcs = mongoose.model('companyAmcs', amcSchema)

module.exports = companyAmcs
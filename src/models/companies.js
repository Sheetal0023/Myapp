const mongoose = require('mongoose')

const companySchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
    }, 
    password: {
        type: String,
        require: true,
    },
    businessName: {
        type: String,
        require: true,
    }, 
    mobileNumber: {
        type: Number,
        require: true,
    },
    email: {
        type: String,
        require: true,
    },
    address:[{
        streetOne: {
            type: String,
            require: true,
        }, 
        streetTwo: {
            type: String,
            require: true,
        }, 
        city: {
            type: String,
            require: true,
        },
        region: {
            type: String,
            require: true,
        },
        zip: {
            type: Number,
            require: true,
        },
        countryCode: {
            type: String,
            require: true,
        }

}], 
 
    otp: {
        type: Number,
    }, 
    forgotToken: {
        type: String,
    }, 
    tokens:[{
        token: {
            type: String,
            require: true,
        }
    }]


})

const companyUser = mongoose.model('companyUser', companySchema)

module.exports = companyUser
const mongoose = require('mongoose')
<<<<<<< HEAD
const jwt = require('jsonwebtoken')
=======
>>>>>>> 505ecf3f0c3fc9ece6350c30af13c3d9610b7e3c

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

<<<<<<< HEAD
companySchema.methods.generateForgotAuthToken = async function() {
    const compuser = this 
    const comptoken = jwt.sign({_id:compuser.id.toString()}, process.env.COMP_FORGOT_AUTH_KEY)
    compuser.forgotToken = comptoken
    await compuser.save()
    return comptoken
}

companySchema.methods.generateAuthToken = async function() {
    const compuser = this
    const comptoken = jwt.sign({_id:compuser.id.toString()}, process.env.COMP_AUTH_KEY) //thisiscompanyauthkey
    compuser.tokens = compuser.tokens.concat({token: comptoken})
    await compuser.save()
    return comptoken
}

=======
>>>>>>> 505ecf3f0c3fc9ece6350c30af13c3d9610b7e3c
const companyUser = mongoose.model('companyUser', companySchema)

module.exports = companyUser
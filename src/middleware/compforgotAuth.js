const jwt = require('jsonwebtoken')
const companies = require('../models/companies')

const compforgotAuth = async(req, res, next) => {
    try{
        const comptoken = req.cookies.compforgot
        if(!comptoken) {
            throw new Error('You are not Authorized')
        }
        const decode = jwt.verify(comptoken.toString(), process.env.COMP_FORGOT_AUTH_KEY) //'thisishiddenkey'
        const compuser = await companies.findById({_id:decode._id})
        if(!compuser) {
            throw new Error("You are not Authorized")
        }
        req.mobileNumber = compuser.mobileNumber 
        req.comptoken = comptoken
        next()
    } catch(e) {
        res.render('error', {
            title: 'Error',
            errorMessage: e.message,
            linkFirst: '/',
            linkSecond: '/forgot',
            linkValue: 'Try again'
            
        })
    }
}

module.exports = compforgotAuth
const jwt = require('jsonwebtoken')
const User = require('../models/users')

const forgotAuth = async(req, res, next) => {
    try{
        const token = req.cookies.forgot
        if(!token) {
            throw new Error('You are not Authorized')
        }
        const decode = jwt.verify(token.toString(), process.env.FORGOT_AUTH_KEY) //'thisishiddenkey'
        const user = await User.findById({_id:decode._id})
        if(!user) {
            throw new Error("You are not Authorized")
        }
        req.phone = user.phone 
        req.token = token
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

module.exports = forgotAuth
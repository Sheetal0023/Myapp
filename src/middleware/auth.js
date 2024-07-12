const jwt = require('jsonwebtoken')
const User = require('../models/users')

const auth = async(req, res, next) => {
      try{  
       
        const token = req.cookies.jwt
        const decode = jwt.verify(token, process.env.AUTH_KEY) //'thisiskey'
        const user = await User.findById({_id:decode._id})
        if(!user){
            throw new Error('Please login')
        }
        req.user = user
        req.token = token
        next() 
      } catch(e){
            res.render('error', {
                  title: 'Error',
                  errorMessage: e.message,
                  linkFirst: '/',
                  linkSecond: '/login',
                  linkValue: 'Login'
              })
      }    
}

module.exports = auth
const jwt = require('jsonwebtoken')
const Companies = require('../models/companies')

const compauth = async(req, res, next) => {
      try{  
        const comptoken = req.cookies.cjwt
        const decode = jwt.verify(comptoken, process.env.COMP_AUTH_KEY) //'thisiscompanyauthkey'
        const compuser = await Companies.findById({_id:decode._id})
        
        if(!compuser){
            throw new Error('Please login')
        }
        req.compuser = compuser
        req.comptoken = comptoken
        next() 
      } catch(e){
            res.render('error', {
                  title: 'Error',
                  errorMessage: e.message,
                  linkFirst: '/',
                  linkSecond: '/companylogin',
                  linkValue: 'Login'
              })
      }    
}

module.exports = compauth
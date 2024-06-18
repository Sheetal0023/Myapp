const User = require('../models/users')


const smsAuth = async(req,res,next)=>{
    try{
        const emailBrowser = req.cookies.email
        const phoneBrowser = req.cookies.phone
        const user = await User.findOne({
            email:req.body.email,
            phone:req.body.phoneNumber
        }) 
        if(!user){
            throw new Error ('You are Not Authenticate')
        }

        if(user.email !== emailBrowser && user.phone !== phoneBrowser){
            throw new Error ('You are Not Authenticate')
        }
        req.user = user
        next()
    } catch(e){
        res.status(404).render('error',{
            title:'Error',
            error:e.message
        })
    }
} 

module.exports = smsAuth
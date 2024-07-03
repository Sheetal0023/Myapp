const express = require('express')

const User = require('../models/users')
const Task = require('../models/tasks')
const amc = require('../models/companyAmcs')

const router = new express.Router()

const bcrypt = require('bcryptjs')

const auth = require('../middleware/auth')
const forgotAuth = require('../middleware/forgotAuth')
const smsAuth = require('../middleware/smsAuth')

const { smsOTP, sendMessage} = require('../sms/smsVerify')

const validator = require('validator')




router.get('',(req,res)=>{
    res.render('home',{
        title:'Home'
    
    })
   
})

router.get('/register',(req,res)=>{
    res.render('register',{
        title:'Register'
    })
})


router.post('/register', async(req, res) => {
    try{
        const user = new User({
            username:req.body.username,
            email:req.body.email,
            password:req.body.password,
            phone:req.body.phoneNumber

        })
        
        const errorfind = []


        const users = await User.findOne({
            email:req.body.email
        })

        const phoneUser = await User.findOne({
            phone: req.body.phoneNumber
        })


        if(!user.username) {
            errorfind[0] = 'Please provide Username'
        }

        if(!validator.isEmail(user.email)) {
            errorfind[1] =  'Please Provide a valid Email'
        }

        if(users){
            errorfind[1] = 'Email is already exist'

        }

        if(!user.password) {
            errorfind[2] = 'Please provide password'
        }

        if(user.password.length <= 6){
            errorfind[3] = 'Password is not Strong'
        }

        if(user.password !== req.body.confirmPassword) {
            errorfind[3] = 'Password is not match'
        }

        if(!user.phone) {
            errorfind[4] = 'Please provide Phone Number'

        } else {
            if(user.phone.toString().length !== 10 ){
                errorfind[4] = 'Provide a valid phone number'
            }
        }

        if(phoneUser) {
            errorfind[4] = 'This phone number is already used'
        }

 
        if(!req.body.agreement) {
            errorfind[5] = 'Confirm agreement'
        }

        if(errorfind.length !== 0) {
            res.render('register', {
                body: req.body,
                errorUsername: errorfind[0],
                errorEmail: errorfind[1],
                errorPassword: errorfind[2],
                errorNotMatch: errorfind[3],
                errorPhone: errorfind[4],
                errorCheck: errorfind[5],
            })


        } else {
            user.password = await bcrypt.hash(user.password, 8)
            await user.save()
            res.render('success', {
                mainHead: 'Success',
                describe: 'You have register successfully ',
                linkFirst: '/',
                linkSecond: '/login',
                linkValue: 'Login'
            })

        }
        

    } catch(e){
        res.render('error', {
            title: 'Error',
            errorMessage: e.message,
            linkFirst: '/',
            linkSecond: '/register',
            linkValue: 'Try Again' 
        })
        
    }
})


router.get('/login', (req, res) => {
    res.render('login',{
        title:''
    })
})
router.post('/login', async(req, res) => {
    try{
        const value = []
        const emailphone = req.body.emailphone
        const password = req.body.password
        const check  = validator.isNumeric(emailphone)
        const errorfind = []


        if(check) {
            value.push({phone: req.body.emailphone})
        } else {
            value.push({email: req.body.emailphone})
        }

        const useremail = await User.findOne(value[0])


        if(!useremail) {
            errorfind[0] = 'This Account is not find'
        }

        if(!emailphone) {
            errorfind[0] = 'Please provide Email or Mobile Number'
        }

        if(!password) {
            errorfind[1] = 'Please provide password'
        }

        if (errorfind.length == 0) {
            const isMatch = await bcrypt.compare(password, useremail.password)

            if(!isMatch) {
                errorfind[2] = 'Invalid Credentials'
            }

            

        }

        if(errorfind.length != 0) {

            res.render('login', {
                body: req.body,
                errorEmail: errorfind[0],
                errorpass: errorfind[1],
                errorCredentials: errorfind[2]
    
            })
        } else {
            const token = await useremail.generateAuthToken()
            res.cookie('jwt', token)
            
            res.render('profile', {
                title: useremail.username
            })
        } 
        

    } catch(e){
        console.log(e)
        res.send().render('error', {
            title: 'Error',
            errorMessage: e.message,
            linkFirst: '/',
            linkSecond: '/forgot',
            linkValue: 'Try Again'
        })
    }
})

router.get('/profile', auth, async(req, res)=>{
    try{
  
        const amcs = await amc.find({})

        console.log(amcs)
        res.render('profile',{
            title:req.user.username,
            email:req.user.email,
            cAmcs: amcs 
        })


      } catch(e){
        console.log(e)
         res.status(501).render('error',{
            title:'Error',
            error:e.message
        })
      }
})

router.get('/logout', auth, async(req, res) => {
    try{
        res.clearCookie('jwt')
        req.user.tokens = req.user.tokens.filter((token)=>{
            return token.token !== req.token

        })
         await req.user.save() 
         res.render('home',{
             title:'Home'
         })
    } catch(e){
        res.status(501).render('error',{
            title: 'Error',
            errorMessage: e.message,
            linkFirst: '/',
            linkSecond: '/forgot',
            linkValue: 'Try Again'
        })
    }
})

router.get('/logoutall',auth,async(req,res)=>{
    try{
        res.clearCookie('jwt')
        req.user.tokens =[]

         await req.user.save() 
         res.render('home', {
            title: 'Home'
         })
    } catch(e){
        res.status(501).render('error',{
            title:'Error',
            error:e.message
        })
    }
})

router.get('/changepassword', auth, async(req, res) => {
    try{

    res.render('update',{
        title:req.user.username
    })
    } catch (e){

    }
})
router.post('/changepassword',auth, async(req,res)=>{
    try{
        const newPassword = await bcrypt.hash(req.body.newpassword,8)
        const user = await User.findOneAndUpdate({_id:req.user._id},
            {
                $set:{
                    password:newPassword
                }
            })
            
            res.render('home',{
                title:'Home'
            })
            
            await user.save()
            
    } catch(e){
        res.send(404).render('error', {
            title: 'Error',
            errorMessage: e.message,
            linkFirst: '/',
            linkSecond: '/forgot',
            linkValue: 'Try Again'
        })
    }
})

router.get('/forgot', async(req, res) => {
    res.render('forgot', {
        title:'Hi'
    })
    
})
router.post('/forgot', async(req, res)=>{
    try{

        const value = []
        const emailphone = req.body.email
        const check  = validator.isNumeric(emailphone)
        const errorfind = []


        if(check) {
            value.push({phone: req.body.email})
        } else {
            value.push({email: req.body.email})
        }

        const useremail = await User.findOne(value[0])

        // console.log(value)

        if(!useremail) {
            errorfind[0] = 'This Account is not find'
        }

        if(!emailphone) {
            errorfind[0] = 'Please provide Email or Mobile Number'
        }

       

        if(errorfind.length != 0) {
            // console.log("if condition")
            res.render('forgot', {
                body: req.body,
                errorEmail: errorfind
            })
        } else {

            const number = useremail.phone.toString()
            const x = "XXXXX-XX"
            const hidden = x.concat(number.slice(7, 10))
            const token = await useremail.generateForgotAuthToken()
            res.cookie('forgot', token)
            res.render('mobileNumber', {
                hidden: hidden
            })
        }
        
    } catch(e){
        res.send(401).render('error', {
            title: 'Error',
            errorMessage: e.message,
            linkFirst: '/',
            linkSecond: '/forgot',
            linkValue: 'Try Again'
        })
    }
})

router.post('/mobileNumber', forgotAuth, async(req, res) => {
    try{
        const actualPhone = req.phone
        const phone = req.body.phone
       

        if(!phone){
            throw new Error('Plaese Provide your Mobile Number')

        } else if(actualPhone != phone) {
        
            const error = "Invalid Mobile Number"
            res.clearCookie('forgot')
            throw new Error(error)

        } else {
            const otpSMS = smsOTP()
            const user = await User.findOne({phone:phone})
            console.log(otpSMS)
            sendMessage(otpSMS, user.phone)
            user.otp = otpSMS
            await user.save()
            res.render('otp', {})
        }  



    } catch(e) {
        res.render('error', {
            title: 'Error',
            errorMessage: e.message,
            linkFirst: '/',
            linkSecond: '/forgot',
            linkValue: 'Try Again'

        })
    }

})


router.post('/otp', forgotAuth, async(req,res)=>{
  try {
    const user = await User.findOne({phone:req.phone})
    const actualOTP = user.otp
    const otp = req.body.otp


    if(actualOTP != otp) {
        const error = "Varification Failed"
        res.clearCookie('forgot')
        res.send('Alert Page otp')
    } else {
        res.render('newpass')
    }

  }catch(e) {
    res.send().render('error', {
        title: 'Error',
        errorMessage: e.message,
        linkFirst: '/',
        linkSecond: '/forgot',
        linkValue: 'Try Again'
    })
  }
})

router.get('/newpass', async(req, res)=>{
    res.render('newpass',{title:'Login'})
})
router.post('/newpass' ,forgotAuth ,async(req, res)=>{
    try {
        const errorFind = []
        const password = req.body.password
        const confirm_password = req.body.confirm_password

        
        if(!password) {
            errorFind[0] = "Password field is required"
        } else if(password.length < 6){
            errorFind[0] = "Password should have minimun 6 characters"
        }

        if(!confirm_password) {
            errorFind[1] = "Confirm Password field is required"
        } else if(password != confirm_password) {
            errorFind[1] = "Password is not Match"
        }



        if(errorFind.length != 0){
            res.render('newpass', {
                body: req.body,
                errorPass: errorFind[0],
                errorCPass: errorFind[1],
                errorMatch: errorFind[2]
            })
        } else {
            const user = await User.findOne({forgotToken:req.token})
            const newpassword = await bcrypt.hash(password, 8)
            console.log(newpassword)
            console.log(user.password)
            user.password = newpassword
            res.clearCookie('forgot')
            await user.save()
            res.render('success', {
                mainHead: 'Success',
                describe: 'Your Password has been changed successfully',
                linkFirst: '/',
                linkSecond: '/login'
            })
        }
    } catch(e) {
        res.send().render('error', {
            title: 'Error',
            errorMessage: e.message,
            linkFirst: '/',
            linkSecond: '/forgot',
            linkValue: 'Try Again'
        })
    }
    

})

router.get('/deleteuser', auth, async(req,res)=>{
    try{

         await User.deleteOne({
            email:req.user.email,
            phone:req.user.phone
        })
         await Task.deleteOne({
             owner:req.user._id
         })
        
         res.render('success', {
                mainHead: 'Success',
                describe: 'Your Account has been Deleted',
                linkFirst: '/',
                linkSecond: '/register',
                linkValue: 'Register'
         })

    } catch(e){
        // console.log(e)
        res.status(404).render('error',{
            title:'Error',
            error:e.message
        })
    }
})



// router.get('/*',(req,res)=>{
//     res.status(404).render('error',{
//         title:'Error',
//         error: 'Page is not found'
//     })
// })


module.exports = router
const express = require('express')
const companyUser = require('../models/companies')
const router = new express.Router()
const companyAmcs = require('../models/companyAmcs')
const validator = require('validator')
<<<<<<< HEAD
const bcrypt = require('bcryptjs')
const compauth = require('../middleware/compauth')
const compforgotAuth = require('../middleware/compforgotAuth')
const { smsOTP, sendMessage} = require('../sms/smsVerify')

// router.get('/gta', async(req, res) => {
//    try{
//     const user = new companyUser({
//         name: "Sheetal Sharma",
//         password: "Sheetal123",
//         businessName: "Steel",
//         mobileNumber: "9876543210",
//         email: "abc@gmail.com",
//         address: "Street unkwown",
//         zip: "123456789",
//         country: "USA",

//     })
//     const amc = new companyAmcs({
//         description: 'Cooler',
//         price: '250',
//         owner: user._id
//     })

//     const amcOne = new companyAmcs({
//         description: 'Refrigerator',
//         price: '2500',
//         owner: user._id
//     })
=======

router.get('/gta', async(req, res) => {
   try{
    const user = new companyUser({
        name: "Sheetal Sharma",
        password: "Sheetal123",
        businessName: "Steel",
        mobileNumber: "9876543210",
        email: "abc@gmail.com",
        address: "Street unkwown",
        zip: "123456789",
        country: "USA",

    })
    const amc = new companyAmcs({
        description: 'Cooler',
        price: '250',
        owner: user._id
    })

    const amcOne = new companyAmcs({
        description: 'Refrigerator',
        price: '2500',
        owner: user._id
    })
>>>>>>> 505ecf3f0c3fc9ece6350c30af13c3d9610b7e3c




<<<<<<< HEAD
//     res.send(user)

//     await user.save()
//     await amc.save()
//     await amcOne.save()
//     // await amcTwo.save()
// } catch(e) {
//     console.log(e)
// }
// })
   

router.get('/companyregistration', async(req, res) => {
    res.render('compuser', {})
})

router.post('/companyregistration', async(req, res) => {
=======
    res.send(user)

    await user.save()
    await amc.save()
    await amcOne.save()
    // await amcTwo.save()
} catch(e) {
    console.log(e)
}
})
   

router.get('/abc', async(req, res) => {
    res.render('compuser', {})
})

router.post('/abc', async(req, res) => {
>>>>>>> 505ecf3f0c3fc9ece6350c30af13c3d9610b7e3c
    try {

        const first = req.body.first
        const last = req.body.last
        const businessName = req.body.businessName
        const mobileNumber = req.body.mobileNumber
        const password = req.body.password
        const confirmPassword = req.body.confirmPassword
        const email = req.body.email.toLowerCase()
        const streetOne = req.body.streetOne
        const streetTwo = req.body.streetTwo
        const city = req.body.city
        const region = req.body.region
        const zip = req.body.zip
        const countryCode = req.body.CountryCode

        const formData = [first, last, businessName, mobileNumber, email, password, confirmPassword, streetOne, streetTwo, city, region, zip]

        const errors = []

        const business = await companyUser.findOne({
            businessName: businessName
        })

        const emailName = await companyUser.findOne({
            email: email
        })

        const userMobile = await companyUser.findOne({
            mobileNumber: mobileNumber
        })

<<<<<<< HEAD
        
=======

>>>>>>> 505ecf3f0c3fc9ece6350c30af13c3d9610b7e3c
        if(!first) {
            errors[0] = 'Please Provive first Name'
        }
        if(!last) {
            errors[1] = 'Please Provide last Name'
        }
        if(!businessName) {
            errors[2] = 'Please Provide your Business name'
        } else if (business != undefined) {
            errors[2] = 'This Business Name is already exsist'
        }
        if(!mobileNumber){
            errors[3] = 'Please Provide Mobile Number'
        } else if(mobileNumber.length != 10) {
            errors[3] = 'Invalid Mobile Number'
        } else if(userMobile != undefined) {
            errors[3] = 'This Mobile Number is already exist'
        }
        
        if(!email) {
            errors[4] = 'Please provide Email'
        } else if(!validator.isEmail(email)) {
            errors[4] = 'It is not a valid Email'
        } else if(emailName != undefined) {
            errors[4] = 'This email is already exist'
        }

        if(!password) {
            errors[5] = 'Please give a password'
<<<<<<< HEAD

=======
>>>>>>> 505ecf3f0c3fc9ece6350c30af13c3d9610b7e3c
        }
        if(!confirmPassword) {
            errors[6] = 'Confirm password is required field'
        } else if(password != confirmPassword) {
                errors[6] = 'Password is not match'
        } else if (password.length < 6) {
                errors[6] = 'Password length should be greater than six digits'
        }  
            
    
        if(!streetOne) {
            errors[7] = 'Please fill address here'
        }
        if(!streetTwo) {
            errors[8] = 'Please fill address here'
        }
        if(!city) {
            errors[9] = 'City name is required'
        }
        if(!region) {
            errors[10] = 'Region is required'
        }
        if(!zip) {
            errors[11] = 'Select your Zip code'
        
        } else if (zip.length != 6) {
            console.log(zip.length)
            errors[11] = 'Invalid Zip code'
        }
<<<<<<< HEAD
   

        if(errors.length == 0) {

            const hashPassword = await bcrypt.hash(password, 8)

            const user = new companyUser({
                name: `${first} ${last}`,
                password: hashPassword,
=======

    

        // await user.save()
        // console.log(req.body)    

        if(errors.length == 0) {

            const user = new companyUser({
                name: `${first} ${last}`,
                password: password,
>>>>>>> 505ecf3f0c3fc9ece6350c30af13c3d9610b7e3c
                businessName: businessName,
                mobileNumber: mobileNumber,
                email: email,
                address: {
                    streetOne: streetOne,
                    streetTwo: streetTwo,
                    city: city,
                    region: region,
                    zip: zip,
                    CountryCodes: countryCode
                }
            })
<<<<<<< HEAD

            await user.save()
            res.render('success', {
                mainHead: 'Success',
                describe: 'Your Comapny registeration successfully ',
                linkFirst: '/',
                linkSecond: '/companylogin',
                linkValue: 'Login'
            })
=======
            res.send(user)

            await user.save()
>>>>>>> 505ecf3f0c3fc9ece6350c30af13c3d9610b7e3c

        } else {
            res.render('compuser', {
                error: errors,
                formdata: formData,
                status: 'Error: Please check your details '
            })
        }
        
    } catch (e) {
<<<<<<< HEAD
        res.render('error', {
            title: 'Error',
            errorMessage: e.message,
            linkFirst: '/',
            linkSecond: '/companyregistration',
            linkValue: 'Try Again' 
        })
    }
})

router.get('/companylogin' ,async(req, res) => {
    res.render('companylogin')
})

router.post('/companylogin', async(req, res) => {
    try {
        const errors = []
        const emailphone = []

        const email = req.body.email
        const password = req.body.password
        const check = validator.isNumeric(email)

        const formData = [email, password]

        if(!email) {
            errors[0] = 'Please give Email or Password'
        } else if(check) {
            emailphone.push({mobileNumber: email})
        } else if(!check){
            emailphone.push({email: email})
        }
    

        if(!password) {
            errors[1] = 'Password is required'
        }

        const useremail = await companyUser.findOne(emailphone[0])
           
          if(!useremail) {
                errors[0] = 'This account does not exist'
            } else {
                const isMatch = await bcrypt.compare(password, useremail.password)
                if(!isMatch) {
                    errors[1] = 'Invalid Credentials'
                }
            }     
             
        
        
        if(errors.length == 0) {
            const comptoken = await useremail.generateAuthToken()
            res.cookie('cjwt', comptoken)
            res.redirect('/companyprofile')
        }else {
            res.render('companylogin', {
                error: errors,
                formdata: formData,
            })
        }

    } catch (e) {
=======
>>>>>>> 505ecf3f0c3fc9ece6350c30af13c3d9610b7e3c
        console.log(e)
    }
})

<<<<<<< HEAD
router.get('/companyprofile', compauth, async(req, res) => {
    try{
        const amcs = await companyAmcs.find({
            owner: req.compuser._id
        })

        res.render('companyprofile', {
            amcs
        })


      } catch(e){
        console.log(e)
         res.status(501).render('error',{
            title:'Error',
            error:e.message
        })
      }
})

router.post('/companyprofile', compauth, async(req, res) => {
    try{
        // console.log(req.body)
        // res.send(req.body)
    } catch(e) {

    }
})


router.get('/companyforgot', async(req, res) => {
    res.render('companyforgot', {
        title:'Hi'
    })
    
})
router.post('/companyforgot', async(req, res) => {
    try{

        const value = []
        const emailphone = req.body.email
        const check  = validator.isNumeric(emailphone)
        const errorfind = []


        if(check) {
            value.push({mobileNumber: req.body.email})
        } else {
            value.push({email: req.body.email})
        }

        const useremail = await companyUser.findOne(value[0])

        // console.log(value)

        if(!useremail) {
            errorfind[0] = 'This Account is not find'
        }

        if(!emailphone) {
            errorfind[0] = 'Please provide Email or Mobile Number'
        }

       

        if(errorfind.length != 0) {
            res.render('companyforgot', {
                body: req.body,
                errorEmail: errorfind
            })
        } else {

            const number = useremail.mobileNumber.toString()
            const x = "XXXXX-XX"
            const hidden = x.concat(number.slice(7, 10))
            const comptoken = await useremail.generateForgotAuthToken()
            res.cookie('compforgot', comptoken)
            res.render('companymobileNumber', {
                hidden: hidden
            })
        }
        
    } catch(e){
        console.log(e)
        res.render('error', {
            title: 'Error',
            errorMessage: e.message,
            linkFirst: '/',
            linkSecond: '/companyforgot',
            linkValue: 'Try Again'
        })
    }
})


router.post('/companymobileNumber', compforgotAuth, async(req, res) => {
    try{
        const actualmobileNumber = req.mobileNumber
        const mobileNumber = req.body.phone
       

        if(!mobileNumber){
            throw new Error('Plaese Provide your Mobile Number')

        } else if(actualmobileNumber != mobileNumber) {
        
            const error = "Invalid Mobile Number"
            res.clearCookie('compforgot')
            throw new Error(error)

        } else {
            const otpSMS = smsOTP()
            const user = await companyUser.findOne({mobileNumber:mobileNumber})
            console.log(otpSMS)
            // sendMessage(otpSMS, user.mobileNumber)
            console.log(otpSMS)
            user.otp = otpSMS
            await user.save()
            res.render('companyotp', {})
        }  



    } catch(e) {
        res.render('error', {
            title: 'Error',
            errorMessage: e.message,
            linkFirst: '/',
            linkSecond: '/comapnyforgot',
            linkValue: 'Try Again'

        })
    }

})

router.post('/companyotp', compforgotAuth, async(req,res)=>{
    try {
      const user = await companyUser.findOne({mobileNumber:req.mobileNumber})
      const actualOTP = user.otp
      const otp = req.body.otp
  
  
      if(actualOTP != otp) {
          const error = "Varification Failed"
          res.clearCookie('compforgot')
          res.render('error', {
            title: 'Error',
            errorMessage: error,
            linkFirst: '/',
            linkSecond: '/companyforgot',
            linkValue: 'Try Again'
          })
      } else {
          res.render('companynewpass')
      }
  
    }catch(e) {
      res.send().render('error', {
          title: 'Error',
          errorMessage: e.message,
          linkFirst: '/',
          linkSecond: '/companyforgot',
          linkValue: 'Try Again'
      })
    }
  })


router.post('/companynewpass', compforgotAuth ,async(req, res) => {
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
            res.render('companynewpass', {
                body: req.body,
                errorPass: errorFind[0],
                errorCPass: errorFind[1],
                errorMatch: errorFind[2]
            })
        } else {
            const user = await companyUser.findOne({forgotToken:req.comptoken})
            const newpassword = await bcrypt.hash(password, 8)
            console.log(newpassword)
            console.log(user.password)
            user.password = newpassword
            res.clearCookie('compforgot')
            await user.save()
            res.render('success', {
                mainHead: 'Success',
                describe: 'Your Business Account Password has been changed successfully',
                linkFirst: '/',
                linkSecond: '/companylogin',
                linkValue: 'Login'
            })
        }
    } catch(e) {
        res.send().render('error', {
            title: 'Error',
            errorMessage: e.message,
            linkFirst: '/',
            linkSecond: '/comapnyforgot',
            linkValue: 'Try Again'
        })
    }
    

})


//  About Account Services

router.get('/companylogout', compauth, async(req, res) => {
    try{
        res.clearCookie('cjwt')
        req.compuser.tokens = req.compuser.tokens.filter((token)=>{
            return token.token !== req.comptoken

        })
         await req.compuser.save() 
         res.redirect('/')
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

router.get('/companylogoutall', compauth, async(req,res)=>{
    try{
        res.clearCookie('cjwt')
        req.compuser.tokens =[]

         await req.compuser.save() 
         res.redirect('/')
    } catch(e){
        res.status(501).render('error',{
            title:'Error',
            error:e.message
        })
    }
})





router.get('/registeramc', compauth, async(req, res) => {
    // try{
    //     const user = await companyAmcs.findOne({owner: req.compuser._id})
    //     user.userInformation = user.userInformation.concat({useremail: 'One'})
    //     await user.save()
    //     // user.device_name = "Sheetal"
    //     res.send(user)
    //     console.log(req.compuser)
    // } catch(e) {
    //     console.log(e)
    // }
})

router.post('/registeramc', compauth, async(req, res) => {
    // try{
    //     const user = await companyAmcs.find({})
    //     console.log(user)
    // } catch(e) {
    //     console.log(e)
    // }
})


//About 

router.post('/getamcdetails', async(req, res) => {
    res.send(req.body)
})
=======
>>>>>>> 505ecf3f0c3fc9ece6350c30af13c3d9610b7e3c


module.exports = router

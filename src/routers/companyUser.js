const express = require('express')
const companyUser = require('../models/companies')
const router = new express.Router()
const companyAmcs = require('../models/companyAmcs')
const validator = require('validator')

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

    

        // await user.save()
        // console.log(req.body)    

        if(errors.length == 0) {

            const user = new companyUser({
                name: `${first} ${last}`,
                password: password,
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
            res.send(user)

            await user.save()

        } else {
            res.render('compuser', {
                error: errors,
                formdata: formData,
                status: 'Error: Please check your details '
            })
        }
        
    } catch (e) {
        console.log(e)
    }
})



module.exports = router

const express = require('express')
const companyUser = require('../models/companies')
const companyAmcs = require('../models/companyAmcs')
const router = new express.Router()
const validator = require('validator')
const bcrypt = require('bcryptjs')
const compauth = require('../middleware/compauth')


router.get('/companyamcregistration', compauth, async(req, res) => {
    res.render('amcregistration')
})

router.post('/companyamcregistration', compauth, async(req, res) => {
    try{
        const error = []
        const device_cetagory = req.body.device_cetagory
        const device_name = req.body.device_name
        const contract_period = req.body.contract_period
        const maintenance_period_one = req.body.maintenance_period_one
        const charges_one = req.body.charges_one
        const maintenance_period_two = req.body.maintenance_period_two
        const charges_two = req.body.charges_two
        const maintenance_period_three = req.body.maintenance_period_three
        const charges_three = req.body.charges_three
        const maintenance_period_four = req.body.maintenance_period_four
        const charges_four = req.body.charges_four
        const contract_charges = req.body.contract_charges


        if(!device_cetagory) {
            error[0] = "This field is required"
        }
        if(!device_name) {
            error[1] = "This field is required"
        }
        if(!contract_period) {
            error[2] = "This field is required"
        }
        if(!maintenance_period_one) {
            error[3] = "This field is required"
        } 
        if(!maintenance_period_two) {
            error[4] = "This field is required"
        }
        if(!maintenance_period_three) {
            error[5] = "This field is required"
        }
        if(!maintenance_period_four) {
            error[6] = "This field is required"
        }
        if(!charges_one) {
            error[7] = "This field is required"
        }
        if(!charges_two) {
            error[8] = "This field is required"
        }
        if(!charges_three) {
            error[9] = "This field is required"
        }
        if(!charges_four) {
            error[10] = "This field is required"
        }

        if(!contract_charges) {
            error[11] = "This field is required"
        }

        if(error.length != 0) {
            res.render('amcregistration', {
                error: error,
                status: 'Error: Please check your form carefully',
                 device_cetagory, 
                 device_name,
                 contract_period,
                 maintenance_period_one,
                 charges_one,
                 maintenance_period_two,
                 charges_two, 
                 maintenance_period_three,
                 charges_three ,
                 maintenance_period_four, 
                 charges_four,
                 contract_charges,

            })
        } else {

            const amc = await new companyAmcs({
                device_cetagory, 
                 device_name,
                 contract_period,
                 maintenance_period_one,
                 charges_one,
                 maintenance_period_two,
                 charges_two, 
                 maintenance_period_three,
                 charges_three ,
                 maintenance_period_four, 
                 charges_four,
                 contract_charges,
                 owner: req.compuser,
            })
    
            await amc.save()
            res.render('success', {
                mainHead: 'Success',
                describe: 'Your AMC registration has been successfully ',
                linkFirst: '/',
                linkSecond: '/companyprofile',
                linkValue: 'My profile'
            })
    
        }
        
    } catch(e) {
        console.log(e)
    }
})


module.exports = router
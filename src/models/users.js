const express = require('express')
const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true
        
    },
    password:{
        type:String,
        required:true,
        minlength:6,
        trim:true
       
    },
    email:{
        type:String,
        required:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error ('Email is not valid')
            }
        }
    },
    phone:{
        type:Number,
        required:true
    },
    otp:{
        type:String,
    },
    forgotToken:{
        type:String,
    },
    tokens:[{
        token:{
            type:String,
            required:true
        }
    }]
})



userSchema.statics.findByCredentials = async(email, password) => {
    
    const errorUser = []

    const user = await User.findOne(email)

    
    const isMatch = await bcrypt.compare(password, user.password)
    if(!isMatch){
        errorUser.push('Invalid Credentials')
    }
    return errorUser
    
}


userSchema.methods.generateAuthToken = async function() {
    const user = this
    const token = jwt.sign({_id:user.id.toString()}, process.env.AUTH_KEY) //thisiskey
    user.tokens = user.tokens.concat({token})
    await user.save()
    return token
}

userSchema.methods.generateForgotAuthToken = async function() {
    const user = this 
    const token = jwt.sign({_id:user.id.toString()}, process.env.FORGOT_AUTH_KEY)
    user.forgotToken = token
    await user.save()
    return token
}




const User = mongoose.model('User', userSchema)

module.exports = User
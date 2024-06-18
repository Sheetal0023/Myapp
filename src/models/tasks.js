const express = require('express')
const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema({
    discription:{
        type:String,
        required:true

    },
    completed:{
        type:Boolean,
        required:true
    },
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    }
})
const Task = mongoose.model('Task', taskSchema)
 

module.exports = Task
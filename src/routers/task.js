const express = require('express')
const User = require('../models/users')
const Task = require('../models/tasks')
const router = new express.Router()
const auth = require('../middleware/auth')


router.get('/createtask', auth, async(req,res)=>{
    res.render('createtask',{
        title:req.user.username,
        email:req.user.email
    })
})

router.post('/createtask', auth, async(req,res)=>{
    try{
        const task = await new Task({
            discription:req.body.discription,
            completed:req.body.completed,
            owner:req.user._id
        })
        await task.save()
        res.render('home',{title:'Home'})

    } catch(e){
        res.status(400).send(e.message)
    }
})

router.get('/deletetask', auth, async(req,res)=>{
  res.render('deletetask',{
      title:req.user.username,
      email:req.user.email,
  })
})

router.post('/deletetask', auth, async(req,res)=>{
    try{
        const task = await Task.deleteOne({
            owner:req.user._id,
            discription:req.body.discription
        })
        if(!req.body.discription){
            throw new Error('Please enter discription')
        }
        res.render('home',{
            title:'Home'
        })
    } catch (e){
        res.status(400).render('error',{
            title:'Error',
            error:e.message
        })
    }
})

module.exports = router
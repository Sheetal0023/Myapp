const express = require('express')
const app = express()
const hbs = require('hbs')
const path = require('path')
const port = process.env.PORT
require('./db/mongoose')
const bodyParser = require('body-parser')
const { Router } = require('express')
const { default: isEmail } = require('validator/lib/isEmail')
const { AsyncLocalStorage } = require('async_hooks')

const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')
const companyUserRouter = require('./routers/companyUser')
<<<<<<< HEAD
const amcRouter = require('./routers/amc')
=======
>>>>>>> 505ecf3f0c3fc9ece6350c30af13c3d9610b7e3c

const cookieParser = require('cookie-parser')

const publicDirectoryPath = path.join(__dirname,'../public')
const pathName = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')



hbs.registerPartials(partialsPath)
app.set('view engine','hbs')
app.set('views', pathName)
app.use(express.static(publicDirectoryPath))
app.use(cookieParser())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(userRouter)
app.use(taskRouter)
app.use(companyUserRouter)
<<<<<<< HEAD
app.use(amcRouter)
=======
>>>>>>> 505ecf3f0c3fc9ece6350c30af13c3d9610b7e3c


app.listen(port,()=>{
    console.log('Server is running on ',port)
})





 
   
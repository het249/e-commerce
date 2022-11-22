const express = require('express')
const app = express()

//set all values from .env file in process.env variable
require('dotenv').config()

//set default view engine to EJS
app.set('view engine','ejs')
app.set('views', __dirname + '/views')

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ limit: '10mb', extended: false}))
app.use(express.json())
//set all routers
const registerRoute = require('./routes/register')
const loginRoutes = require('./routes/login')

app.use('/register', registerRoute)
app.use('/login',loginRoutes)


//establish connection with database
const mongoose = require('mongoose')
mongoose.connect(process.env.DATABASE_URL , {useNewUrlParser: true})
const db = mongoose.connection
db.on('error', error => console.log(error))
db.once('open', () => console.log('connected to Mongoose'))

//start server
app.listen(8000,()=>{
    console.log('listen to port 8000...')
})
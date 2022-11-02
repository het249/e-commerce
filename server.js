const express = require('express')

const app = express()

require('dotenv').config()

app.set('view engine','ejs')
app.set('views', __dirname + '/views')

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ limit: '10mb', extended: false}))

const mongoose = require('mongoose')
mongoose.connect(process.env.DATABASE_URL , {useNewUrlParser: true})
const db = mongoose.connection
db.on('error', error => console.log(error))
db.once('open', () => console.log('connected to Mongoose'))


app.listen(3000,()=>{
    console.log('listen to port 3000...')
})
const express = require('express')
const jwtoken = require('jsonwebtoken')
const User = require('../models/users')
const router = express.Router()


router.get('/',(req, res)=>{
    res.render('register')
})

router.post('/',async (req, res)=>{
    console.log(req.body)
    console.log(req.body.firstName+" "+req.body.lastName+" "+req.body.email+" "+req.body.password)
    const user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password
    })
    
    try{
        const newUser = await user.save()
        const message = "registered successfully"
        return res.json({err:false, message:message})
    }catch(err){
        return res.json({err:true, message:err})
    }
})

module.exports = router
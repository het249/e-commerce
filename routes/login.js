const express = require('express')
const User = require('../models/users')
const jwtoken = require('jsonwebtoken')
const router = express.Router()

const createJWToken = (user)=>{
    const token = jwtoken.sign(
            {
                userId: user.id,
                email: user.email
            },
            'jwtSecretKey-Het'
        )
    return token
}

router.get('/',(req, res)=>{
    res.render('login')
})

router.post('/',async (req, res)=>{

    const user = await User.findOne({email:req.body.email})
    if(!user){
        const message="User does not exist"
        res.status(200).json({err:true, message:message})
    }else if(user.password === req.body.password){
        res.status(200).json({err:false, user:true, userToken:createJWToken(user)})
    }else{
        const message = "incorrect credentials"
        res.status(200).json({err:true, message:message})
    }
})

module.exports = router
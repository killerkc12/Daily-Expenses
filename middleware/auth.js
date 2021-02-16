const jwt = require('jsonwebtoken')
const { JWT_KEY } = require('../config/keys')
const mongoose = require('mongoose')
const User = mongoose.model("User")

module.exports=(req,res,next)=>{
    const {authorization} = req.headers
    if(!authorization){
        return res.status(422).json({error:"you must logged in first"})
    }
        const token = authorization.replace("Auth ","")
        jwt.verify(token,JWT_KEY,(err,payload)=>{
            if(err){
                return res.status(422).json({error:"you must logged in first"})
            }

            const {_id} = payload
            User.findById(_id)
            .then(userData=>{
                req.user = userData
                next()
            })
        })
}
const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const mongoose = require('mongoose')
const User = mongoose.model('User')
const jwt = require('jsonwebtoken')
const { JWT_KEY } = require('../config/keys')

router.post('/getUser',(req,res)=>{
    const {state} = req.body
    User.findById(state._id)
    .then(data=>{
        console.log("data : "+data)
        res.json({data})
    })
})

router.post('/login',(req,res)=>{
    const {email,password} = req.body
    if(!email || !password){
        return res.status(422).json({error:"All Fields are Mandatory!"})
    }
    if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
        return res.json({error:"Please , Enter valid Email"})
    }
    User.findOne({email:email})
    .then((CurrentUser)=>{
        if(!CurrentUser){
            return res.status(422).json({error:"Email or Password is Invalid!"})
        }
        bcrypt.compare(password,CurrentUser.password)
        .then((PassMatch)=>{
            if(!PassMatch){
                return res.status(422).json({error:"Email or Password is Invalid"})
            }
            const token = jwt.sign({_id:CurrentUser._id},JWT_KEY)
            const {_id,name,email,balance} = CurrentUser
            res.json({token,user:{_id,name,email,balance}})
        })
        .catch(err=>{
            console.log(err)
        })
    })
    .catch(err=>{
        console.log(err)
    })
})

router.post('/register',(req,res)=>{
    const {name,email,password} = req.body
    if(!name || !email || !password){
        return res.status(422).json({error:"All Fields are Mandatory!"})
    }
    if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
        return res.status(422).json({error:"Please , Enter valid Email"})
    }
    User.findOne({email})
    .then((UserExist)=>{
        if(UserExist){
            return res.status(422).json({error:"User is Already Exist with this Email"})
        }
        bcrypt.hash(password,12)
        .then(hashedPassword=>{
            const user = new User({name,email,password:hashedPassword})
            user.save()
            .then(user=>{
               res.json({message:"User Registered, Please Login"})
            })
            .catch(err=>{
                console.log(err)
            })
        })
        .catch(err=>{
            console.log(err)
        })
    })
})

module.exports = router
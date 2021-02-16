const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const auth = require('../middleware/auth')
const Transaction = mongoose.model("Transaction")
const User = mongoose.model("User")

router.post('/addExpense',auth,(req,res)=>{
    var {title,amount} = req.body
    if(!title || !amount){
        return res.status(422).json({error:"Title and Amount is Mandatory Fields"})
    }
    if(req.user.balance === 0){
        return res.status(422).json({error:"To make Expense , Account Balance need to be greater than 0"})
    }
    if(amount > req.user.balance){
        return res.status(422).json({error:"Expense Amount should be less than Current Balance"})
    }

    amount = parseInt(amount)

    req.user.balance= parseInt(req.user.balance) - parseInt(amount)
    req.user.password = undefined
    const balance = req.user.balance

    console.log(balance)

    User.findByIdAndUpdate(req.user._id,{
        $set:{
            balance:req.user.balance
        }
    },(error,data)=>{
        if(error){
            console.log(error)
        }else{
            const transaction = new Transaction({
                account_type:"EXPENSE",
                title,
                amount,
                balance,
                owner:req.user
            })
            transaction.save()
            .then(result=>{
                res.json({message:"Expense Added Successfully!!!",balance})
            })
            .catch(err=>{
                console.log(err)
            })
        }
    })
    
})

router.post('/addIncome',auth,(req,res)=>{
    const {title,amount} = req.body
    if(!title || !amount){
        return res.status(422).json({error:"Title and Amount is Mandatory Fields"})
    }
    req.user.balance = parseInt(req.user.balance) + parseInt(amount)
    req.user.password = undefined
    const balance = req.user.balance

    console.log(balance)

    User.findByIdAndUpdate(req.user._id,{
        $set:{
            balance:req.user.balance
        }
    },(error,data)=>{
        if(error){
            console.log(error)
        }else{
            console.log("success Updated")

            const transaction = new Transaction({
                account_type:"INCOME",
                title,
                amount,
                balance,
                owner:req.user
            })
        
            transaction.save()
            .then(result=>{
                res.json({message:"Income Added Successfully!!!",balance})
            })
            .catch(err=>{
                console.log(err)
            })
        }
    })

    
    
})

router.get('/getTransactions',auth,(req,res)=>{
    Transaction.find({owner:req.user._id})
    .sort({createdAt:-1})
    .then(transaction=>{
        res.json(transaction)
    })
    .catch(err=>{
        console.log(err)
    })
})

module.exports = router
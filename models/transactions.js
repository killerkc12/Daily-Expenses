const mongoose = require('mongoose')
const ObjectId = mongoose.Types.ObjectId

const transactionSchema = new mongoose.Schema({
    account_type:{
        type:String
    },
    title:{
        type:String,
        default:"This is Title"
    },
    amount:{
        type:Number,
        required:true
    },
    balance:{
        type:Number
    },
    owner:{
        type:ObjectId,
        ref:"User"
    }
},{
    timestamps:true
})

mongoose.model("Transaction",transactionSchema)
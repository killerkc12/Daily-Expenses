const mongoose = require('mongoose')
const ObjectId = mongoose.Types.ObjectId

const monthSchema = new mongoose.Schema({
    year:{
        type:String
    },
    month:{
        type:String
    },
    owner:{
        type:ObjectId,
        ref:"User"
    }
},{
    timestamps:true
})

mongoose.model("Month",monthSchema)
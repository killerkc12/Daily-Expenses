const mongoose = require('mongoose')
const ObjectId = mongoose.Types.ObjectId

const daySchema = new mongoose.Schema({
    year:{
        type:String
    },
    month:{
        type:String
    },
    day:{
        type:String
    },
    owner:{
        type:ObjectId,
        ref:"User"
    }
},{
    timestamps:true
})

mongoose.model("Day",daySchema)
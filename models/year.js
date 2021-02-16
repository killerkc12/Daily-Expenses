const mongoose = require('mongoose')
const ObjectId = mongoose.Types.ObjectId

const yearSchema = new mongoose.Schema({
    year:{
        type:String
    },
    owner:{
        type:ObjectId,
        ref:"User"
    }
},{
    timestamps:true
})

mongoose.model("Year",yearSchema)
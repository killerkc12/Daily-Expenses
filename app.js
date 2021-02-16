const express = require('express')
const { MONGOURI } = require('./config/keys')
const mongoose = require('mongoose')
const app = express()
const PORT = process.env.PORT || 5000

mongoose.connect(MONGOURI,{
    useNewUrlParser:true,
    useUnifiedTopology:true
})

mongoose.connection.on("connected",()=>{
    console.log("MongoDB Started !")
})

require('./models/user')
require('./models/transactions')

app.use(express.json())

app.use(require('./routers/user'))
app.use(require('./routers/transaction'))

if(process.env.NODE_ENV=="production"){
    app.use(express.static('client/build'))
    const path = require('path')
    app.get("*",(req,res)=>{
        res.sendFile(path.resolve(__dirname,'client','build','index.html'))
    })
}

app.listen(PORT,()=>{
    console.log("Server is Running on ",PORT)
})
const mongoose = require('mongoose')

const connect = mongoose.connect('mongodb+srv://rachelvu35:Rachel123@cluster0.5mgttdx.mongodb.net/Lofi', {useNewUrlParser : true, useUnifiedTopology : true})

const connection = mongoose.connection

connection.on('error', err => console.log(err))
connection.on('connected', () => console.log('Mongo DB connection successfull'))
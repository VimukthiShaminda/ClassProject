const express = require('express')
var cors = require('cors')
const connection = require('./connection')
const userRoute = require('./routes/user')
const subjectRoute = require('./routes/subjects')
const teacherRoute = require('./routes/teachers')
const billRoute = require('./routes/bill')
const app = express()

app.use(cors())
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use('/user',userRoute)
app.use('/subjects',subjectRoute)
app.use('/teachers',teacherRoute)
app.use('/bill',billRoute)

module.exports = app
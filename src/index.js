const express = require('express')
require('./db/mongoose')
const User = require('./models/user')
const Task = require('./models/task')
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

const app = express()
const port = process.env.PORT 

// app.use((req,res, next) => {

//     next()
// })

app.use(express.json())
app.use(userRouter)
app.use(taskRouter)

//mongod.exe --dbpath=/Users/Surface/mongodb-data


app.listen(port, () => {
    console.log('Server is up on port: ', port)
})


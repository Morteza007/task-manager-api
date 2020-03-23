const mongoose = require('mongoose')

mongoose.connect(process.env.MONGODB_URL,{
    useUnifiedTopology: true,
    useNewUrlParser : true,
    useCreateIndex: true
})


// const task = new Task({
//     description: 'Do your homework!',
//     completed: false
// })

// task.save().then(()=>{
//     console.log(task)
// }).catch((error)=>{
//     console.log('Error', error)
// })

// const me = new User({
//     name: 'Morteza',
//     email: 'morteza@yahoo.com',
//     password: 'Esi098765231',
//     age: 41
// })

// me.save().then(() => {
//     console.log(me)
// }).catch((error) => {
//     console.log('Error' , error)
// })
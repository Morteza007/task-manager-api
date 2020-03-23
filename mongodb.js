const mongodb = require('mongodb')
const MongodbClient = mongodb.MongoClient
const ObjectID = mongodb.ObjectID
const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'

MongodbClient.connect(connectionURL, {useUnifiedTopology: true}, (error, client)=>{
    if(error){
        console.log('Unable connect to database!')
        return
    }
    const db = client.db(databaseName)

    db.collection('users').deleteMany({
        name: 'jalal'
    }).then((result) => {
        console.log(result.deletedCount)
    }).catch((error) => {
        console.log(error)
    })
    // const updatePromise = db.collection('users').updateOne({
    //     name: 'jalal'
    // },{$set: {
    //     age:44
    //     }
    // })

    // updatePromise.then((result) => {
    //     console.log(result.modifiedCount)
    // }).catch((error) =>{
    //     console.log(error)
    // })

    // db.collection('users').findOne({name:'jalal'}, (error,user)=>{

    //     if(error){
    //        return console.log('nashod')
    //     }
        
    //     console.log(user)
    // })

    // db.collection('users').find({age: 41}).toArray((error,users) => {
    //     console.log(users)
    // })

    // const id = new ObjectID()
    // console.log(id)
    // console.log(id.getTimestamp())

    // db.collection('users').insertOne({
    //     name: 'Morteza',
    //     age: 41
    // }, (error, result)=>{
    //     if(error){
    //         return console.log('Unable to insert user!')
    //     }

    //     console.log(result.ops)
    // })

    // db.collection('task').insertMany([
    //     {
    //         description: 'Clean the house!',
    //         completed: true
    //     },
    //     {
    //         description: 'Do your homeworks.',
    //         completed: false
    //     },
    //     {
    //         description: 'Pot plants',
    //         completed: false
    //     }
    // ], (error, result)=>{
    //     if(error){
    //         return console.log('Unable to insert any tasks!')
    //     }
    //     console.log(result.ops)
    // })
})

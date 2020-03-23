const express = require('express')
const User = require('../models/user')
const auth = require('../middelware/auth')
const router = new express.Router()

router.post('/users', async (req,res)=>{
    const user = new User(req.body)
    try{
        await user.save()
        const token = await user.generateAuthToken()
        res.status(201).send({user,token})
    } catch(error){
        res.status(400).send(error)
    }
})

router.post('/users/login', async (req,res) => {
    try{
        const user = await User.findbyCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        res.send({user,token})
    }catch(e){
        console.log(e)
        res.status(400).send(e)

    }
})

router.post('/users/logout', auth, async(req, res) => {
    try{
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })
        await req.user.save()

        res.send()
    }catch(r){
        res.status(500).send()

    }
})

router.post('/users/logoutAll', auth, async (req, res) =>{
    try{
        req.user.tokens = []
        await req.user.save()
        res.send()
    }catch(error){
        res.status(500).send()
    }
})

// router.get('/users', auth, (req,res)=>{
//     User.find({}).then((users) => {
//         res.send(users)
//     }).catch((error) => {
        
//         res.status(404).send(error)
//     })
// })

router.get('/users/me', auth, (req,res)=>{
    res.send(req.user)
})

// router.get('/users/:id', (req,res) => {
//     const _id = req.params.id
//     User.findById(_id).then((user) => {
//         if(!user){
//             return res.status(404).send()
//         }
//         res.status(200).send(user)
//     }).catch((error) => {
//         res.status(400).send(error)
//     })
// })

router.patch('/users/me', auth, async (req,res) => {
    const updates = Object.keys(req.body)
    const allowedUpdate = ['name','email','password','age']
    const isValidOperation = updates.every((update) => allowedUpdate.includes(update))

    if(!isValidOperation){
        return res.status(400).send({error: 'Invalid update!'})
    }
    try{
        
        updates.forEach((update) => req.user[update] = req.body[update])
        await req.user.save()

        //const user = await User.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true})
 
        res.send(req.user)
    } catch(error){
        console.log(error)
        res.status(400).send(error)
    }
})

router.delete('/users/me', auth, async(req,res) => {
    try{
        // const user = await User.findByIdAndDelete(req.user._id)
        // if(!user){
        //     return res.status(404).send()
        // }

        await req.user.remove()
        res.send(req.user)
    }catch(e){
        res.status(400).send(e)
    }
})

module.exports = router
const express = require('express')
const {Support} = require('../db/index')
const router = express.Router()


router.post('/',async(req,res)=>{
    const {problem,username} = req.body
    await Support.create({problem,username})
    res.json("Problem sent successfully")
})

module.exports = router
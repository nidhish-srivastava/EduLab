const express = require('express')
const router = express.Router()
const { University } = require('../db/index')


router.post('/', async (req, res) => {
    const { firstName, lastName, workEmail, mobileNumber, institutionName, jobLevel, country, department } = req.body
    await University.create({
        firstName, lastName, workEmail, mobileNumber, institutionName,  jobLevel, country, department
    })
    res.json({ msg: "Created Successfully" })
})

module.exports = router
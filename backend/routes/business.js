const express = require('express')
const router = express.Router()
const { Business } = require('../db/index')

router.post('/', async (req, res) => {
    const { firstName, lastName, workEmail, mobileNumber, companyName, jobLevel, country, companySize } = req.body
    await Business.create({
        firstName, lastName, workEmail, mobileNumber, companyName,  jobLevel, country, companySize
    })
    res.json({ msg: "Created Successfully" })
})

module.exports = router
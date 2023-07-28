const express = require('express')
const { Course, Cart } = require('../db/index')
const { authenticateJwt } = require('../middleware/auth')
const router = express.Router()


router.post('/purchase/add/:courseId', async (req, res) => {
    //* Problem i am facing is in front end for sending userId 

    //* I guess the express controller logic will work pretty good
    const { courseId } = req.params
    const {userId} = req.body
    const course = await Course.findById(courseId)
    // if (!course) res.status(404).json({ msg: "Course not found" })
    console.log(course);

    let cart = await Cart.findOne({ user: userId })
    if (!cart) {
        cart = new Cart({ user: userId, items: [] })
    }
    cart.items.push({ course: courseId })
    res.json(cart)
    console.log(req.user);
})

module.exports = router

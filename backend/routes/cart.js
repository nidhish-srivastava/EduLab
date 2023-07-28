// const express = require('express')
// const { Course, Cart } = require('../db/index')
// const { authenticateJwt } = require('../middleware/auth')
// const router = express.Router()


// router.post('/purchase/add/:courseId',authenticateJwt, async (req, res) => {
//     const { courseId } = req.params

//     const course = await Course.findById(courseId)
//     if (!course) res.status(404).json({ msg: "Course not found" })

//     // let cart = await Cart.findOne({ user: req.user._id })
//     // if (!cart) {
//         // cart = new Cart({ user: req.user.id, items: [] })
//     // }
//     // cart.items.push({ course: courseId })
//     // res.json(cart)
//     console.log(req.user);
// })

// module.exports = router

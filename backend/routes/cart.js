const express = require('express')
const { Course, Cart } = require('../db/index')
const router = express.Router()


router.post('/purchase/add/:courseId', async (req, res) => {
  //* Problem i am facing is in front end for sending userId 

  //* I guess the express controller logic will work pretty good
  const { courseId } = req.params
  const { username } = req.body
  const course = await Course.findById(courseId)
  if (!course) res.status(404).json({ msg: "Course not found" })
  // console.log(course);

  // Check if the user already has a cart
  let cart = await Cart.findOne({ user: username });
  if (!cart) {
    // If the cart doesn't exist, create a new one
    cart = new Cart({
      user: username,
      items: [{ course: courseId }]
    })
  }
  else {
    const courseInCart = cart.items.find((item) => item.course.toString() === courseId)
    if (courseInCart) {
      courseInCart.quantity += 1
    }
    else {
      cart.items.push({ course: courseId })  // We push the course inside the array when the course is new
    }
  }
  await cart.save()
  res.json(cart)
})

router.get('/:username', async (req, res) => {
  const { username } = req.params
  const cart = await Cart.findOne({ user: username }).populate('items.course')

  // Extract cartItems from the cart and send the response
  const cartItems = cart?.items.map((item) => item.course);
  const quantity = cart?.items.quantity
  res.json({cartItems,quantity})
})

module.exports = router

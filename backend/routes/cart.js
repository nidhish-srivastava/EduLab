const express = require('express')
const { Course, Cart } = require('../db/index')
const { authenticateJwt } = require('../middleware/auth')
const router = express.Router()


router.post('/purchase/add/:courseId', authenticateJwt,async (req, res) => {

  const { courseId } = req.params
  const { username } = req.body
  try {
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
        // courseInCart.quantity += 1
        res.json({msg : "Course already inside cart"})
        return  //* if we dont return then it will show error coz of the save method after the if else construct
      }
        cart.items.push({ course: courseId })  // We push the course inside the array when the course is new
    }
    await cart.save()
    res.json(cart)
  }
  catch (error) {
    res.status(401).json("Login to Continue")
  }
})

router.post('/purchase/delete/:courseId',async(req,res)=>{
  const { courseId } = req.params
  const { username,cartDocumentId } = req.body
  try {
    //* ISince there are many documents inside our cart collection,first it will find the user
    //* No need to first fint the user inside the cartCollection,if this happens then we wont be able to access the whole document
    // let cart = await Cart.findOne({ user: username }); 
    // I am getting the filtered array but i am not able to mutate the original cart
    // const filtered = cart.items.filter((e)=>e.course!=courseId)
    // const updateCart = new Cart(filtered)
    // await updateCart.save()
    const updateCourseArray = await Cart.updateOne({_id : cartDocumentId},{$pull : {items : {course : courseId}}})
  } catch (error) {
         
  }
})

router.get('/:username',  async (req, res) => {
  const { username } = req.params
  const cart = await Cart.findOne({ user: username }).populate('items.course')

  // Extract cartItems from the cart and send the response
  const cartItems = cart?.items.map((item) => item.course);
  const quantity = cart?.items.quantity
  res.json({cartItems,quantity,cart})
})



module.exports = router

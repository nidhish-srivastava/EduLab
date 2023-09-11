const express = require('express')
const { authenticateJwt, SECRET } = require('../middleware/auth')
const { Course, Cart } = require('../db/index')
const router = express.Router()
const jwt = require('jsonwebtoken')

//* Since i want that user can see all the courses despite of logging or signup,so we dont use jwtAuth
router.get('/courses', async (req, res) => {
    const courses = await Course.find()
    res.json({ courses })
})


router.get('/course/:courseId', async (req, res) => {
    const courseId = req.params.courseId;
    const course = await Course.findById(courseId);
    res.json(course);
});

// router.post('/courses/:courseId',authenticateJwt,async(req,res)=>{
//     const course = await Course.findById(req.params.courseId)
//     console.log(course);
//     if(course){
//         const user = await User.findOne({username : req.user.username})
//         if(user){
//             user.purchasedCourses.push(course)
//             await user.save()
//             res.json({ message: 'Course purchased successfully' });
//         }
//         else{
//             res.status(403).json({message : "User not found"})
//         }
//     }
//     else{
//         res.status(403).json({message : "Course not found"})
//     }
// })

// router.get('/purchasedCourses', authenticateJwt, async (req, res) => {
//     const user = await User.findOne({ username: req.user.username }).populate('purchasedCourses');
//     if (user) {
//       res.json({ purchasedCourses: user.purchasedCourses || [] });
//     } else {
//       res.status(403).json({ message: 'User not found' });
//     }
//   });

module.exports = router

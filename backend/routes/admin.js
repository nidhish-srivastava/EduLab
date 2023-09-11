const express = require('express')
const { Course, Auth } = require('../db/index')
const multer = require('multer')
const jwt = require('jsonwebtoken')
const { SECRET, authenticateJwt } = require('../middleware/auth')
const fs = require('fs')
const uploadMiddleware = multer({ dest: 'images/' })


const router = express.Router()

router.get('/me', authenticateJwt, async (req, res) => {
    const admin = await Auth.findOne({ username: req.user.username })
    if (!admin) {
        res.status(403).json({ msg: "User doesnt exist" })
        return
    }
    res.json({
        username: admin.username,
    })
})

router.post('/signup', async (req, res) => {
    const { username, password } = req.body
    const admin = await Auth.findOne({ username })
    if (admin) {
        res.status(403).json({ message: 'User already exists' })
    }
    else {
        const newAdmin = new Auth({ username: username, password: password })
        newAdmin.save()

        const token = jwt.sign({ username, role: 'admin' }, SECRET, { expiresIn: '1h' })
        res.json({ message: 'User created successfully', token })
    }
})

router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const admin = await Auth.findOne({ username, password });
    if (admin) {
        const token = jwt.sign({ username, role: 'admin' }, SECRET, { expiresIn: '1h' });
        res.json({ message: 'Logged in successfully', token, admin });
    } else {
        res.status(403).json({ message: 'Invalid username or password' });
    }
});

router.post('/create-course',uploadMiddleware.single('file'), async (req, res) => {
    const { originalname, path } = req.file
    const parts = originalname.split('.');
    const ext = parts[parts.length - 1];
    const newPath = path + '.' + ext;
    fs.renameSync(path, newPath)

    const {title,description,published,price,author} = req.body
 
    const course = await Course.create({
        title,
        description,
        price,
        imageLink : newPath,
        published,
        author
    }
    );
    res.json({ message: 'Course created successfully', courseId: course.id });
});

router.put('/course/:courseId',async (req, res) => {
    // const course = await Course.findByIdAndUpdate(req.params.courseId, req.body, { new: true });
    const {bodyContent} = req.body
    const response = await Course.updateOne({_id : req.params.courseId},bodyContent)
    res.status(200).json({msg : "Updated Successfully",response})
});

router.get('/courses/:username', authenticateJwt, async (req, res) => {
    try {
        const admin = await Auth.findOne({ username: req.user.username })
            const courses = await Course.find({author : admin.username});  //* since we are using ref(if we need to access author,then we need to use populate method)
            res.json({ courses });
    } catch (error) {
        res.status(500).json("Server")
    }
});

router.get('/course/:courseId', authenticateJwt, async (req, res) => {
    const courseId = req.params.courseId;
    const course = await Course.findById(courseId);
    res.json({ course });
});

router.delete('/course/:courseId',authenticateJwt,async(req,res) => {
    const courseId = req.params.courseId;
    await Course.findByIdAndDelete(courseId)
    res.json("Deleted successfully")
})


module.exports = router
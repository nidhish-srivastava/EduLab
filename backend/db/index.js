const mongoose = require("mongoose");

const AuthSchema = new mongoose.Schema({
  username: String,
  password: String
});

const courseSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  imageLink: String,
  published: Boolean,
  category: String,
  author: String
  // author : { type: mongoose.Schema.Types.ObjectId, ref: 'User' }  // if i use this,then i wont be able to use it when i dont login/signup since it needs authSchma
});

const businessRegisterSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  workEmail: String,
  mobileNumber: Number,
  companyName: String,
  jobLevel: String,
  country: String,
  companySize: String
})

const supportSchema = new mongoose.Schema({
  problem : String,
  username : String 
})

const universityRegisterSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  workEmail: String,
  mobileNumber: Number,
  institutionName: String,
  jobLevel : String,
  country : String,
  department : String
})

const cartSchema = new mongoose.Schema({
  user: {   // i could have used ref but there are problems in that as well
    type: String,
    required: true,
  },
  items: [
    {
      course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
        required: true,
      },
      quantity: {
        type: Number,
        default: 1,
      },
    },
  ],
});


const Auth = mongoose.model('Admin', AuthSchema);
const Course = mongoose.model('Course', courseSchema);
const Business = mongoose.model('Business', businessRegisterSchema)
const Support = mongoose.model('Support',supportSchema)
const University = mongoose.model('University',universityRegisterSchema)
const Cart = mongoose.model('Cart',cartSchema)

module.exports = {
  Auth,
  Course,
  Business,
  Support,
  University,
  Cart
}
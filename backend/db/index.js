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
  jobTitle: String,
  jobLevel: String,
  country: String,
  companySize: String
})

const supportSchema = new mongoose.Schema({
  problem : String
})

const Auth = mongoose.model('Admin', AuthSchema);
const Course = mongoose.model('Course', courseSchema);
const Business = mongoose.model('Business', businessRegisterSchema)
const Support = mongoose.model('Support',supportSchema)

module.exports = {
  Auth,
  Course,
  Business,
  Support
}
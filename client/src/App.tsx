import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import SignIn from "./components/Auth/SignIn";
import SignUp from "./components/Auth/SignUp";
import MyCourses from "./components/CreatingCourses/MyCourses";
import Course from "./components/CreatingCourses/Course";
import CreateCourse from "./components/CreatingCourses/CreateCourse";
import UpdateCourse from "./components/CreatingCourses/UpdateCourse";
import Home from "./components/HomePage";
import Instructor from "./components/CreatingCourses/Instructor";
import HomePageCourse from "./components/HomePageCourse";
import Business from "./components/Business/Business";
import Support from "./components/HelpDesk/Support";
import Profile from './components/Profile'
import University from "./components/University/University";
import Cart from "./components/Cart/Cart";
import CourseHomePage from "./components/CourseHomePage";
// import Payment from "./components/Cart/Payment";

function App() {
  return (
    <div className="main-app-container">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/my-profile" element = {<Profile/>} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/" element={<Home />} />
          {/* <Route path="/:courseId" element={<HomePageCourse />} /> */}
          <Route path="/:courseId" element = {<CourseHomePage/>} />
          <Route path="/cart" element = {<Cart/>} />
          {/* <Route path="/payment" element = {<Payment/>} /> */}
          <Route path="/edulab-business" element={<Business />} />
          <Route path="/edulab-university" element = {<University/>} />
          <Route  path="/instructor" element={<Instructor />} />
          <Route path="/instructor/my-courses" element={<MyCourses />} />
          <Route path="/instructor/create-course" element={<CreateCourse />} />
          <Route path="/instructor/my-courses/:courseId" element={<Course />} />
          <Route
            path="/instructor/update-course/:courseId"
            element={<UpdateCourse />}
          />
          <Route path="/support" element = {<Support/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

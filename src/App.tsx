import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom'
import Navbar from './components/Navbar'
import SignIn from './components/SignIn'
import SignUp from './components/SignUp'
import MyCourses from './components/MyCourses'
import Course from './components/Course'
import CreateCourse from './components/CreateCourse'
import UpdateCourse from './components/UpdateCourse'
import Home from './components/Home'
import Instructor from './components/Instructor'
import HomePageCourse from './components/HomePageCourse'
import Business from './components/Business'

function App() {
  return (
    <div className='main-app-container'>
    <BrowserRouter>
    <Navbar/>
    <Routes>
      <Route path='/signin' element = {<SignIn/>} /> 
      <Route path='/signup' element = {<SignUp/>} />
      <Route path='/' element = {<Home/>} />
      <Route path='/:courseId' element = {<HomePageCourse/>} />
      
      <Route path='/edulab-business' element = {<Business/>} />

      <Route path='/instructor' element = {<Instructor/>} />
      <Route path='/instructor/my-courses' element = {<MyCourses/>} />
      <Route path='/instructor/create-course' element = {<CreateCourse/>} />
      <Route path='/instructor/my-courses/:courseId' element = {<Course/>} />
      <Route path='/instructor/update-course/:courseId' element = {<UpdateCourse/>} />
    </Routes>
    </BrowserRouter>
    </div>
  )
}

export default App
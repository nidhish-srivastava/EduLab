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
import Courses from './components/Courses'
import Instructor from './components/Instructor'
import HomePageCourse from './components/HomePageCourse'

function App() {
  return (
    <div className='main-app-container'>
    <BrowserRouter>
    <Navbar/>
    <Routes>
      <Route path='/signin' element = {<SignIn/>} /> 
      <Route path='/signup' element = {<SignUp/>} />
      <Route path='/' element = {<Courses/>} />
      <Route path='/:courseId' element = {<HomePageCourse/>} />

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
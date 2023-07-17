import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom'
import Navbar from './components/Navbar'
import SignIn from './components/SignIn'
import SignUp from './components/SignUp'
import Courses from './components/Courses'
import Course from './components/Course'
import AddCourse from './components/AddCourse'

function App() {
  return (
    <div className='main-app-container'>
    <BrowserRouter>
    <Navbar/>
    <Routes>
      <Route path='/signin' element = {<SignIn/>} /> 
      <Route path='/signup' element = {<SignUp/>} />
      <Route path='/courses' element = {<Courses/>} />
      <Route path='/courses/:courseId' element = {<Course/>} />
      <Route path='/addcourse' element = {<AddCourse/>} />
    </Routes>
    </BrowserRouter>
    </div>
  )
}

export default App
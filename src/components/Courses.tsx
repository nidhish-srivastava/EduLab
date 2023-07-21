import axios from "axios"
import { useEffect, useState } from "react"
import { courseType } from "./MyCourses"
import CourseResultCard from "./CourseResultCard"

function Courses() {
  const [data,setData] = useState([])

  const fetchPosts = async() =>{  //* No need to pas headers since aint using jwt auth
    const response = await axios.get(`http://localhost:3000/user/courses`)
    setData(response.data.courses)
  }
  useEffect(()=>{
    fetchPosts()
  },[])
  return (
 <div className="courses-container">
      {data.map((course : courseType) => {
        return (
        <CourseResultCard course = {course} />
        );
      })}
    </div>
  )
}

export default Courses
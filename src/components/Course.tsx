import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { courseType } from "./Courses"
import axios from "axios"

function Course() {
  const {courseId} = useParams() 
  const [course,setCourse] = useState<courseType>()
  const navigate = useNavigate()

  const fetchCourse = async()=>{
    const response = await axios.get(`http://localhost:3000/admin/course/${courseId}`,{
      headers : {
        "Authorization" : "Bearer " + localStorage.getItem("token")
      }
    })
    console.log(response.data);
    
    setCourse(response.data.course)
  }

  const deleteHandler = async() =>{
    const response = await axios.delete(`http://localhost:3000/admin/course/${courseId}`,{
      headers : {
        "Authorization" : "Bearer " + localStorage.getItem("token")
      }
    })
    alert(response.data)
    navigate('/courses')
  }

  useEffect(()=>{
      fetchCourse()
  },[])
  return (
    <div>
      <h2>{course?.title}</h2>
      <h2>{course?.description}</h2>
      <h2>{course?.price}</h2>
      <img src={course?.imageLink} alt="" />
      <button onClick={deleteHandler} >Delete</button>
      <button>Update</button>
    </div>
  )
}

export default Course
import { useEffect} from "react"
import { useNavigate, useParams } from "react-router-dom"
import axios from "axios"
import { useCourseContext } from "../context/context"

function Course() {
  const {courseId} = useParams() 
  const final = useCourseContext()
  const navigate = useNavigate()

  const fetchCourse = async()=>{
    const response = await axios.get(`http://localhost:3000/admin/course/${courseId}`,{
      headers : {
        "Authorization" : "Bearer " + localStorage.getItem("token")
      }
    })
    console.log(response.data);
    final?.setCourse(response.data.course)
  }

  const deleteHandler = async() =>{
    const response = await axios.delete(`http://localhost:3000/admin/course/${courseId}`,{
      headers : {
        "Authorization" : "Bearer " + localStorage.getItem("token")
      }
    })
    alert(response.data)
    navigate('/instructor')
  }

  useEffect(()=>{
      fetchCourse()
  },[])

  return (
    <div>
      <h2>{final?.course?.title}</h2>
      <h2>{final?.course?.description}</h2>
      <h2>{final?.course?.price}</h2>
      <img src={final?.course?.imageLink} alt="" />
      <button onClick={deleteHandler} >Delete</button>
      <button onClick={()=>navigate(`/instructor/update-course/${courseId}`)} >Update</button>
    </div>
  )
}

export default Course
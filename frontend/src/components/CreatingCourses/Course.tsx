import { useEffect} from "react"
import { useNavigate, useParams } from "react-router-dom"
import axios from "axios"
import { useCourseContext } from "../../context/context"

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
    // console.log(response.data);
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
      <div className="individual-course-card-home-page">
    <div className="image-wrapper">
    <img src={`http://localhost:3000/${final?.course?.imageLink}`} alt="" />
    </div>
    <div className="right-side">
      <div>
    <h1>{final?.course?.title}</h1>
    <p>{final?.course?.description}</p>
      </div>
      <div>
    <h2>&#8377;{final?.course?.price}</h2>
    <div className="edit-btn-row">
      <button onClick={deleteHandler} >Delete</button>
      <button onClick={()=>navigate(`/instructor/update-course/${courseId}`)} >Update</button>
      </div>
    </div>
    </div>
    </div>
  )
}

export default Course
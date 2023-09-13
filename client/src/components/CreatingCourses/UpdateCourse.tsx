import { useState } from "react"
import { useCourseContext } from "../../context/context"
import axios from "axios"
import { useNavigate, useParams } from "react-router-dom"
import { courseType } from "./MyCourses"

function UpdateCourse() {
  const {courseId} = useParams()
  const navigate = useNavigate()
    const final = useCourseContext()
    const [updateFormData,setUpdateFormData] = useState<Partial<courseType>>({
      title : final?.course?.title,
      description : final?.course?.description,
      imageLink : final?.course?.imageLink,
      price : final?.course?.price
    })

    const changeHandler = (e : React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>{
      setUpdateFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    }
    const updatehandler = async() =>{
      await axios.patch(`http://localhost:3000/admin/${courseId}`,{
        updateFormData
      },{
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        }
      })
      alert('Updated Successfully')
      navigate('/instructor')
    }

  return (
    <div className="update-container">
      <input type="text" value={updateFormData.title} onChange={changeHandler}/>
      <textarea cols={30} rows={3} value={updateFormData.description} onChange={changeHandler}/>
      <input  type="number" value={updateFormData.price} onChange={changeHandler}/>
      <button onClick={updatehandler} >Update</button>
    </div>
  )
}

export default UpdateCourse
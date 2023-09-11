import { useState } from "react"
import { useCourseContext } from "../../context/context"
import axios from "axios"
import { useNavigate, useParams } from "react-router-dom"

function UpdateCourse() {
  const {courseId} = useParams()
  const navigate = useNavigate()
    const final = useCourseContext()
    const [title,setTitle] = useState(final?.course?.title)
    const [description,setDescription] = useState(final?.course?.description)
    const [image,_] = useState(final?.course?.imageLink)
    const [price,setPrice] = useState(final?.course?.price)

    const updatehandler = async() =>{
      const bodyContent  = {
        title : title,
        description : description,
        price : price,
        imageLink : image,
        published : true,
      }
      await axios.put(`http://localhost:3000/admin/course/${courseId}`,{
        bodyContent
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
      <input type="text" value={title} onChange={e=>setTitle(e.target.value)}/>
      <textarea cols={30} rows={3} value={description} onChange={e=>setDescription(e.target.value)}/>
      <input  type="number" value={price} onChange={e=>setPrice(Number(e.target.value))}/>
      <button onClick={updatehandler} >Update</button>
    </div>
  )
}

export default UpdateCourse
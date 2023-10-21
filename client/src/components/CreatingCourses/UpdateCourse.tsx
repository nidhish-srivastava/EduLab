import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { courseType } from "./MyCourses"
import { fetchCoursePromise } from "../CourseHomePage"


function UpdateCourse() {
  const {courseId} = useParams()
  const navigate = useNavigate()
    const [updateFormData,setUpdateFormData] = useState<courseType>()

    const changeHandler = (e : React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>{
      setUpdateFormData((prev : any) => {
        if (prev) {
          return { ...prev, [e.target.name]: e.target.value };
        } else {
          // Handle the case when `prev` is undefined
          return { [e.target.name]: e.target.value };
        }
      });
    }
    const updatehandler = async() =>{
      try {
        const response = await fetch(`http://localhost:3000/admin/${courseId}`,{
           headers: {
             Authorization: "Bearer " + localStorage.getItem("token"),
             "Content-Type" : "application/json"
           },
          body : JSON.stringify({updateFormData : updateFormData}),
          method : "PATCH"
         })
        const data = await response.text()
        if(response.status==201){
          alert(data)
          navigate('/instructor/my-courses')
        }
      } catch (error) {
        
      }
    }

    useEffect(()=>{
      const fetchCourse = async () => {
        const data = await fetchCoursePromise(courseId)
        setUpdateFormData(data)
      };
      fetchCourse()
    },[])

  return (
    <div className="update-container">
      <input type="text" name="title" value={updateFormData?.title} onChange={changeHandler}/>
      <textarea cols={30} rows={3} name="description" value={updateFormData?.description} onChange={changeHandler}/>
      <input  type="number" name="price" value={updateFormData?.price} onChange={changeHandler}/>
      <button onClick={updatehandler}>Update</button>
    </div>
  )
}

export default UpdateCourse
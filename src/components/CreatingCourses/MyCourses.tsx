import { useState,useEffect } from "react";
import { useCourseContext } from "../../context/context";
import CourseResultCard from "../CourseResultCard";

export type courseType = {
  title : string
  imageLink : string
  description : string
  price : number
  _id ?: number
  author?: string
}

function MyCourses() {
  const final = useCourseContext()
  const [coursesArray, setCoursesArray] = useState([]);
  const fetchData = async () => {
    try {
      
    const response = await fetch(`http://localhost:3000/admin/courses/${final?.userEmail}`, {
      method : "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      }
    });
    const data = await response.json();
    setCoursesArray(data.courses);
    } catch (error) {

    }
  };
  
  useEffect(() => {
      fetchData()
  }, [])
  
  return (
    <>
      <h2>Hello {final?.userEmail}</h2>
    <div className="courses-container">
      {coursesArray?.map((course : courseType) => {
        return (
         <CourseResultCard course={course} />
         );
        })}
    </div>
        </>
  );
}

export default MyCourses;

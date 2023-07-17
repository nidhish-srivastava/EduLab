import { useState,useEffect } from "react";
import { Link } from "react-router-dom";
import { useCourseContext } from "../context/context";

export type courseType = {
  title : string
  imageLink : string
  description : string
  price : number
  _id ?: number
}

function Courses() {
  const final = useCourseContext()
  const [coursesArray, setCoursesArray] = useState([]);
  const fetchData = async () => {
    const response = await fetch(`http://localhost:3000/admin/courses/${final?.userEmail}`, {
      method : "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      }
    });
    const data = await response.json();
    setCoursesArray(data.courses);
  };
  
  useEffect(() => {
    fetchData()
  }, [])
  
  return (
    <div className="courses-container">
      {coursesArray?.map((course : courseType) => {
        return (
          <Link to={`/courses/${course._id}`}>
            <div className="course-card">
            <h2>{course.title}</h2>
            <h2>{course.description}</h2>
            <h2>{course.price}</h2>
            <img src={course.imageLink} alt="" />
            </div>
          </Link>
        );
      })}
    </div>
  );
}

export default Courses;

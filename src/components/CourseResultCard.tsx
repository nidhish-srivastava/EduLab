import { courseType } from "./MyCourses"
import { Link } from "react-router-dom"

type CourseResultCardProp = {
    course : courseType
}

function CourseResultCard({course} : CourseResultCardProp ) {
  return (
    <Link to={`${course._id}`}>
    <div className="course-card">
    <img src={`http://localhost:3000/${course.imageLink}`} alt="" className="course-img" />
    <h2>Title:{course.title}</h2>
    <h2>Desc:{course.description}</h2>
    <h2>Price:{course.price}</h2>
    <h2>Author : {course.author}</h2>
    </div>
  </Link>
  )
}

export default CourseResultCard
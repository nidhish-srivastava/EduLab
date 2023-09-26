import { courseType } from "./CreatingCourses/MyCourses";
import { Link } from "react-router-dom";

type CourseResultCardProp = {
  course: courseType;
};

function CourseResultCard({ course }: CourseResultCardProp) {
  return (
    <div>
    <Link to={`${course._id}`}>
      <div className="course-card">
        <div className="api-image-wrapper">
          <img
            src={course.imageLink}
            alt={course.title}
            loading="lazy"
            className="course-img"
            />
        </div>
        <div className="content-wrapper">
        <h3 className="title" >{course.title}</h3>
        <h4 className="author" > {course.author}</h4>
        <h3 className="price">
        &#8377;{course.price}
          </h3>
        </div>
      </div>
    </Link>
            </div>
  );
}

export default CourseResultCard;

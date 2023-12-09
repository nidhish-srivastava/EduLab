import { courseType } from "./CreatingCourses/MyCourses";
import { Link } from "react-router-dom";

type CourseResultCardProp = {
  course: courseType;
};

export const dateFormatter = (date: Date | string | number) => {
  const currentDate = new Date(date);
  const formattedDate = currentDate.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
  return formattedDate;
};

function CourseResultCard({ course }: CourseResultCardProp) {
  return (
      <Link to={`/course/${course.title}/${course._id}`}>
        <div className="course-card">
          <div className="api-image-wrapper">
            <img
              src={course.imageLink}
              alt={course.title}
              loading="lazy"
            />
          </div>
          <div className="content-wrapper">
            <h3 className="title">{course.title}</h3>
            <h4 className="author"> {course.author}</h4>
            <h3 className="price">&#8377;{course.price}</h3>
            <h5>
              {dateFormatter(course.createdAt as Date | string | number)}
            </h5>
          </div>

        </div>
      </Link>
  );
}

export default CourseResultCard;

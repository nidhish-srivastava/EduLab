import { useEffect,useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { courseType } from "./MyCourses";
import { fetchCoursePromise } from "../CourseHomePage";

function Course() {
  const { courseId } = useParams();
  const [course,setCourse] = useState<courseType>()
  const navigate = useNavigate();

  const fetchCourse = async () => {
    const data = await fetchCoursePromise(courseId)
    setCourse(data)
  };

  const deleteHandler = async () => {
    await fetch(
      `http://localhost:3000/admin/${courseId}`,
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        method : "DELETE"
      }
    );
    alert("Deleted successfully");
    navigate("/instructor");
  };

  useEffect(() => {
    fetchCourse();
  }, []);

  return (
    <div className="individual-course-card-home-page">
      <div className="image-wrapper">
        <img src={course?.imageLink} alt="" loading="lazy" />
      </div>
      <div className="right-side">
        <div>
          <h1>{course?.title}</h1>
          <p>{course?.description}</p>
        </div>
        <div>
          <h2>&#8377;{course?.price}</h2>
          <div className="edit-btn-row">
            <button onClick={deleteHandler}>Delete</button>
            <button
              onClick={() => navigate(`/instructor/update-course/${courseId}`)}
            >
              Update
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Course;

import axios from "axios";
import { useEffect,useState } from "react";
import { useParams } from "react-router-dom";
import { courseType } from "./CreatingCourses/MyCourses";

function HomePageCourse() {
  const { courseId } = useParams();
  const [courseObject,setCourseObject] = useState<courseType>()
  const fetchCourse = async () => {
    const response = await axios.get(
      `http://localhost:3000/user/course/${courseId}`
    );
    console.log(response.data);
    setCourseObject(response.data)
  };
  useEffect(() => {
    fetchCourse();
  }, []);

  return <div className="home-page-course-card">
    <h2>{courseObject?.title}</h2>
    <p>{courseObject?.description}</p>
    <img src={`http://localhost:3000/${courseObject?.imageLink}`} alt="" />
    <h2>{courseObject?.price}</h2>
    <button>Buy Now</button>
    <button>Add to Cart</button>
  </div>;
}

export default HomePageCourse;

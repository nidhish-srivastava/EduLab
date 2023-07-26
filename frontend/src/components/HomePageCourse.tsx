import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { courseType } from "./CreatingCourses/MyCourses";
import { useCourseContext } from "../context/context";

function HomePageCourse() {
  const { courseId } = useParams();
  const final = useCourseContext();
  const [courseObject, setCourseObject] = useState<courseType>();
  const fetchCourse = async () => {
    const response = await axios.get(
      `http://localhost:3000/user/course/${courseId}`
    );
    console.log(response.data);
    setCourseObject(response.data);
  };
  useEffect(() => {
    fetchCourse();
  }, []);

  return (
    <>
      <div className="individual-course-card-home-page">
        <div className="image-wrapper">
          <img
            src={`http://localhost:3000/${courseObject?.imageLink}`}
            alt=""
          />
        </div>
        <div className="right-side">
          <div>
            <h1>{courseObject?.title}</h1>
            <p>{courseObject?.description}</p>
          </div>
          <div>
            <h2>&#8377;{courseObject?.price}</h2>
            {courseObject?.author !== final?.userEmail && (
              <div className="buy-btn-row">
                <button>Buy Now</button>
                <button>Add to Cart</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default HomePageCourse;

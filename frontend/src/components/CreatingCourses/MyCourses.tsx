import { useState, useEffect } from "react";
import { useCourseContext } from "../../context/context";
import CourseResultCard from "../CourseResultCard";
import { Link } from "react-router-dom";
export type courseType = {
  title: string;
  imageLink: string;
  description: string;
  price: number;
  _id?: number;
  author?: string;
};

function MyCourses() {
  const final = useCourseContext();
  const [coursesArray, setCoursesArray] = useState([]);
  const fetchData = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/admin/courses/${final?.userEmail}`,
        {
          method: "GET",
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      const data = await response.json();
      // console.log(data);
      
      setCoursesArray(data.courses);
    } catch (error) {}
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <h2 style={{ textAlign: "center", fontFamily: "Montserrat" }}>
        Hello {final?.userEmail}
      </h2>
        <Link to={`/instructor/create-course`}>
          <div style={{ padding: "2rem", textAlign: "center" }}>
            <button className="start-creating-btn">
              Create Courses !!!
            </button>
          </div>
        </Link>
      <div className="my-courses-container">
        {coursesArray?.map((course: courseType) => {
          return <CourseResultCard course={course} />;
        })}
      </div>
    </>
  );
}

export default MyCourses;

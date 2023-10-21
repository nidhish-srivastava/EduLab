import { useState, useEffect } from "react";
import { useCourseContext } from "../../context/context";
import CourseResultCard from "../CourseResultCard";
import { Link } from "react-router-dom";
import { baseUrl } from "../../utils";

export type   courseType = {
  title: string;
  imageLink : string;
  description: string;
  price : number | string
  _id?: number;
  author?: string;
};

function MyCourses() {
  const final = useCourseContext();
  const [coursesArray, setCoursesArray] = useState<courseType[]>([]);
  const fetchData = async () => {
    try {
      const response = await fetch(
        `${baseUrl}/admin/${final?.userName}`,
        {
          method: "GET",
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      const data = await response.json();
      console.log(data);
      setCoursesArray(data);
    } catch (error) {}
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <h2 style={{ textAlign: "center", fontFamily: "Montserrat" }}>
        Hello {final?.userName}
      </h2>
        <Link to={`/instructor/create-course`}>
          <div style={{ padding: "2rem", textAlign: "center" }}>
            <button className="start-creating-btn">
              Create Courses !!!
            </button>
          </div>
        </Link>
      <div className="my-courses-container">
        {coursesArray?.map((e,i)=>(
          <CourseResultCard course={e} key={i}/>
        ))}
      </div>
    </>
  );
}

export default MyCourses;

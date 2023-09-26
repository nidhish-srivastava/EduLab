import { useEffect, useState } from "react";
import { courseType } from "./CreatingCourses/MyCourses";
import CourseResultCard from "./CourseResultCard";

function Home() {
  const [data, setData] = useState<courseType[]>([]);

  const fetchPosts = async () => {
    //* No need to pas headers since aint using jwt auth
    const response = await fetch(`http://localhost:3000/user`);
    const data = await response.json();
    setData(data);
  };
  useEffect(() => {
    fetchPosts();
  }, []);
  return (
    <div className="courses-container">
      {data?.map((course, i) => {
        return <CourseResultCard course={course} key={i} />;
      })}
    </div>
  );
}

export default Home;

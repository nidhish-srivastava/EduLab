import { useEffect, useState } from "react";
import { courseType } from "./CreatingCourses/MyCourses";
import CourseResultCard from "./CourseResultCard";
import { useSearchParams } from "react-router-dom";

function Home() {
  const [data, setData] = useState<courseType[]>([]);
  const [searchParam, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState("");

  const fetchPosts = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/user?title=${searchTerm}`
      );
      const data = await response.json();
      setData(data);
      if (data.length == 0)
        setSearchParams({ searchUserParam: `${searchTerm} not found` });
    } catch (error) {}
  };
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchPosts();
      if (searchTerm.length > 1)
        setSearchParams({ searchUserParam: searchTerm });
      else setSearchParams({});
    }, 700);
    return () => clearInterval(timer);
  }, [searchTerm]);

  return (
    <>
      <div className="search-bar-container" style={{ textAlign: "center", marginTop: "2rem" }}>
        <input
          value={searchTerm}
          type="search"
          placeholder="Tap Here to Search"
          className="search-bar"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <h3 style={{textAlign : "center",marginTop:"1rem",fontFamily : "Montserrat,sans-serif"}}>{searchParam.get("searchUserParam")}</h3>
      <div className="courses-container">
        {data?.map((course, i) => {
          return <CourseResultCard course={course} key={i} />;
        })}
      </div>
    </>
  );
}

export default Home;

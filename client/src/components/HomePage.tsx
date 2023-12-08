import { useEffect, useState } from "react";
import { courseType } from "./CreatingCourses/MyCourses";
import { useSearchParams } from "react-router-dom";
import { baseUrl } from "../utils";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { lazy, Suspense } from 'react';
const CourseResultLazy = lazy(()=>import ("./CourseResultCard"))


function Home() {
  const [data, setData] = useState<courseType[]>([]);
  const [searchParam, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState("");
  const [loading,setLoading] =useState(false)

  const fetchPosts = async () => {
    setLoading(true)
    try {
      const response = await fetch(
        `${baseUrl}/user?title=${searchTerm}`
      );
      const data = await response.json();
      setLoading(false)
      setData(data);
      if (data.length == 0)
        setSearchParams({ searchUserParam: `${searchTerm} not found` });
    } catch (error) {
      setLoading(false)
    }
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
          placeholder="Search based on course name"
          className="search-bar"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <h3 style={{textAlign : "center",marginTop:"1rem",fontFamily : "Montserrat,sans-serif"}}>{searchParam.get("searchUserParam")}</h3>
      <div style={{width : "80%",margin : "0 auto"}}>
        {
          loading && <div style={{width : "80%",margin :"4rem auto"}}>
            <Skeleton count={5}/>
            </div>
        }
        </div>
      <div className="courses-container">
        {data?.map((course, i) => {
          return(
            <Suspense fallback = {<Skeleton/>}>
              <CourseResultLazy course={course} key={i} />
            </Suspense>
          ) 
        })}
      </div> 
    </>
  );
}

export default Home;

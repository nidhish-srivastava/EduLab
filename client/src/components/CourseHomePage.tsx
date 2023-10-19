import { useEffect, useState } from "react";
import { useCourseContext } from "../context/context";
import { useParams } from "react-router-dom";
import { courseType } from "./CreatingCourses/MyCourses";


const CourseHomePage = () => {
  const { courseId } = useParams();
  const final = useCourseContext();
  const [courseObject, setCourseObject] = useState<courseType>();
  const [check,setCheck] = useState(false)

  const fetchCoursePromise = async (): Promise<courseType> => {
    const response = await fetch(`http://localhost:3000/user/${courseId}`);
    return response.json()
  };

  const loggedInUserCartCheckPromise = async (): Promise<boolean> => {
    const response = await fetch(
      `http://localhost:3000/cart/${courseId}/${JSON.parse(sessionStorage.getItem("userEmail") || "")}`
    );
    return response.json();
  };

  
  const addToCart = async (): Promise<any> => {
    if(final?.userEmail.length == 0) {
      alert("Login to purchase")
      return
    }
    try {
      await fetch(`http://localhost:3000/cart/${courseId}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        body: JSON.stringify({ username: final?.userEmail }),
        method: "POST",
      });
    } catch (error) {
      // alert("Login/SignUp to buy a course");
    }
  };
  
  useEffect(() => {
    const fetchCartItemsHandler = async () => {
      try {
        const fetchCourseResult = await fetchCoursePromise();
        setCourseObject(fetchCourseResult);
  
        // Introduce a delay using setTimeout
        const timerId = setTimeout(async () => {
          const loggedInUserCartCheckResult = await loggedInUserCartCheckPromise();
          console.log(loggedInUserCartCheckResult);
          setCheck(loggedInUserCartCheckResult)
        }, 10); // Adjust the delay time (in milliseconds) as needed
        return ()=> clearTimeout(timerId)
      } catch (error) {
        // Handle any errors that may occur during the fetch
        console.error(error);
      }
    };
    fetchCartItemsHandler();
  }, []);
  //* Now we need to create api which checks wether item present inside cart or not

  return (
    <div className="individual-course-card-home-page">
    <div className="image-wrapper">
      <img src={courseObject?.imageLink} alt="" loading="lazy" />
    </div>
    <div className="right-side">
      <div>
        <h1>{courseObject?.title}</h1>
        <p>{courseObject?.description}</p>
      </div>
      <div>
        <h2>&#8377;{courseObject?.price}</h2>
          <div className="buy-btn-row">
            {!check ? 
            <button onClick={addToCart}>
            Add to cart
            </button>
            : <button>Remove from Cart</button>
          }
          </div>
      </div>
    </div>
  </div>
  )
}

export default CourseHomePage
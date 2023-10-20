import { useEffect, useState } from "react";
import { useCourseContext } from "../context/context";
import { useNavigate, useParams } from "react-router-dom";
import { courseType } from "./CreatingCourses/MyCourses";
import { removeFromCartPromise } from "./Cart/Cart";


const CourseHomePage = () => {
  const { courseId } = useParams();
  const navigate = useNavigate()
  const final = useCourseContext();
  const [courseObject, setCourseObject] = useState<courseType>();
  const [check,setCheck] = useState(false)

  const fetchCoursePromise = async (): Promise<courseType> => {
    const response = await fetch(`http://localhost:3000/user/${courseId}`);
    return response.json()
  };

  const loggedInUserCartCheckPromise = async (): Promise<boolean> => {
    const response = await fetch(
      `http://localhost:3000/cart/${courseId}/${final?.userName}`
    );
    return response.json();
  };

  
  const addToCart = async () => {
    if(final?.userName.length == 0) {
      alert("Login to purchase")
      return
    }
    try {
      const response = await fetch(`http://localhost:3000/cart/${courseId}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        body: JSON.stringify({ username: final?.userName }),
        method: "POST",
      });
      alert(await response.text());
      setCheck(true)
    } catch (error) {
      alert("An error occurred. Please try again.");
    }
  };

  const buy = () =>{
    if(final?.userName.length == 0) {
      alert("Login to purchase")
      return
    }
    navigate('/checkout')
  }

  const removeFromCart = async(courseId : number | undefined) =>{
    const res = await removeFromCartPromise(courseId,final?.userName,final?.cartDocumentId || "")
    const data = await res.text()
    alert(data)
    setCheck(false)
  }
  
  useEffect(() => {
    const fetchCartItemsHandler = async () => {
      try {
        const fetchCourseResult = await fetchCoursePromise();
        setCourseObject(fetchCourseResult);
  
        // Introduce a delay using setTimeout
        const timerId = setTimeout(async () => {
          const loggedInUserCartCheckResult = await loggedInUserCartCheckPromise();
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
        {
          final?.userName != courseObject?.author &&
          <div className="buy-btn-row">
            <button onClick={buy}>Buy Now</button>
            {!check ? 
            <button onClick={addToCart}>
            Add to cart
            </button>
            : <button onClick={()=>removeFromCart(courseObject?._id)}>Remove from Cart</button>
          }
          </div>
          }
      </div>
    </div>
  </div>
  )
}

export default CourseHomePage
import axios from "axios";
import { useEffect, useState, Fragment } from "react";
import { useParams } from "react-router-dom";
import { courseType } from "./CreatingCourses/MyCourses";
import { useCourseContext } from "../context/context";

function HomePageCourse() {
  const { courseId } = useParams();
  const final = useCourseContext();
  const [courseObject, setCourseObject] = useState<courseType>();
  const [check, setCheck] = useState(false);

  const fetchCoursePromise = async (): Promise<courseType> => {
    const response = await axios.get(`http://localhost:3000/user/${courseId}`);
    setCourseObject(response.data);
    return response.data;
  };

  //* We will fetch the cartItems array,then use the find method to find courseId which matches any courseId inside the array,If matches this means we have added the item to the array,so disable the buy button

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

  const loggedInUserCartCheckPromise = async (): Promise<boolean> => {
    const response = await fetch(
      `http://localhost:3000/cart/${courseId}/${final?.userEmail}`
    );
    return response.json();
  };

  useEffect(() => {
    const fetchCartItemsHandler = async () => {
      const fetchCourse = await fetchCoursePromise();
      setCourseObject(fetchCourse);
      const loggedInUserCartCheck = await loggedInUserCartCheckPromise();
      setCheck(loggedInUserCartCheck);
      await Promise.race([fetchCourse, loggedInUserCartCheck]);
    };
    fetchCartItemsHandler();
  }, []);


  return (
    <Fragment>
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
            {courseObject?.author !== final?.userEmail && (
              <div className="buy-btn-row">
                {/* <button>Buy Now</button> */}
                {/* <button onClick={addToCart}>Add to Cart</button> */}
                {/* WE need to put it inside parenthesis for ts */}
                {
                final?.userEmail.length ?? 0 > 1 ? (

                  !check ? (
                    <button>Added to Cart</button>
                    ) : (
                      <button onClick={addToCart}>Add to cart</button>
                      )
                      ) : <button onClick={addToCart}>Add to cart</button>
                }
              </div>
            )}
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default HomePageCourse;

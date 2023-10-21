import { useEffect, useState } from "react";
import { useCourseContext } from "../context/context";
import { useNavigate, useParams } from "react-router-dom";
import { courseType } from "./CreatingCourses/MyCourses";
import { removeFromCartPromise } from "./Cart/Cart";
import toast, { Toaster } from "react-hot-toast";
import { baseUrl } from "../utils";

export const fetchCoursePromise = async (
  courseId: string | undefined
): Promise<courseType> => {
  const response = await fetch(`${baseUrl}/user/${courseId}`);
  return response.json();
};

const CourseHomePage = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const final = useCourseContext();
  const [courseObject, setCourseObject] = useState<courseType>();
  const [check, setCheck] = useState(false);
  const [checkBought, setCheckBought] = useState(false);

  const loggedInUserCartCheckPromise = async (): Promise<boolean> => {
    const response = await fetch(
      `${baseUrl}/cart/${courseId}/${final?.userName}`
    );
    return response.json();
  };

  const addToCart = async () => {
    if (final?.userName.length == 0) {
      toast.error("Login to purchase");
      return;
    }
    try {
      const response = await fetch(`${baseUrl}/cart/${courseId}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        body: JSON.stringify({ username: final?.userName }),
        method: "POST",
      });
      const data = await response.json();
      if (response.status == 400) {
        toast.error(data.msg);
      }
      if (response.status == 200) {
        
        toast.success(data.msg);
      }
      setCheck(true);
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    }
  };

  const checkIfBought = async (username: string | undefined) => {
    const response = await fetch(
      `${baseUrl}/auth/checkIfBought/${username}/${courseId}`
    );
    return response.json();
  };

  const buy = async (courseObject: courseType | undefined) => {
    if (final?.userName.length == 0) {
      toast.error("Login to purchase");
      return;
    }
    const checkIfBoughtResult = await checkIfBought(final?.userName);
    if(checkIfBoughtResult.message==true) {
      setCheckBought(true)
      return toast.error("Course already bought")
    }
    sessionStorage.setItem("bill", JSON.stringify(courseObject));
    navigate("/checkout");
  };

  const removeFromCart = async (courseId: number | undefined) => {
    const res = await removeFromCartPromise(
      courseId,
      final?.userName,
      final?.cartDocumentId || ""
    );
    const data = await res.text();
    toast.success(data);
    setCheck(false);
  };

  useEffect(() => {
    const fetchCartItemsHandler = async () => {
      try {
        const fetchCourseResult = await fetchCoursePromise(courseId);
        setCourseObject(fetchCourseResult);

        const loggedInUserCartCheckResult =
          await loggedInUserCartCheckPromise();
        setCheck(loggedInUserCartCheckResult);
        
        const checkIfBoughtResult = await checkIfBought(final?.userName);
        setCheckBought(checkIfBoughtResult.message);
      } catch (error) {
        console.error(error);
      }
    };
    fetchCartItemsHandler();
  }, []);
  //* Now we need to create api which checks wether item present inside cart or not

  return (
    <div className="individual-course-card-home-page">
      <Toaster />
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
          {final?.userName != courseObject?.author && (
            <div className="buy-btn-row">
              {
                checkBought ? 
              <button>Course purchased</button>
              :
              <>
              <button onClick={() => buy(courseObject)}>Buy Now</button>
              {!check ? (
                <button onClick={addToCart}>Add to cart</button>
                ) : (
                  <button onClick={() => removeFromCart(courseObject?._id)}>
                  Remove from Cart
                  </button>
                  )}
                  </>
}
            </div>
          ) 
          }
        </div>
      </div>
    </div>
  );
};

export default CourseHomePage;

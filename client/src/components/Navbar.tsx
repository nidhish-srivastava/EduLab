import { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useCourseContext } from "../context/context";
import a from "../blank.jpg";

function Navbar() {
  const final = useCourseContext();
  const [toggle,setToggle] = useState(false)
  const check = async (): Promise<any> => {
    try {
      const response = await fetch(`http://localhost:3000/auth/me`, {
        method: "GET",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      const checkProfile = await response.json();
      final?.setuserName(checkProfile.username); // Set the username here
      return checkProfile;
    } catch (error) {
      console.error("Error in check:", error);
      throw error; // Rethrow the error to prevent cartItems from executing
    }
  };
  
  const cartItems = async (username : string | undefined): Promise<any> => {
    try {
      const response = await fetch(`http://localhost:3000/cart/cartCheck/${username}`, {
        method: "GET",
      });
      return response.json();
    } catch (error) {
      console.error("Error in cartItems:", error);
      throw error; // Rethrow the error to handle it in your component
    }
  };
  
  useEffect(() => {
    const fetchHandler = async () => {
      try {
        const checkProfile = await check();
        // console.log('checkProfile:', checkProfile);
        // console.log('final?.userName:', checkProfile.username);
        //* The below line causes error if we dont pass the variable as argument and try to use the final.username 
        const fetchUserCart = await cartItems(checkProfile.username);
        final?.setCartDocumentId(fetchUserCart?._id)
      } catch (error) {
        console.error("Error in fetchHandler:", error);
      }
    };
  
    fetchHandler();
  }, []);
  
  


  return (
    <Fragment>
      {/* <Link to={`/support`}>
        <div className="support-btn-wrapper">
          <span className="support-icon">
            <i className="fa-solid fa-headset"></i>
          </span>
        </div>
      </Link> */}
      {/* <button onClick={cartItems}>Check</button> */}
      <div className="navbar">
        <Link to={`/`}>
        <span className="logo">EduLab</span>
        </Link>
        {
          <span className={`hamburger ${!toggle ? "hidden" : "white"} `} onClick={()=>setToggle(e=>!e)}>
            <svg style={{height : "1rem",width : "1rem"}} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/>
        </svg>
        </span>
        }
        {final?.userName && final.userName.length > 1 ? (
          <div className ={` sign-out-row ${!toggle ? "hidden" : "white"}`} onClick={()=>setToggle(false)}>
            <Link to={`/`}>Home</Link>
            <Link to={`/instructor`}>Create</Link>
            {/* <span className="business-logo">
              <Link
                to={`/edulab-business`}
                style={{ padding: ".6rem", borderRadius: "10px" }}
              >
                Edulab Business
              </Link>
            </span> */}
            {/* <span className="business-logo">
              <Link
                to={`/edulab-university`}
                style={{ padding: ".6rem", borderRadius: "10px" }}
              >
                Edulab University
              </Link>
            </span> */}
            {/* <button>Cart{" (0) "}</button> */}
            <a href={`/cart`}>
              <span className="cart-icon">
              <i className="fa-solid fa-cart-shopping"></i>
              </span>
            </a>

            <button
              className="logout-btn"
              onClick={() => {
                localStorage.setItem("token", "");
                window.location.href = "/";
              }}
            >
              Logout
            </button>
            <Link to={`/my-profile`}>
              <div className="dp-small-wrapper">
                <img src={a} alt="" loading="lazy" />
              </div>
            </Link>
          </div>
        ) : (
          <div className ={` sign-in-row ${!toggle ? "hidden" : "white"}`} onClick={()=>setToggle(false)}>
            {/* <span className="business-logo">
              <Link to={`/edulab-business`}>Edulab Business</Link>
            </span>
            <span className="business-logo">
              <Link
                to={`/edulab-university`}
                style={{ padding: ".6rem", borderRadius: "10px" }}
                >
                Edulab University
              </Link>
            </span> */}
            <Link to={`/signup`}>SignUp</Link>
            <Link to={`/signin`}>SignIn</Link>
          </div>
        )}
      </div>
    </Fragment>
  );
}

export default Navbar;

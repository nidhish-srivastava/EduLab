import { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useCourseContext } from "../context/context";
import a from "../blank.jpg";

function Navbar() {
  const final = useCourseContext();
  const [toggle,setToggle] = useState(false)
  const check = async () => {
    const response = await fetch(`http://localhost:3000/auth/me`, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
    const data = await response.json();
    final?.setUserEmail(data.username);
  };

  const cartItems = async()=>{
    const response = await fetch(`http://localhost:3000/cart/cartItemsLength/${final?.userEmail}`, {
      method: "GET",
    });
    const data = await response.json()
  }

  useEffect(() => {
    check();
  }, []);

  return (
    <Fragment>
      <Link to={`/support`}>
        <div className="support-btn-wrapper">
          <span className="support-icon">
            <i className="fa-solid fa-headset"></i>
          </span>
        </div>
      </Link>
      <div className="navbar">
        <Link to={`/`}>
        <span className="logo">EduLab</span>
        </Link>
        {
          <span className="hamburger" onClick={()=>setToggle(e=>!e)}>
            <svg style={{height : "1rem",width : "1rem"}} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15"/>
        </svg>
        </span>
        }
        {final?.userEmail && final.userEmail.length > 1 ? (
          <div className ={` sign-out-row ${!toggle ? "hidden" : ""}`} onClick={()=>setToggle(false)}>
            <Link to={`/`}>Home</Link>
            <Link to={`/instructor`}>Create</Link>
            <span className="business-logo">
              <Link
                to={`/edulab-business`}
                style={{ padding: ".6rem", borderRadius: "10px" }}
              >
                Edulab Business
              </Link>
            </span>
            <span className="business-logo">
              <Link
                to={`/edulab-university`}
                style={{ padding: ".6rem", borderRadius: "10px" }}
              >
                Edulab University
              </Link>
            </span>
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
          <div className ={` sign-in-row ${!toggle ? "hidden" : ""}`} onClick={()=>setToggle(false)}>
            <span className="business-logo">
              <Link to={`/edulab-business`}>Edulab Business</Link>
            </span>
            <span className="business-logo">
              <Link
                to={`/edulab-university`}
                style={{ padding: ".6rem", borderRadius: "10px" }}
                >
                Edulab University
              </Link>
            </span>
            <Link to={`/signup`}>SignUp</Link>
            <Link to={`/signin`}>SignIn</Link>
          </div>
        )}
      </div>
    </Fragment>
  );
}

export default Navbar;

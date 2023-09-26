import { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import { useCourseContext } from "../context/context";
import a from "../blank.jpg";

function Navbar() {
  const final = useCourseContext();
  const check = async () => {
    const response = await fetch(`http://localhost:3000/auth/me`, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
    const data = await response.json();
    console.log(data);
    final?.setUserEmail(data.username);
  };

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
      <div className="nav-bar">
        <span className="logo">EduLab</span>
        {final?.userEmail && final.userEmail.length > 1 ? (
          <>
            <Link to={`/`}>Home</Link>
            <Link to={`/instructor`}>Instructor</Link>
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
            {/* <input
              type="search"
              placeholder="Tap Here to Search"
              className="search-bar"
            /> */}

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
                <img src={a} alt="" />
              </div>
            </Link>
          </>
        ) : (
          <div className="sign-in-row">
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
            <input
              type="search"
              placeholder="Tap Here to Search"
              className="search-bar"
            />
            <Link to={`/signup`}>SignUp</Link>
            <Link to={`/signin`}>SignIn</Link>
          </div>
        )}
      </div>
    </Fragment>
  );
}

export default Navbar;

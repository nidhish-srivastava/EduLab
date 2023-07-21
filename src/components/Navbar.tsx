import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useCourseContext } from "../context/context";

function Navbar() {
  const final = useCourseContext();
  const check = async () => {
    const response = await fetch(`http://localhost:3000/admin/me`, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
    const data = await response.json();

    final?.setUserEmail(data.username);
  };

  useEffect(() => {
    check();
  }, []);

  if (final?.userEmail && final.userEmail.length > 1) {
    return (
      <div className="nav-bar">
        <h3>Logo</h3>
        <Link to={`/`}>Home</Link>
        <Link to={`/instructor`}>Instructor</Link>
        <button
          onClick={() => {
            localStorage.setItem("token", "");
            window.location.href = "/";
          }}
        >
          logout
        </button>
      </div>
    );
  } else {
    return (
      <div className="nav-bar">
        <h3>Logo</h3>
        <Link to={`/signup`}>SignUp</Link>
        <Link to={`/signin`}>SignIn</Link>
      </div>
    );
  }
}

export default Navbar;

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

  return (
    <div className="nav-bar">
      <h3>Edulab</h3>
      <input type="search" placeholder="Search Items" />
      {final?.userEmail && final.userEmail.length > 1 ? (
        <>
          <Link to={`/instructor`}>Instructor</Link>
          <Link to={`/`}>Home</Link>
          <button>Cart{" (0) "}</button>
          <button
            onClick={() => {
              localStorage.setItem("token", "");
              window.location.href = "/";
            }}
          >
            logout
          </button>
        </>
      ) : (
        <>
          <Link to={`/signup`}>SignUp</Link>
          <Link to={`/signin`}>SignIn</Link>
        </>
      )}
      <Link to={`/edulab-business`}>Edulab Business</Link>
    </div>
  );
}

export default Navbar;

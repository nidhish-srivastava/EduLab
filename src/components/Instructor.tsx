import { Link } from "react-router-dom";
function Instructor() {
  return (
    <div>
      <Link to={`my-courses`}>
        <button>
        My Courses
        </button>
        </Link>
      <Link to={`create-course`}>
        <button>
        Create Course
        </button>
      </Link>
    </div>
  );
}

export default Instructor;

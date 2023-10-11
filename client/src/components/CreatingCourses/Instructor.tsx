import { Link } from "react-router-dom";
import a from './1.jpg'
function Instructor() {
  return (
    <>
    <div className="btn-row">
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
    <div className="image-wrapper-create">
    <img src={a} alt="" loading="lazy" />
    </div>
    </>
  );
}

export default Instructor;

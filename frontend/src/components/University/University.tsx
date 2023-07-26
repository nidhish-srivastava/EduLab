import { useState } from "react";
import UniversityForm from "./UniversityForm";
import RegisterResponse from "../Business/RegisterResponse";

function University() {
    const [show,setShow] = useState(false)
  return (
    <main className="business-page-container">
      <div className="left-side-business-page">
        <h1>EduLab For Universities</h1>
        <div>
          <h2>
            <b>Learn more about how you can:</b>
          </h2>
            <ul>
              <li>Connect curriculum to careers</li>
              <li>Strengthen employment outcomes</li>
              <li>Enhance learning experiences</li>
            </ul>
          <p>
            Join the innovative colleges and universities globally that choose
            Coursera for their students
          </p>
        </div>
      </div>
      {!show ? 
      <UniversityForm setShow = {setShow} />
       :
       <RegisterResponse/>
        }
    </main>
  );
}

export default University;

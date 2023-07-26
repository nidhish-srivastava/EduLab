import { useState } from "react";
import RegisterResponse from "./RegisterResponse";
import BusinessForm from "./BusinessForm";
function Business() {
  const [show, setShow] = useState(false);
  return (
    <main className="business-page-container">
      <div className="left-side-business-page">
        <h1>EduLab Business</h1>
        <div>
          <h2>Get your demo</h2>
          <p>
            See why leading organizations choose EduLab Business as their
            destination for employee learning.
          </p>
        </div>
        <div>
          <h2>
            <b>In your demo, learn more about:</b>
          </h2>
          <p>
            Unlimited access to 22,000+ top courses selected from EduLab.com –
            anytime, on any device Fresh content taught by global instructors –
            for any learning style Actionable learning insights and admin
            functionality
          </p>
        </div>
      </div>
      {!show ? <BusinessForm setShow={setShow} /> : <RegisterResponse />}
    </main>
  );
}

export default Business;

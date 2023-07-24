import { useState } from "react";
import RegisterResponse from "./RegisterResponse";
import BusinessForm from "./BusinessForm";
// import { useLocation } from "react-router-dom";
function Business() {
  // let location  = useLocation().pathname
  // console.log(location.replace("/",""));
  const [show, setShow] = useState(false);

  return (
    <>
      <h1>EduLab Business</h1>
      <div>
        <h2>Get your demo</h2>
        <p>
          See why leading organizations choose EduLab Business as their
          destination for employee learning.
          <br />
          <br />
          <b>In your demo, learn more about:</b>
          <br />
          Unlimited access to 22,000+ top courses selected from EduLab.com –
          anytime, on any device Fresh content taught by global instructors –
          for any learning style Actionable learning insights and admin
          functionality
        </p>
      </div>
      {!show ? <BusinessForm setShow={setShow} /> : <RegisterResponse />}
    </>
  );
}

export default Business;

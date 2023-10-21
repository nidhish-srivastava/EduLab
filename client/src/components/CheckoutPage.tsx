import  { useState } from "react";
import './Checkout.css'
import qrcode from './qr-code.png'
import { useCourseContext } from "../context/context";
import toast, { Toaster } from "react-hot-toast";


const PaymentOption = () => {
  const [paymentMethod, setPaymentMethod] = useState("card-number");
  const final = useCourseContext()

  const renderPaymentForm = () => {
    if (paymentMethod === "card-number") {
      return (
        <form id="card-number-form" className="render-payment-form">
          <input type="text" required={true} name="card-number" placeholder="Card number" />
          <input type="text" required={true} name="expiration-date" placeholder="MM/YY" />
          <input type="text" required={true} name="cvc" placeholder="CVC" />
        </form>
      );
    } else if (paymentMethod === "qr-code") {
      return (
        <div id="qr-code-form" className="qr-code-wrapper">
          <img src={qrcode} alt="QR code" />
        </div>
      );
    } 
    // else {
      // return <h3></h3>;
    // }
  };

  const addToBoughtCourses = async()=>{
    const response = await fetch(`http://localhost:3000/auth/buy-course`,{
      method : "POST",
      headers : {
        "Content-Type" : "application/json"
      },
      body : JSON.stringify({
        username : final?.userName,
        courseId :  JSON.parse(sessionStorage.getItem("bill") || "")._id
      })
     
    })
    const data = await response.json()
    if(response.status==201){
      toast.success(data.message)
      window.location.href = '/'
    }
  }

  return (
    <>
    <Toaster/>
    <div>
      <div className="bill-item">
      <label htmlFor="">{JSON.parse(sessionStorage.getItem("bill") || "").title}</label>
      <button className="bill">
        Bill &nbsp; <span>
        &#8377;{JSON.parse(sessionStorage.getItem("bill") || "").price}
        </span>
        </button>
      </div>
    </div>
    <div className="payment-option">
      <label  htmlFor="payment-method">Select payment method</label>
      <select  name="payment-method" id="payment-method" onChange={e=>setPaymentMethod(e.target.value)}>
        <option value="card-number">Card number</option>
        <option value="qr-code">QR code</option>
      </select>
      {renderPaymentForm()}
      <div className="center">
      <button  className="bill" style={{marginTop : "1rem"}} onClick={addToBoughtCourses}>Make payment</button>
      </div>
    </div>
    </>
  );
};

export default PaymentOption;

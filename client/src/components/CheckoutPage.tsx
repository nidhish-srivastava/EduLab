import  { useState } from "react";
import './Checkout.css'
import qrcode from './qr-code.png'

const PaymentOption = () => {
  const [paymentMethod, setPaymentMethod] = useState("card-number");


  const renderPaymentForm = () => {
    if (paymentMethod === "card-number") {
      return (
        <div id="card-number-form" className="render-payment-form">
          <input type="text" name="card-number" placeholder="Card number" />
          <input type="text" name="expiration-date" placeholder="MM/YY" />
          <input type="text" name="cvc" placeholder="CVC" />
        </div>
      );
    } else if (paymentMethod === "qr-code") {
      return (
        <div id="qr-code-form" className="qr-code-wrapper">
          <img src={qrcode} alt="QR code" />
        </div>
      );
    } else {
      return <h3>asdasdasdasd</h3>;
    }
  };

  return (
    <>
    <div>
      <div className="bill-item">
      <label htmlFor="">{JSON.parse(sessionStorage.getItem("bill") || "").name}</label>
      <button className="bill">
        Bill 
        <span>
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
      <button className="bill" style={{marginTop : "1rem"}}>Make payment</button>
      </div>
    </div>
    </>
  );
};

export default PaymentOption;

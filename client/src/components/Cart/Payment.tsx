
function Payment() {
  return (
  <form className="payment-form">
  <label htmlFor="card-number">Card Number:</label>
  <input type="text" name="card-number" id="card-number" placeholder="1234-5678-9012-3456"/>
  <label htmlFor="card-expiry">Card Expiry:</label>
  <input type="text" name="card-expiry" id="card-expiry" placeholder="MM/YY"/>
  <label htmlFor="card-cvc">Card CVC:</label>
  <input type="text" name="card-cvv" id="card-cvc" placeholder="123"/>
  <button className="payment-proceed-btn">Submit Payment</button>
</form>
  )
}

export default Payment